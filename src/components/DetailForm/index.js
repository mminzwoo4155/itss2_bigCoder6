import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, Form, Col, Row, Input, notification } from "antd";
import "./index.css";
import { DownloadOutlined } from "@ant-design/icons";

import { getFormById } from "../../firebase/firestore/formStorage";
import RadioGroup from "./RadioGroup";
import Question from "./Question";
// const { Meta } = Card;

const profileArgs = [
  {
    label: "Họ và tên",
    key: "name"
  },
  {
    label: "Mã số sinh viên",
    key: "student_id",
  },
  {
    label: "Trường",
    key: "school"
  },
  {
    label: "Khóa",
    key: "year"
  },
  {
    label: "Khoa",
    key: "course"
  }
];

const DetailForm = () => {
  const history = useHistory();
  const { currentProfile } = useAuth();
  const id = history.location.pathname.split("/")[2];
  const [data1, setData] = useState({});

  useEffect(() => {
    const getForm = getFormById(id);
    getForm.then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  const [form] = Form.useForm();

  const handleAutoFill = () => {
    try {
      var values = {}
      profileArgs.forEach(item => {
        values[item.key] = currentProfile[item.key];
      })
      form.setFieldsValue(values);
    } catch (error) {
      notification.error({
        message: "Auto fill failed"
      });
    }
  }

  const handleFormSubmit = (val) => {
    console.log(val);
  };

  return (
    <div className="">
      <Row>
        <Col span={8}>
          <h3>{data1.title}</h3>
          <p className="form-description">{data1.full_description}</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/PDF_icon.svg/768px-PDF_icon.svg.png"
            style={{
              widows: "150px",
              height: "150px",
            }}
            alt="example"
          />
          <br/>
          <Button icon={<DownloadOutlined />}>Tải xuống</Button>
        </Col>
        <Col span={4}></Col>
        <Col span={12}>
          <Row>
            <Col span={6}>
              <h4>Mẫu đơn</h4>
            </Col>
            <Col span={6} offset={6}>
              <Button type="primary" onClick={(e) => handleAutoFill()}>Tự động điền</Button>
            </Col>
          </Row>
          <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
            {profileArgs.map((item) => (
              <Form.Item label={item.label} key={item.key} name={item.key}>
                <Input></Input>
              </Form.Item>
            ))}
            {data1?.fields?.map((item, index) => (
              <Form.Item label={item?.Question} key={index} name={item?.key}>
                {/* <RadioGroup options={item?.options} /> */}
                <Question itemData={item}/>
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default DetailForm;
