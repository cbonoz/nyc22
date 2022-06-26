import React, { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { ACTIVE_CHAIN, APP_NAME } from "./util/constants";
import History from "./components/History";
import logo from "./assets/logo.png";
// https://docs.polygon.technology/docs/develop/wallets/walletconnect/

import CreateListing from "./components/CreateListing";

import "./App.css";
import FundPage from "./components/FundPage";
import { ethers } from "ethers";
import { web3ModalSetup } from "./context/web3ModalSetup";
import ConversationList from "./components/ConversationList";
import { capitalize } from "./util";

const { Header, Content, Footer } = Layout;

const web3Modal = web3ModalSetup();

function App() {
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState()
  const [account ,setAccount] = useState()

  // async function login() {
  //    const p = await initWeb3()
  //    const addr = p.provider.accounts[0]
  //    setProvider(p)
  //    setAccount(addr)
  // }

  async function login() {
    try {
      const instance = await web3Modal.connect();

      const p = new ethers.providers.Web3Provider(instance);
      setProvider(p)
      const accs = await p.listAccounts()
      setAccount(accs[0])
      } catch (error) {
        console.error(error)
      }
  }

  const checkConnected = async () => {
    if (web3Modal.cachedProvider) {
      const instance = await web3Modal.connect();
      const p = new ethers.providers.Web3Provider(instance);
      setProvider(p)
      const accs = await p.listAccounts()
      setAccount(accs[0])
    }
  }

  useEffect(() => {
    // checkConnected()
  }, [])

  const logout = async () => {
    web3Modal.clearCachedProvider();
    setAccount(undefined)
    setProvider(undefined)
  }

  const navigate = useNavigate();
  const path = window.location.pathname;

  const isFundPage = path.startsWith("/campaign");

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          {/* <div className="logo" /> */}
          <Menu
            // theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[]}
          >
            <Menu.Item key={0}>
              <img
                src={logo}
                className="header-logo pointer"
                onClick={() => navigate("/")}
              />
            </Menu.Item>

            {!isFundPage && (
              <>
                <Menu.Item key={1} onClick={async () => {
                  if (!account) {
                    await login()
                  }
                  navigate("/create")
                }}>
                  Start a fundraise page
                </Menu.Item>
                {/* {account && <Menu.Item key={2} onClick={() => navigate("/conversations")}>
                  Conversations
                </Menu.Item>} */}
                <Menu.Item key={3} onClick={() => navigate("/history")}>
                  View fundraise history
                </Menu.Item>
                <Menu.Item className="float-right">
                  ({capitalize(ACTIVE_CHAIN.name)})
                </Menu.Item>
              </>
            )}
            {!account && <span>
              <Button type="primary" onClick={login}  loading={loading} disabled={loading}>Login to Wallet</Button>
            </span> }
            {account && <span>
              Hello: {account.substr(0,6)}** <a href="" onClick={e => {
                e.preventDefault()
                logout()
              }}>logout</a></span>}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className={isFundPage? "fund-page" : "container"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/campaign/:pageId" element={<FundPage provider={provider} account={account} />} />
              <Route path="/create" element={<CreateListing provider={provider} account={account}/>} />
              <Route path="/history" element={<History />} />
              <Route path="/conversations/:address" element={<ConversationList provider={provider} account={account}/>} />
              <Route path="/conversations" element={<ConversationList provider={provider} account={account}/>} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {APP_NAME} ©2022 - Built for the ETHNewYork 2022 hackathon
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
