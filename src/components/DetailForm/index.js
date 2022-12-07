import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Col, Row } from "antd";
import "./index.css";
import { DownloadOutlined } from "@ant-design/icons";

import { getFormById } from "../../firebase/firestore/formStorage";
import RadioGroup from "./RadioGroup";
// const { Meta } = Card;

const DetailForm = () => {
  const history = useHistory();
  const id = history.location.pathname.split("/")[2];
  // const data = mockData.find((item, index) => index.toString() === id);
  const [data1, setData] = useState({});

  useEffect(() => {
    const getForm = getFormById(id);
    getForm.then((res) => {
      console.log(res);
      setData(res);
    });
    // getForm.then((res) => console.log(res)).catch((e) => console.log(e));
  }, []);

  // const data = forms.find((item, index) => index.toString() === id);

  const [form] = Form.useForm();

  const handleFormSubmit = (val) => {
    console.log(val);
  };

  return (
    <div className="">
      <Row>
        <Col span={8}>
          <h3>{data1.title}</h3>
          <p>{data1.full_description}</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/PDF_icon.svg/768px-PDF_icon.svg.png"
            style={{
              widows: "150px",
              height: "150px",
            }}
            alt="example"
          />
          <Button icon={<DownloadOutlined />}>Tải xuống</Button>
        </Col>
        <Col span={4}></Col>
        <Col span={12}>
          <h4>Mẫu đơn</h4>
          <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
            {data1?.fields?.map((item, index) => (
              <Form.Item label={item?.Question} key={index} name={item?.key}>
                <RadioGroup options={item?.options} />
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
