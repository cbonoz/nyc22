import React, { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { ACTIVE_CHAIN, APP_NAME } from "./util/constants";
import History from "./components/History";
import logo from "./assets/logo.png";
// https://docs.polygon.technology/docs/develop/wallets/walletconnect/

import { Mainnet, DAppProvider, useEthers, Config, useEtherBalance } from '@usedapp/core'
import CreateListing from "./components/CreateListing";

import "./App.css";
import FundPage from "./components/FundPage";
import WalletConnectProvider from "@walletconnect/web3-provider";

const { Header, Content, Footer } = Layout;

function App() {
  const { activateBrowserWallet, activate, deactivate, account } = useEthers()
  const [loading, setLoading] = useState(false)

  const etherBalance = useEtherBalance(account)

  async function login() {
    try {
      const provider = new WalletConnectProvider({
        rpc: {
          137: 'https://polygon-rpc.com',
          1337: 'http://localhost:8545',
          80001: ACTIVE_CHAIN.rpcUrl
        },
        chainId: ACTIVE_CHAIN.id
      });
      await provider.enable()
      provider.updateRpcUrl(ACTIVE_CHAIN.id); // This one forces the switch 

      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }

  const checkConnected = async () => {
    const e = window.ethereum
    if (!e) {
      return
    }
    const connected = e.isConnected()
    console.log('connected', connected)
    if (connected) {
      await login()
    }
  }

  useEffect(() => {
    // checkConnected()
  }, [])

  const logout = async () => {
    deactivate()
  }

  const navigate = useNavigate();
  const path = window.location.pathname;

  const isFundPage = path.startsWith("/fund");

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
                <Menu.Item key={2} onClick={() => navigate("/history")}>
                  View fundraise history
                </Menu.Item>
              </>
            )}
            {!account && <span>
              <Button type="primary" onClick={login}  loading={loading} disabled={loading}>Login with WalletConnect</Button>
            </span> }
            {account && <span>
              Hello: {account} <a href="" onClick={e => {
                e.preventDefault()
                logout()
              }}>logout</a></span>}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fund/:pageId" element={<FundPage />} />
              <Route path="/create" element={<CreateListing />} />
              <Route path="/history" element={<History />} />
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
