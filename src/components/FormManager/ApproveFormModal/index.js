import { Modal } from "antd";
import React from "react";
import {
  approveForm,
  disapproveForm
} from "../../../firebase/firestore/formStorage";

const ApproveFormModal = ({ isOpen, setIsOpen , id}) => {
  const handleCancel = () => {
    console.log(disapproveForm(id));
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
      DETAIL
    </Modal>
  );
};

export default ApproveFormModal;
