import { Button, Layout, Menu } from "antd";
import React from "react";
// import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogoutOutlined, FileWordOutlined } from "@ant-design/icons/lib/icons";
import "./index.css";
import MainContent from "../MainContent";
import DetailForm from "../DetailForm";
const { Content, Sider } = Layout;

const menuItem = [
  {
    key: "sub1",
    icon: <FileWordOutlined />,
    label: "For Company",
    children: [
      {
        key: "1",
        label: `Mẫu đơn xin nghỉ việc`,
      },
      {
        key: 2,
        label: `Mẫu đơn xin nghỉ phép`,
      },
      {
        key: 3,
        label: `Mẫu đơn xin tăng lương`,
      },
      {
        key: 4,
        label: `Mẫu đơn xin việc`,
      },
    ],
  },
  {
    key: "sub2",
    icon: <FileWordOutlined />,
    label: "For School",
    children: [
      {
        key: 5,
        label: `Mẫu đơn xin nghỉ học`,
      },
      {
        key: 6,
        label: `Mẫu đơn xin tạm hoãn nghĩa vụ`,
      },
      {
        key: 7,
        label: `Giấy xác nhận sinh viên`,
      },
      {
        key: 8,
        label: `Mẫu đơn xin miễn giảm học phí`,
      },
      {
        key: 9,
        label: `Mẫu đơn xác nhận hộ nghèo`,
      },
    ],
  },
];

const Homepage = () => {
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("err");
      // setError("Failed to log out");
    }
  };

  return (
    <>
      <Layout>
        <div className="header">
          <div className="logo" />
          <div className="user-info">
            <div>{currentUser.email}</div>
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
        </div>
        <Layout>
          <Sider width={300} className="site-layout-background">
            <Menu
              mode="inline"
              // defaultSelectedKeys={["sub1"]}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1", "sub2"]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
              items={menuItem}
            />
          </Sider>
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
                <Route path="/form/*" component={DetailForm} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Homepage;
