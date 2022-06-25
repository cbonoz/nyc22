 import React, { useState } from "react";
import { Button, Input, Row, Col, Radio, Steps } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { signatureUrl, ipfsUrl, getExplorerUrl } from "../util";
import { EXAMPLE_FORM } from "../util/constants";
import { FileDrop } from "./FileDrop/FileDrop";
import { storeFiles } from "../util/stor";
import { deployContract, validAddress } from "../contract/worldfundContract";
import { useEthers } from "@usedapp/core";

const { Step } = Steps;

function CreateListing(props) {
  const {library} = useEthers()
  
  const [data, setData] = useState({ ...EXAMPLE_FORM });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const isValid = (data) => {
    return (
      data.title &&
      data.description &&
      data.files.length > 0 &&
      validAddress(data.fundAddress)
    );
  };
  const isValidData = isValid(data);

  const create = async () => {
    setError(undefined);

    if (!isValidData) {
      setError(
        "Please provide a title, description, valid address, and at least one file."
      );
      return;
    }

    setLoading(true);
    const body = { ...data };

    // Format files for upload.
    const files = body.files.map((x) => {
      return x;
    });

    let res = { ...data };

    try {
      // 1) deploy base contract with metadata,
      const contract = await deployContract(library, data.title, data.description, data.fundAddress);
      // res["contract"] = contract;
      res["address"] = contract.address
      res["files"] = files.map(f => f.path)

      const blob = new Blob([JSON.stringify(res)], { type: 'application/json' })
      const metadataFile = new File([blob], 'metadata.json')
      const allFiles = [...files, metadataFile]

      // 2) Upload files to ipfs,
      const cid = await storeFiles(allFiles);
      res['cid'] = cid

      // 3) return shareable url.
      res["signatureUrl"] = signatureUrl(cid);
      res["contractUrl"] = getExplorerUrl(res.address);

      // Result rendered after successful doc upload + contract creation.
      setResult(res);
      try {
        // await postPacket(res.fundraise request);
      } catch (e) {
        console.error("error posting fundraise request", e);
      }
    } catch (e) {
      console.error("error creating fundraise request", e);
      setError(e.message.toString() || e.toString())
    } finally {
      setLoading(false);
    }
  };

  const getStep = () => {
    if (!!result) {
      return 2;
    } else if (isValidData) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            <h2>Start a new fundraise</h2>
            <br />

            <h3 className="vertical-margin">Fundraise request title:</h3>
            <Input
              placeholder="Title of the fundraiser"
              value={data.title}
              prefix="Title:"
              onChange={(e) => updateData("title", e.target.value)}
            />
            <TextArea
              aria-label="Description"
              onChange={(e) => updateData("description", e.target.value)}
              placeholder="Description of the fundraiser"
              prefix="Description"
              value={data.description}
            />

            {/* TODO: add configurable amount of items */}
            <h3 className="vertical-margin">Upload images for your fund page:</h3>
            <FileDrop
              files={data.files}
              setFiles={(files) => updateData("files", files)}
            />

            <h3 className="vertical-margin">Enter fund address:</h3>
            <Input
              placeholder="Wallet address to receive payments"
              value={data.fundAddress}
              prefix="Fundraise Address:"
              onChange={(e) => updateData("fundAddress", e.target.value)}
            />
            <br />

            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              disabled={loading} // || !isValidData}
              loading={loading}
            >
              Start a fundraise page!
            </Button>
            {!error && !result && loading && (
              <span>&nbsp;Note this may take a few moments.</span>
            )}
            <br />
            <br />
            {error && <div className="error-text">{error}</div>}
            {result && (
              <div>
                <div className="success-text">Created fundraise request!</div>
                <a href={ipfsUrl(result.cid)} target="_blank">
                  View metadata
                </a>
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <br />
                <p>
                  Share this url with the potential signer:
                  <br />
                  <a href={result.signatureUrl} target="_blank">
                    Open fundraise url
                  </a>
                </p>

                {/* <div>{JSON.stringify(result, null, "\t")}</div> */}
              </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              current={getStep()}
            >
              <Step title="Fill in fields" description="Enter required data." />
              <Step
                title="Start a fundraise page"
                description="Requires authorizing a start a fundraise page operation."
              />
              <Step
                title="Wait for fundraise"
                description="Your fundraise request will be live for others to view and submit fundraise."
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

CreateListing.propTypes = {};

export default CreateListing;
