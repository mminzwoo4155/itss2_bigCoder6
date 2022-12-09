import { Modal } from "antd";
import React from "react";

const ApproveFormModal = ({ isOpen, setIsOpen }) => {
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleOK = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleOK}
      title="Duyệt yêu cầu"
    >
      FORM DETAIL
    </Modal>
  );
};

export default ApproveFormModal;
