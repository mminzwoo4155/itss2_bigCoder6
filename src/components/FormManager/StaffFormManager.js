import React, { useEffect, useState } from "react";
import "./index.css";
import { Table, Tabs, Tag } from "antd";
import { dataForm } from "./../../mock/formManager";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import {
  getAllSubmittedForm,
  getSubmittedFormByEmail,
} from "../../firebase/firestore/formStorage";
import { useAuth } from "../../contexts/AuthContext";
import ApproveFormModal from "./ApproveFormModal";
import useSubmitForm from "../../hook/submitFormStorage";

const StaffFormManager = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [currentTab, setCurrentTab] = useState("-1");

  const [formData1] = useSubmitForm();
  console.log(formData1);
  
  const [toProcessFormId, setToProcessFormId] = useState("");
  async function getData() {
    setLoading(true);
    try {
      const formData = await getAllSubmittedForm();
      console.log(formData);
      setFormData(formData);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const getTabData = () => {
    if(currentTab === "-1"){
      return { tabData : formData }
    }
    const data = formData.filter(record => record.status.toString() === currentTab);
    return { tabData : data }
  }

  const { tabData } = getTabData();

  const columns = [
    {
      title: "STT",
      width: "6%",
      align: "right",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Người tạo đơn",
      dataIndex: "student",
    },
    {
      title: "Thời gian tạo đơn",
      render: (_, record) => {
        const submitDate = new Date(record?.timestamp.seconds);
        return (
          <>{submitDate.toLocaleString()}</>
        )
      }
    },
    {
      title: "Lời nhắn",
      dataIndex: "message",
    },
    {
      title: "Trạng thái",
      render: (_, record) => (
        <Tag
          color={
            record?.status === 1
              ? "green"
              : record?.status === 2
              ? "red"
              : "gray"
          }
        >
          {record?.status === 1
            ? "Đã duyệt"
            : record?.status === 2
            ? "Không duyệt"
            : "Chưa duyệt"}
        </Tag>
      ),
    },
    {
      title: "Xem chi tiết",
      align: "center",
      render: (_, record) => (
        <>
          {" "}
          <EyeOutlined
            onClick={() => {
              setIsOpenModal(true);
              setToProcessFormId(record?.id);
            }}
          />
        </>
      ),
    },
  ];

  const tabs = [
    {
      key: "-1",
      label: "Tất cả",
    },
    {
      key: "0",
      label: "Đang chờ xử lý",
    },
    {
      key: "1",
      label: "Đã duyệt",
    },
    {
      key: "2",
      label: "Đã từ chối",
    },
  ]

  return (
    <>
      <div className="form">
        <div className="title">Quản lý đơn từ</div>
        <Tabs
          defaultActiveKey="-1"
          centered
          items={tabs}
          onChange={(activeKey) => setCurrentTab(activeKey)}
        />
        <Table
          columns={columns}
          dataSource={tabData}
          loading={loading}
          rowKey={(item) => item?.id}
        />
        <ApproveFormModal
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          id={toProcessFormId}
          getData={getData}
        />
      </div>
    </>
  );
};

export default StaffFormManager;
