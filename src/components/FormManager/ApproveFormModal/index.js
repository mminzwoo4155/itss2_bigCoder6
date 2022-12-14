import { Modal, notification, Button, Form, Input } from "antd";
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

const { TextArea } = Input;

const ApproveFormModal = ({ isOpen, setIsOpen, id, getData }) => {
  const [detail, setDetail] = useState();
  const [msgStatus, setStatus] = useState();
  useEffect(() => {
    setStatus({
      status: '',
      message: '',
    })
    const data = getSubmittedFormById(id);
    data.then((res) => {
      console.log(res);
      setDetail(res);
    });
  }, [id]);

  const handleCancel = () => {
    const message = form.getFieldValue('message');
    if(!message){
      setStatus({
        status: 'error',
        message: 'Cần nêu rõ lý do từ chối đơn',
      });
      return;
    }
    disapproveForm(id, message)
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
  const answer = detail?.answers;

  const [form] = Form.useForm();

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      // onOk={handleOK}
      okText={"Approve"}
      cancelText={"Disapprove"}
      title="Duyệt yêu cầu"
      footer={detail?.status === 0 ? [
        <Button key={1} danger ghost onClick={handleCancel}>
          Từ chối
        </Button>,
        <Button key={2} type="primary" onClick={handleOK}>
          Duyệt
        </Button>,
      ] : []}
    >
      <div>
        <p><strong>Yêu cầu: </strong>{detail?.form.title}</p>
        <p style={{textAlign: "center"}}><strong>Thông tin sinh viên</strong></p>
        <p><strong>Khoa: </strong>{answer?.course}</p>
        <p><strong>Họ và tên: </strong>{answer?.name}</p>
        <p><strong>Mã số sinh viên: </strong>{answer?.student_id}</p>
        <p><strong>Trường: </strong>{answer?.school}</p>
        <p><strong>Niên khóa: </strong>{answer?.year}</p>
        <p style={{textAlign: "center"}}><strong>Câu trả lời</strong></p>
        {detail?.form.fields.map((field) => {
          const fieldAnswer = field.options.filter(item => item.value.toString() === answer[field.key].toString());
          return (
            <p><strong>{field.Question}: </strong>{fieldAnswer[0]?.label}</p>
          )
        })}
        {detail?.status === 0 ? 
          <Form form={form} layout='vertical'>
            <Form.Item 
              label='Lời nhắn'
              key='message' 
              name='message'
              validateStatus={msgStatus?.status}
              help={msgStatus?.message}>
              <TextArea rows={3}/>
            </Form.Item>
          </Form> 
          : null}
      </div>
    </Modal>
  );
};

export default ApproveFormModal;
