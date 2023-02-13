import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";

// import { useState } from "react";
import "./index.css";
import { Route, Switch, useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogoutOutlined, FileWordOutlined } from "@ant-design/icons/lib/icons";
import MainContent from "../MainContent";
import DetailForm from "../DetailForm";
import FormManager from "../FormManager";
import Profile from "../Profile/Profile";
import Contribution from "../Contribution";
import Staff from "../Staff";

const { Content, Header } = Layout;

const Homepage = () => {
  const { logout, currentUser, currentProfile } = useAuth();
  const history = useHistory();
  const url = window.location.pathname;
  const defaultMenu = () => {
    switch (url) {
      case "/": {
        return "1";
      }
      case "/form-manager": {
        return "2";
      }
      case "/staff": {
        return "3";
      }
      case "/student": {
        return "3";
      }
      default:
        return "";
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("err");
    }
  };

  const items = [
    {
      label: <Link to="/">Trang chủ</Link>,
      key: "1",
    },
    {
      label: <Link to="/form-manager">Quản lý đơn từ</Link>,
      key: "2",
    },
    {
      label: (
        <Link to={currentProfile?.role === "staff" ? "/staff" : "/"}>
          {currentProfile ? currentProfile.role : "N/A"}
        </Link>
      ),
      key: "3",
    },
    currentProfile?.role === "student" && {
      label: <Link to="/teian">Đóng góp ý kiến</Link>,
      key: "4",
    },
  ];
  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            // onClick={(e) => setCurrent(e.key)}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[defaultMenu()]}
            items={items}
          />

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
              <Route exact path="/staff" component={Staff} />
              <Route exact path="/teian" component={Contribution} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Homepage;
