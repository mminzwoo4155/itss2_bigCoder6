import { Menu, Tabs } from "antd";
import { useState, useEffect } from "react";
import React from "react";
import AllForm from "./AllForm";

const Staff = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("-1");

  const tabs = [
    {
      key: "-1",
      label: "Quản lý form",
    },
    {
      key: "0",
      label: "Quản lý người dùng",
    },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="title">Quản lý đơn từ</div>
      <Tabs
        defaultActiveKey="-1"
        centered
        items={tabs}
        onChange={(activeKey) => setCurrentTab(activeKey)}
      />
      {currentTab === "-1" ? <AllForm /> : <></>}
    </div>
  );
};

export default Staff;
