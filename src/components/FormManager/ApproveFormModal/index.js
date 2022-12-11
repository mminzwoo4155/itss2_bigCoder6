import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import {
  approveForm,
  disapproveForm,
  getSubmittedFormById
} from "../../../firebase/firestore/formStorage";

const ApproveFormModal = ({ isOpen, setIsOpen , id}) => {
  // console.log(id)
  const [formData, setFormData] = useState();
  useEffect(() => {
    console.log(id)
    const getFormData = getSubmittedFormById(id)
    getFormData.then((res) => setFormData(res))
  }, [])

  useEffect(() => {
    console.log(formData)
  }, [formData])
  
  const detailText = JSON.stringify(formData)

  const handleCancel = () => {
    // console.log(detailObject.status)
    // if(detailObject.status === 1) return;
    disapproveForm(id).then(() => {
      alert('Disapproved successful!')
    });
    setIsOpen(false);
  };
  const handleOK = () => {
    console.log(approveForm(id));
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleOK}
      okText={'Approve'}
      cancelText={'Disapprove'}
      title="Duyệt yêu cầu"
    >
      {detailText}
    </Modal>
  );
};

export default ApproveFormModal;
