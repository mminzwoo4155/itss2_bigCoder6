import { Modal, notification } from "antd";
import React from "react";
import {
  approveForm,
  disapproveForm,
} from "../../../firebase/firestore/formStorage";

const ApproveFormModal = ({ isOpen, setIsOpen, id, getData }) => {
  const handleCancel = () => {
    disapproveForm(id)
      .then(() => {
        notification.success({
          message: "Success approve form",
        });
        getData();
      })
      .catch(() => {
        notification.error({
          message: "Error",
        });
      });
    setIsOpen(false);
  };
  const handleOK = () => {
    approveForm(id)
      .then(() => {
        notification.success({
          message: "Success approve form",
        });

        getData();
      })
      .catch(() => {
        notification.error({
          message: "Error",
        });
      });
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      onOk={handleOK}
      okText={"Approve"}
      cancelText={"Disapprove"}
      title="Duyệt yêu cầu"
    >
      DETAIL
    </Modal>
  );
};

export default ApproveFormModal;
