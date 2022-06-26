import React, { useState, useEffect, useMemo } from "react";
import { Button, Col, Row, Input, Spin, Layout, Modal, Table, notification, Card, Tooltip } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { createNFT, getMintedNFT } from "../util/nftport";
import { fetchMetadata, retrieveFiles } from "../util/stor";
import { getDateStringFromTimestamp, getExplorerUrl, ipfsUrl } from "../util";
import logo from '../assets/logo.png'
import {
  submitPayment,
} from "../contract/worldfundContract";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ArrowLeftOutlined, CheckCircleTwoTone, HeartOutlined, ShareAltOutlined, TagOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { getTransactions } from "../util/covalent";
import { ACTIVE_CHAIN, HISTORY_COLUMNS } from "../util/constants";
const { Header, Footer, Sider, Content } = Layout;

const toast = (type, description) => {
  notification[type]({
    message: 'Notification Title',
    description});
};

function FundPage({provider, account }) {
  const { pageId } = useParams(); // cid
  const [data, setData] = useState({});
  const [historyData, setHistoryData] = useState()
  const navigate = useNavigate()

  const [amount ,setAmount] = useState()
  const [message ,setMessage] = useState()
  const [error, setError] = useState()

  const [loading, setLoading] = useState(false);
  const [loadHistory, setLoadHistory] = useState(false)
  const [result, setResult] = useState();

  const getHistoryData = async (addr) => {
    console.log('get history', addr)
    setLoadHistory(true)
    try {
      const res = await getTransactions(ACTIVE_CHAIN.id, addr)
const rows = res.data.data.items
console.log('rows', rows)
      setHistoryData(rows)
    } catch (e) {
      console.error('could not get transactions')
    } finally {
      setLoadHistory(false)
    }
  }

  useEffect(() => {
    if (data.address) {
      // getHistoryData(data.address)
    }
  }, [data.address])

  const fetchData = async () => {
    setError(undefined)
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
      const msg = "Error getting fundraise information: " + e;
      // toast("error", e)
      setError(msg)
    } finally {
      setLoading(false);
    }
  };

  const share = () => {
    const data = encodeURIComponent(`Help support this cause! ${window.location.href}`)
    const url = `https://twitter.com/intent/tweet?text=${data}`
    window.open(url, "_blank")
  }

  useEffect(() => {
    fetchData();
  }, [pageId]);

  // const authed = useMemo(() => {
  //   return data && (data.signerAddress || '').toLowerCase() === (account || '').toLowerCase()
  // } ,[data, account])

  const { description, title, signerAddress, address: contractAddress } = data;

  const sendFunds = async () => {
    setError(undefined)
    let nftResults = {};

    setLoading(true);
    let res
    try {
      
      // 1. Submit payment
      nftResults['payment'] = await submitPayment(provider, contractAddress, amount, message || '', data.owner);

      // TODO: Add message

      // 3. Create NFT for participant https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url
      res = await createNFT(
        title,
        description,
        signerAddress,
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
      const err = e.message || e.toString()
      console.error("error sending funds", err);
      toast("error", "Error sending funds: " + err)
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

  if (error) {
    return <div>
      <p className="error-text">{error}</p>
    </div>
  }

  if (result) {
    return (
      <div className="container">
         <a href={window.location.href}>
          Back to campaign
        </a>
        <br/>
        <div className="centered">
       
        <img src={logo} className="header-logo centered" />
</div>
        <br />
        <br />
        <h1>Transaction complete!</h1>
        <p>View your completed polygon transaction and donation NFT reward!</p>

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
    <div className="">
      {/* <img src={logo} className="header-logo" /> */}
      <Tooltip title={`This url has been verified as the official fundraiser with owner: ${data.owner} ${data.worldId ? `Proof: ${data.worldId.proof}`: ''}`}>
      <span className="float-right green"><CheckCircleTwoTone  twoToneColor="#00aa00"/> Verified with Worldcoin</span>
</Tooltip>
      <br/>
      <h1 className="centered header-text"> <HeartOutlined /> {data.title} <HeartOutlined /></h1>
      <br/>
      <br/>
      <Layout>
        <Content className="white">
    
      {hasFiles && <Carousel
        autoPlay
        ariaLabel={data.title}
        >
        {data.files.map((f, i) => {
          return <div>
            <img src={ipfsUrl(pageId, f)} width={600} />
            {/* <p className="legend">Image {i+1}</p> */}
        </div>
        })}
      </Carousel>}
      <Row className="boxed white">
        <Col className='padding-small' span={18}>
          <h3>{data.title}
          &nbsp;
          <Button type="secondary" onClick={share}> Share <ShareAltOutlined/> </Button>
          </h3>
          <hr/>
            {data.createdAt && <span>Created At: {getDateStringFromTimestamp(data.createdAt)}</span>} | <span>
            <TagOutlined />&nbsp;<b>
              {data.category}
</b>
            </span>
          <hr/>
          <p>
            {description}
          </p>
  
        </Col>

        <Col className='padding-small' span={6}>
        </Col>
      </Row>
      </Content>

      <Sider width={600} className="white padding-small">

      <Card title="Donate">
        <Input
      prefix="Amount"
      className="standard-input"
      placeholder="Enter amount of donation"
      value={amount}
      suffix="ETH"
      onChange={e => setAmount(e.target.value)}
      type="number"/>

     <TextArea
      cols={260}
      rows={4}
      prefix="Message"
      placeholder="Enter custom message to owner (optional)"
      value={message}
      onChange={e => setMessage(e.target.value)}
      type="text"/>

      <Button className="standard-btn" size="large" type="primary" loading={loading} disabled={loading || !amount || !provider} onClick={sendFunds}>{provider ? 'Send Funds' : 'Login to donate'}</Button>

      <div>
      </div>
</Card>

   
    <div>
      <Button disabled={loadHistory} loading={loadHistory} className="standard-btn" onClick={() => getHistoryData(data.address)}>View Recent Transactions</Button>
</div>
      {data.owner && <a href="" onClick={e => {
        e.preventDefault()
        navigate(`/conversations/${data.owner}`)
      }} target="_blank">Send organizer a message</a>}
      </Sider>
      <Modal     cancelButtonProps={{ style: { display: 'none' } }}
 width={1200} cancelText={undefined} onOk={() => setHistoryData(undefined)} visible={historyData !== undefined} title={`Fundraiser transaction history`}>
        {historyData && <div>
          <h3>List of transactions against fundraiser: {data.title}</h3>
          <p>Address: {data.address}</p>
          <Table
            width={1000}
            dataSource={historyData}
            columns={HISTORY_COLUMNS}
            className="pointer"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log("event", event.target.value);
                  window.open(
                    `${ACTIVE_CHAIN.url}tx/${record.tx_hash}`,
                    "_blank"
                  );
                }, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {}, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
          />
          </div>}
      </Modal>
      </Layout>

   
    </div>
  );
}

FundPage.propTypes = {};

export default FundPage;
