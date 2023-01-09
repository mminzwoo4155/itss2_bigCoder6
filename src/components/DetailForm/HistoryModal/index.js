import { Modal, notification, Button, Form, Input } from "antd";
import React from "react";
import { useAuth } from "../../../contexts/AuthContext";

const HistoryModal = ({ isOpen, setIsOpen, form, answer, onApplyAndSubmit, onApplyNotSubmit}) => {
  const { currentProfile } = useAuth();

  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleApplyAndSubmit = () => {
    onApplyAndSubmit(answer);
    setIsOpen(false);
  };

  const handleApplyNotSubmit = () => {
    onApplyNotSubmit();
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText={"Approve"}
      cancelText={"Disapprove"}
      title="Bạn đã từng gửi đơn này trước đây. Bạn có muốn sử dụng ngay thông tin cũ không?"
      footer={[
        <Button key={1} danger ghost onClick={handleCancel}>
            Không
        </Button>,
        <Button key={2} type="primary" onClick={handleApplyAndSubmit}>
            Áp dụng và gửi
        </Button>,
        <Button key={3} color="green" onClick={handleApplyNotSubmit}>
            Áp dụng nhưng không gửi
        </Button>
      ]}
    >
      <div>
        <p>
          <strong>Yêu cầu: </strong>
          {form?.title}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong>Thông tin sinh viên</strong>
        </p>
        <p>
          <strong>Họ và tên: </strong>
          {answer?.name}
        </p>
        <p>
          <strong>Mã số sinh viên: </strong>
          {answer?.student_id}
        </p>
        <p>
          <strong>Trường: </strong>
          {answer?.school}
        </p>
        <p>
          <strong>Khoa: </strong>
          {answer?.course}
        </p>
        <p>
          <strong>Niên khóa: </strong>
          {answer?.year}
        </p>
        <p style={{ textAlign: "center" }}>
          <strong>Câu trả lời</strong>
        </p>
        {form?.fields?.map((field) => {
          switch (field.type) {
            case "choice":
              const fieldAnswer = field.options.filter(
                (item) => item?.value?.toString() === answer[field.key]?.toString()
              );
              return (
                <p>
                  <strong>{field.Question}: </strong>
                  {fieldAnswer[0]?.label}
                </p>
              );
            case "text":
              return (
                <p>
                  <strong>{field.Question}: </strong>
                  {answer[field.key]}
                </p>
              );
            default:
              return null;
          }
        })}
      </div>
    </Modal>
  );
};

export default HistoryModal;
