import React from "react";
import { useHistory } from "react-router-dom";
import { mockData } from "../../mock/data";
import { Button, Card } from "antd";
import "./index.css";
import { DownloadOutlined } from "@ant-design/icons";
const { Meta } = Card;
const DetailForm = () => {
  const history = useHistory();
  const id = history.location.pathname.split("/")[2];
  const data = mockData.find((item, index) => index.toString() === id);
  console.log(data, id);
  return (
    <div className="">
      <Button icon={<DownloadOutlined />}>Tải xuống</Button>
      <div className="detail-form">
        <h3>{data.title}</h3>
        <img src={data.src} alt="img" />
      </div>
    </div>
  );
};

export default DetailForm;
