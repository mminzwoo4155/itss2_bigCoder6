import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { formContent } from "../../mock/form";
import { jsPDF } from "jspdf";
import html2PDF from 'jspdf-html2canvas';
import { html2pdf } from "html2pdf.js"
import {
  Button,
  Form,
  Col,
  Row,
  Input,
  notification,
  Space,
  Checkbox,
  Modal,
} from "antd";
import "./index.css";
import { DownloadOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { getFormById, submitForm } from "../../firebase/firestore/formStorage";
import Question from "./Question";
import {
  getHistory,
  pushHistory,
} from "../../firebase/firestore/historyStorage";
import HistoryModal from "./HistoryModal";

const profileArgs = [
  {
    label: "Họ và tên",
    key: "name",
  },
  {
    label: "Mã số sinh viên",
    key: "student_id",
  },
  {
    label: "Trường",
    key: "school",
  },
  {
    label: "Khóa",
    key: "year",
  },
  {
    label: "Khoa",
    key: "course",
  },
];

const DetailForm = () => {
  const history = useHistory();
  const { currentUser, currentProfile } = useAuth();
  const [save, setSave] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preform, setPreform] = useState({});
  const id = history.location.pathname.split("/")[2];
  const [data1, setData] = useState({});

  useEffect(() => {
    const getForm = getFormById(id);
    getForm.then((res) => {
      setData(res);
    });
    const getFormHistory = getHistory(currentProfile?.id, id);
    getFormHistory.then((res) => {
      if (Object.keys(res).length !== 0) {
        setPreform(res);
        setIsModalOpen(true);
      }
    });
    handleAutoFill();
  }, []);

  const [form] = Form.useForm();

  const handleAutoFill = () => {
    try {
      var values = {};
      profileArgs.forEach((item) => {
        values[item.key] = currentProfile[item.key];
      });
      form.setFieldsValue(values);
    } catch (error) {
      notification.error({
        message: "Điền tự động thất bại. Profile cần được cập nhật",
      });
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      await submitForm(currentUser.email, id, data);
      if (save) {
        await pushHistory(currentProfile.id, id, data);
      }
      notification.success({
        message: "Gửi đơn thành công",
      });
      form.resetFields();
      history.push("/form-manager");
    } catch (error) {
      notification.error({
        message: "Đã có lỗi xảy ra: " + error.message,
      });
    }
  };

  const handleDownload = () => {
    let doc = new jsPDF()
    let html = formContent
    document.head.append(`<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script><script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>`)
    doc.html(html).then(() => doc.save('aaaa.pdf'))
  };

  const handlePreview = () => {
    document.body.innerHTML = formContent
  }

  const handleHistoryCheckbox = (e) => {
    setSave(e.target.checked);
  };

  const handleApplyForm = () => {
    form.setFieldsValue(preform);
  };

  return (
    <div className="">
      <Row>
        <Col span={8}>
          <h3>{data1.title}</h3>
          <div className="form-description">{data1.full_description}</div>
          <br />
          <br />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/PDF_icon.svg/768px-PDF_icon.svg.png"
            style={{
              widows: "150px",
              height: "150px",
            }}
            alt="example"
          />
          <br />
          <Button icon={<DownloadOutlined />} onClick={handleDownload}>
            Tải xuống
          </Button>
        </Col>
        <Col span={4}></Col>
        <Col span={12}>
          <Row>
            <h4>Mẫu đơn</h4>
          </Row>
          <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
            {profileArgs.map((item) => (
              <Form.Item label={item.label} key={item.key} name={item.key}>
                <Input></Input>
              </Form.Item>
            ))}
            {data1?.fields?.map((item, index) => (
              <Form.Item label={item?.Question} key={index} name={item?.key}>
                <Question itemData={item} />
              </Form.Item>
            ))}
            <Form.Item>
              <Space size={4} align="baseline">
                <p>Bạn có muốn lưu lại form để dùng cho lần sau?</p>
                <Checkbox onChange={handleHistoryCheckbox} value={save} />
              </Space>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
              <Button style={{marginLeft: "5px"}} icon={<EyeOutlined/>} onClick={handlePreview}>
                Preview
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <HistoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        answer={preform}
        form={data1}
        onApplyAndSubmit={handleFormSubmit}
        onApplyNotSubmit={handleApplyForm}
      />
    </div>
  );
};

export default DetailForm;
