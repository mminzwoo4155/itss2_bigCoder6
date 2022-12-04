import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { mockData } from "../../mock/data";
import { Button, Radio, Space, Input, Form, Col, Row } from "antd";
import "./index.css";
import { DownloadOutlined } from "@ant-design/icons";
import useFormStorage from "../../hook/formStorage";
import { getAllForms, getFormById } from "../../firebase/firestore/formStorage";
// const { Meta } = Card;
const data = {
  title: 'Giay chung nhan sinh vien',
  full_description: 'dfasdfasdfasdfasdfadsfadsfasdfadsf',
  short_descriptino: 'avsvdasdv',
  fields: [
    {
      question: 'Tinh trang the sinh vien',
      answer_type: 'choice',
      answer: [
        'The hop le',
        'The khong con hop le',
        'Dang cho cap the'
      ]
    },
    {
      question: 'Ly do xin giay chung nhan sinh vien',
      answer_type: 'choice',
      answer: [
        'Lam ho so xin hoc bong',
        'Xin tam hoan nghia vu quan su',
        'Di lam them',
        'Khac',
      ]
    },
    {
      question: 'Dia chi nhan don',
      answer_type: 'text'
    }
  ]
}

const DetailForm = () => {
  const history = useHistory();
  const id = history.location.pathname.split("/")[2];
  // const data = mockData.find((item, index) => index.toString() === id);
  const [data1, setData] = useState({});

  useEffect(() => {
    const getForm = async () => {
      const formToFill = await getFormById(id);
      setData(formToFill);
    };
    
    getForm()
      .then(() => console.log(data1))
      .catch((e) => console.log(e));
  }, []);

  // const data = forms.find((item, index) => index.toString() === id);
  
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    console.log(form)
  }

  return (
    <div className="">
      <Row>
        <Col span={8}>
          <h3>{data.title}</h3>
          <p>{data.full_description}</p>
          <img src={data.src} alt="img"/>
          <br/>
          <Button icon={<DownloadOutlined />}>Tải xuống</Button>
        </Col>
        <Col span={16}>
          <h4>Mẫu đơn</h4>
          <Form layout="vertical" form={form}>
            {data.fields.map(field => {
              switch(field.answer_type){
                case 'choice': 
                  return (
                    <Form.Item label={field.question} name={field.question}>
                      <Radio.Group>
                        <Space direction="vertical">
                          {
                            field.answer.map(answer => (
                              <Radio value={answer}>{answer}</Radio>
                            ))
                          }
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  );
                case "text":
                  return (
                    <Form.Item label={field.question} name={field.question}>
                      <Input placeholder="Cau tra loi cua ban"></Input>
                    </Form.Item>
                  )
                default: return null;
              }
            })}
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={() => handleFormSubmit()}>Gửi</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default DetailForm;
