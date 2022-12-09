import React, { useEffect, useState } from "react";
import "./index.css";
import { Table } from "antd";
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
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const getFormData = getAllSubmittedForm();
    getFormData.then((res) => setFormData(res));
  }, []);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
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
        <>{record?.status === 1 ? "Đã duyệt" : "Chưa duyệt"}</>
      ),
    },
    {
      title: "Xem chi tiết",
      align: "center",
      render: (_, record) => (
        <>
          {" "}
          <EyeOutlined onClick={() => setIsOpenModal(true)} />
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
          dataSource={formData.length > 0 ? formData : []}
          rowKey={(item) => item.id}
        />
        <ApproveFormModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      </div>
    </>
  );
};

export default StaffFormManager;
