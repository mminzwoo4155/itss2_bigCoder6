import React, { useState } from "react";
import { Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./index.css";
import { useAuth } from "../../contexts/AuthContext";
import { message, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { submitContribution } from "../../firebase/firestore/contributionStorage";
import UploadFile from "./../Staff/UploadFile";

const Contribution = () => {
  const { currentUser, currentProfile } = useAuth();
  const [data, setData] = useState();
  const onFinish = (values) => {
    console.log(values);
    submitContribution(currentUser.email, values.iken, data);
  
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const props = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 10 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Ý kiến của bạn"
        name="iken"
        rules={[{ required: true, message: "Không được để trống !" }]}
      >
        <TextArea></TextArea>
      </Form.Item>

      <Form.Item label="Ảnh hoặc tài liệu góp ý" name="upload_file">
        <UploadFile setFile={setData}></UploadFile>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Contribution;
