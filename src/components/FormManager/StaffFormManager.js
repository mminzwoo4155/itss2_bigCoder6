import React, { useEffect, useState } from "react";
import "./index.css";
import { Table, Tag } from "antd";
import { dataForm } from "./../../mock/formManager";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import {
  getAllSubmittedForm,
  getSubmittedFormByEmail,
} from "../../firebase/firestore/formStorage";
import { useAuth } from "../../contexts/AuthContext";
import ApproveFormModal from "./ApproveFormModal";

const StaffFormManager = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
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
  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);
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
      // render: (_, record) => <>{record?.timestamp}</>,
    },
    {
      title: "Lời nhắn từ hệ thống",
      dataIndex: "",
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

  return (
    <>
      <div className="form">
        <div className="title">Quản lý đơn từ</div>
        <Table
          columns={columns}
          dataSource={formData}
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
