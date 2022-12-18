import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Radio, Row, Space } from "antd";
import React from "react";
import { useState } from "react";

const AddFormModal = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  const [form] = Form.useForm();
  const [count, setCount] = useState([1]);
  const Question = ({ count }) => {
    const [option, setOption] = useState("text");
    const [choiceList, setChoiceList] = useState([1]);
    const onChange = (e) => {
      //   console.log(v);
      setOption(e.target.value.includes("choice") ? "choice" : "text");
    };
    return (
      <>
        <div>{`Câu hỏi ${count}`}</div>
        <Form.Item label="Câu hỏi" name={`question${count}`}>
          <Input placeholder="Nhap cau hoi" />
        </Form.Item>
        <Row>
          <Col span={10}>
            <Form.Item label="Tùy chọn" name={`type${count}`}>
              <Radio.Group onChange={onChange}>
                <Space direction="vertical">
                  <Radio value={`choice${count}`}>Choice</Radio>
                  <Radio value={`text${count}`}>Text</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          {option === "choice" && (
            <Col span={10}>
              {choiceList.map((item, index) => (
                <Form.Item key={index} name={`option${index + 1}`}>
                  <Input placeholder="option" />
                </Form.Item>
              ))}
              <Button
                icon={<PlusOutlined />}
                onClick={() => setChoiceList([...choiceList, 1])}
              ></Button>
            </Col>
          )}
        </Row>
      </>
    );
  };
  const onSubmit = (val) => {
    console.log("djt me");
    console.log(val);
  };
  return (
    <Modal title="Tạo form" open={isOpen} onCancel={handleClose} footer={null}>
      <Form form={form} onFinish={onSubmit}>
        {count.map((item, index) => (
          <Question count={index + 1} />
        ))}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setCount([...count, 1]);
          }}
        ></Button>
        <Row>
          <Button
            style={{
              margin: "0 20px",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" onClick={handleClose}>
            Submit
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddFormModal;
