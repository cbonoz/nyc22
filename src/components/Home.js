import React from "react";
import { Row, Col, Button } from "antd";
import logo from "../assets/logo_3_2_trans.png";
import ReactRotatingText from "react-rotating-text";
import { useNavigate } from "react-router-dom";
import { APP_DESC } from "../util/constants";
import { CheckCircleTwoTone } from "@ant-design/icons";

const CHECKLIST_ITEMS = [
  "Fundraiser donations saved on Smart Contracts.",
  "NFTs generated for each of your early supporters",
  "No vendor agreements required",
];

function Home(props) {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/create");
  };
  return (
    <div className="hero-section">
      <Row>
        <Col span={12}>
          <div className="hero-slogan-section">
            <div className="hero-slogan">
              <p>
                {APP_DESC}.
                 {/* for&nbsp; */}
                {/* <ReactRotatingText
                  items={["businesses", "individuals", "everyone"]}
                /> */}
              </p>
            </div>
            {/* // "#eb2f96" */}
            {CHECKLIST_ITEMS.map((item, i) => {
              return (
                <p>
                  <CheckCircleTwoTone twoToneColor="#00aa00" />
                  &nbsp;
                  {item}
                </p>
              );
            })}
            <br />

            <Button type="primary" size="large" onClick={goToCreate}>
              Start a fundraise page
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <img src={logo} className="hero-image" />
        </Col>
      </Row>
    </div>
  );
}

Home.propTypes = {};

export default Home;
