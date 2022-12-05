import React from "react";
import "./index.css";
import { dataForm } from "./../../mock/formManager";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Button, Menu } from "antd";
import { Route, Switch, useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LogoutOutlined, FileWordOutlined } from "@ant-design/icons/lib/icons";

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

const FormManager = () => {
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
          <img
            src="https://play-lh.googleusercontent.com/lMrBvD9Xr3Lyh6bs1OVDCanvhoZQEu4sWICjbM5amCrMSgHKFjnjfJ4_1iZpGME0L7Y"
            className="logo"
          />
          <div className="menu">
            <Button type="primary" href="/">
              Trang chủ
            </Button>
            <Link to="/form-manager">Quản lí đơn từ</Link>
            <Button type="primary" href="">
              Tên nhân viên
            </Button>
          </div>
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
          <Layout>
            <div className="form">
              <table>
                <tr>
                  <th>STT</th>
                  <th>Người tạo đơn</th>
                  <th>Thời gian tạo đơn</th>
                  <th>Lời nhắn từ hệ thống</th>
                  <th>Trạng thái</th>
                  <th>Xem chi tiết</th>
                </tr>
                {dataForm.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.id}</td>
                      <td>{val.name}</td>
                      <td>{val.timeCreate}</td>
                      <td>{val.mess}</td>
                      <td>{val.status}</td>
                      <td>
                        <EyeOutlined />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default FormManager;
