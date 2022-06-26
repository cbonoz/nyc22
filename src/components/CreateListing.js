 import React, { useState, useEffect, useMemo } from "react";
import { Button, Input, Row, Col, Radio, Steps, Card, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { ipfsUrl, getExplorerUrl, campaignUrl } from "../util";
import { CATEGORIES, EXAMPLE_FORM, USE_WORLD } from "../util/constants";
import { FileDrop } from "./FileDrop/FileDrop";
import { storeFiles } from "../util/stor";
import { deployContract, validAddress } from "../contract/worldfundContract";
import { WorldIDComponent } from "./WorldIDComponent";

const { Step } = Steps;

const {Option} = Select

function CreateListing({provider, account}) {
  
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [freeze, setFreeze] = useState()
  const [result, setResult] = useState();

  const prefill = () => setData({...EXAMPLE_FORM})

  const updateData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const createActionId = `${account}-${data.title || ''}`

  const isValid = (data) => {
    return (
      data.title &&
      data.description &&
      data.category &&
      // data.files.length > 0 &&
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


    if (!freeze && USE_WORLD) {
      setError("Title must be frozen");
      return;
    }

    if (USE_WORLD && !data.worldId.proof) {
      setError("World ID proof is required to continue")
      return
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
      const contract = await deployContract(provider, data.title, data.description, data.fundAddress, data.worldId && data.worldId.proof);
      // res["contract"] = contract;
      res["address"] = contract.address;
      res["owner"] = account;
      res["files"] = files.map(f => f.path);
      res["createdAt"] = new Date()

      const blob = new Blob([JSON.stringify(res)], { type: 'application/json' })
      const metadataFile = new File([blob], 'metadata.json')
      const allFiles = [...files, metadataFile]

      // 2) Upload files to ipfs,
      const cid = await storeFiles(allFiles);
      res['cid'] = cid

      // 3) return shareable url.
      res["campaignUrl"] = campaignUrl(cid);
      res["contractUrl"] = getExplorerUrl(res.address, false);

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
            <div>
            <h2>Start a new fundraise campaign</h2>
            <p>From this page you can create a new Worldfund fundraise url that can be shared with anyone on the web.&nbsp;
            <a href="" onClick={e => {
              e.preventDefault()
              prefill()
            }}>Prefill example</a>.

            </p>
</div>
            <Card title="General information:">
            <Input
              placeholder="Title of the fundraiser"
              value={data.title}
              className='standard-input'
              prefix="Title:"
              disabled={freeze}
              onChange={(e) => updateData("title", e.target.value)}
            />
              {USE_WORLD && <div>
            <Button disabled={!account} onClick={() => setFreeze(!freeze)}>{freeze ? 'Unfreeze' : 'Freeze'}</Button>
            <span>&nbsp;Title must be frozen to do fundraiser verification</span>
        </div>}
            <TextArea
              aria-label="Description"
              onChange={(e) => updateData("description", e.target.value)}
              placeholder="Description of the fundraiser"
              prefix="Description:"
              value={data.description}
            />

            <p>Select category:</p>
            <Select style={{ width: 200 }} placeholder="Select category" value={data.category} onChange={v => updateData("category", v)}>
              {CATEGORIES.map((c, i) => {
                return <Option key={i} value={c}>{c}</Option>
              })}
            </Select>

</Card>
         {/* TODO: add configurable amount of items */}
         <Card title="Upload images for your fund page">
            {/* <h3 className="vertical-margin">Upload images for your fund page:</h3> */}
            <FileDrop
              files={data.files || []}
              setFiles={(files) => updateData("files", files)}
            />
</Card>
             <Card title="Enter donation address">
            <p>Enter your desired donation address. This defaults to your current address, but can be another wallet address is you desire.</p>
            <Input
              placeholder="Wallet address to receive payments"
              value={data.fundAddress}
              prefix="Donation Address:"
              onChange={(e) => updateData("fundAddress", e.target.value)}
            />
</Card>
   
            <br />
            {USE_WORLD && <WorldIDComponent enabled={freeze} setProof={p => updateData("worldId", p)} actionId={createActionId} signal={account}/>}
            <br/>
            <br/>
            <Button
              type="primary"
              className="standard-btn"
              onClick={create}
              disabled={loading || !isValidData || !provider}
              loading={loading}
            >
              {provider ? 'Create page!' : 'Login to create page'}
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
                  <a href={result.campaignUrl} target="_blank">
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
