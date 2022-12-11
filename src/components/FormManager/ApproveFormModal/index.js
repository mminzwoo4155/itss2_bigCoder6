import { Modal, notification, Button } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  approveForm,
  disapproveForm,
  getSubmittedFormById,
} from "../../../firebase/firestore/formStorage";

const ApproveFormModal = ({ isOpen, setIsOpen, id, getData }) => {
  const [detail, setDetail] = useState();
  useEffect(() => {
    const data = getSubmittedFormById(id);
    data.then((res) => {
      setDetail(res);
    });
    // data.then((res) => {
    //   console.log(res);
    // });
  }, [id]);

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
      onCancel={() => setIsOpen(false)}
      // onOk={handleOK}
      okText={"Approve"}
      cancelText={"Disapprove"}
      title="Duyệt yêu cầu"
      footer={[
        <Button key={1} danger ghost onClick={handleCancel}>
          Reject
        </Button>,
        <Button key={2} type="primary" onClick={handleOK}>
          Approve
        </Button>,
      ]}
    >
      {detail?.status}
    </Modal>
  );
};

export default ApproveFormModal;
