import { Button, Layout, Menu } from "antd";
import React from "react";

// import { useState } from "react";
import "./index.css";
import { Route, Switch, useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogoutOutlined, FileWordOutlined } from "@ant-design/icons/lib/icons";
import MainContent from "../MainContent";
import DetailForm from "../DetailForm";
import FormManager from "../FormManager";
import Profile from "../Profile/Profile";

const { Content, Header } = Layout;

const Homepage = () => {
  const { logout, currentUser, currentProfile } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("err");
    }
  };

  return (
    <>
      <Layout>
        <Header className="header">
          <img
            src="https://play-lh.googleusercontent.com/lMrBvD9Xr3Lyh6bs1OVDCanvhoZQEu4sWICjbM5amCrMSgHKFjnjfJ4_1iZpGME0L7Y"
            className="logo"
          />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/form-manager">Quản lý đơn từ</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/">{currentProfile ? currentProfile.role : 'N/A'}</Link>
            </Menu.Item>
          </Menu>

          <div className="user-info">
            <div>
              <Link to={`/profile/${currentUser.uid}`}>
                {currentUser.email}
              </Link>
            </div>
            <Button
              danger
              ghost
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{
                margin: "10px",
              }}
            ></Button>
          </div>
        </Header>

        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path="/" component={MainContent} />
              <Route exact path="/form/*" component={DetailForm} />
              <Route path="/form-manager" component={FormManager} />
              <Route path="/profile/:uid" component={Profile} />
              {/* <Route exact path="/student" component={Profile} /> */}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Homepage;
