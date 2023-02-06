import { Button, Col, Form, Input, notification, Row } from "antd";
import React, { useState } from "react";
import { storage } from "../../firebase";
const UploadFile = ({ setFile }) => {
  //   const [form] = Form.useForm();
  //   const [file, setFile] = useState("");
  //   const upload = () => {
  //     if (file == null) return;

  //     //   .on("state_changed", alert("success"), alert);
  //   };
  return (
    // <Form layout="inline">
    <Form.Item label="Tải lên PDF">
      <Input
        type="file"
        accept="application/pdf,application/vnd.ms-excel"
        multiple={false}
        onChange={(e) => {
          // setFile(e.target.files[0]);
          storage
            .ref(`/file/${e.target.files[0].name}`)
            .put(e.target.files[0])
            .then((res) => {
              notification.success({
                message: "Tải file thành công",
              });

              res.ref.getDownloadURL().then((url) => setFile(url));
              //   setFile(`gs://big-coder-6.appspot.com/${res.metadata.fullPath}`);
            })
            .catch(() => {
              notification.error({
                message: "Tải file thất bại",
              });
            });
        }}
      />
    </Form.Item>
  );
};

export default UploadFile;
