import React, { useEffect, useState } from "react";
import "./index.css";
import { Table } from "antd";
import { dataForm } from "./../../mock/formManager";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import {
  getAllSubmittedForm,
  getSubmittedFormByEmail,
  getAllSubmittedForm_timeStamp_asc,
} from "../../firebase/firestore/formStorage";
import { useAuth } from "../../contexts/AuthContext";
import ApproveFormModal from "./ApproveFormModal";

const StaffFormManager = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState([]);
  const [toProcessFormId, setToProcessFormId] = useState('');
  useEffect(() => {
    const getFormData = getAllSubmittedForm_timeStamp_asc();
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
      render: (_, record) => <>{ new Date(record?.timestamp?.seconds*1000).toLocaleString()}</>,
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
          <EyeOutlined onClick={
            () => {
              setIsOpenModal(true)
              setToProcessFormId(record.id)
              }
          } />
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
          rowKey={(item) => console.log('Here ' + item.id)}
        />
        <ApproveFormModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} id={toProcessFormId}/>
      </div>
    </>
  );
};

export default StaffFormManager;
