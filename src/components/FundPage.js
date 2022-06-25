import React, { useState, useEffect, useMemo } from "react";
import { Button, Input, Spin } from "antd";
import { useParams } from "react-router-dom";
import { createNFT, getMintedNFT } from "../util/nftport";
import { fetchMetadata, retrieveFiles } from "../util/stor";
import { getExplorerUrl } from "../util";
import logo from '../assets/logo.png'
import {
  markContractCompleted, submitPayment,
} from "../contract/worldfundContract";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEthers } from "@usedapp/core";

function FundPage({ }) {
  const { pageId } = useParams(); // cid
  const [data, setData] = useState({});

  const {library} = useEthers()

  const [amount ,setAmount] = useState()
  const [message ,setMessage] = useState()
  const [error, setError] = useState()

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const fetchData = async () => {
    console.log("fetch", pageId);
    if (!pageId) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetchMetadata(pageId);
      setData(res.data);
      console.log("fundraise request", res.data);
    } catch (e) {
      console.error(e);
      alert("error getting fundraise information: " + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageId]);

  // const authed = useMemo(() => {
  //   return data && (data.signerAddress || '').toLowerCase() === (account || '').toLowerCase()
  // } ,[data, account])

  const { description, title, signerAddress, address: contractAddress } = data;

  const sendFunds = async (signatureData) => {
    let nftResults = {};

    setLoading(true);

    try {
      
      // 1. Submit payment
      res = await submitPayment(library, contractAddress, url || pageId);

      // TODO: Add message

      // 3. Create NFT for participant https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url
      let res = await createNFT(
        title,
        description,
        signerAddress,
        signatureData
      );
      nftResults["signatureNft"] = res.data;
      const url = nftResults["transaction_external_url"];
      nftResults = { nftResults, ...res };
      try {
        res = await getMintedNFT(res["hash"]);
        nftResults = { nftResults, ...res };
      } catch (e) {
        // soft error for token id fetch.
        console.error(e);
      }
      setResult(nftResults);
    } catch (e) {
      console.error("error sending funds", e);
      alert("Error sending funds: " + JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Spin size="large" />
      </div>
    );
  }

  if (result) {
    return (
      <div className="container">
        <div className="centered">
        <img src={logo} className="header-logo centered" />
</div>
        <br />
        <br />
        <h1>Transaction complete!</h1>
        <p>Access your completed polygon contract and signature packet.</p>

        <a href={getExplorerUrl(contractAddress)} target="_blank">
          View Contract
        </a>
        <p>Full response below:</p>
        <pre>{JSON.stringify(result, null, "\t")}</pre>
      </div>
    );
  }

  const hasFiles = !!data.files

  return (
    <div className="container boxed white">
      <img src={logo} className="header-logo" />
      <h2 className="centered">FundPage</h2>
      <h1>{data.title}</h1>

      {hasFiles && <Carousel>
        {data.files.map((f, i) => {
          <div>
            <img src={f} width={600} />
            <p className="legend">Image {i+1}</p>
        </div>
        })}
      </Carousel>}


      <p>{data.description}</p>

      <Input
      prefix="Amount"
      value={amount}
      onChange={e => setAmount(e.target.value)}
      type="number"/>

     <p>Enter message (optional)</p> 
     <Input
      prefix="Message"
      value={message}
      onChange={e => setMessage(e.target.value)}
      type="text"/>

      <Button className="standard-btn" type="primary" loading={loading} disabled={loading || !amount} onClick={sendFunds}>Send Funds</Button>
    </div>
  );
}

FundPage.propTypes = {};

export default FundPage;
