import { Modal, notification, Button } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  approveForm,
  disapproveForm,
  getSubmittedFormById,
  getFormById,
  getQuestionById
} from "../../../firebase/firestore/formStorage";

const ApproveFormModal = ({ isOpen, setIsOpen, id, getData }) => {
  const [detail, setDetail] = useState();
  // const [question, setQuestion] = useState();
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
          message: "Success disapprove form",
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
  const answer = detail?.answers
  // console.log(detail?.form_id)
  // useEffect(() => {
  //   const data = getQuestionById(detail?.form_id);
  //   data.then((res) => {
  //     setQuestion(res);
  //   });
  //   data.then((res) => {
  //     console.log(res);
  //   });
  // }, [id]);

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
      <div>
        <p><strong>Course: </strong>{answer?.course}</p>
        <p><strong>Name: </strong>{answer?.name}</p>
        <p><strong>Student id: </strong>{answer?.student_id}</p>
        <p><strong>Tình trạng thẻ: </strong>{answer?.question1}</p>
        <p><strong>Lý do làm thẻ: </strong>{answer?.question2}</p>
        <p><strong>School: </strong>{answer?.school}</p>
        <p><strong>Year: </strong>{answer?.year}</p>
      </div>
    </Modal>
  );
};

export default ApproveFormModal;
