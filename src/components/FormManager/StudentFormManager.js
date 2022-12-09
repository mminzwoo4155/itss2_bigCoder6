import React, { useEffect, useState } from "react";
import "./index.css";
import { dataForm } from "./../../mock/formManager";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { getSubmittedFormByEmail } from "../../firebase/firestore/formStorage";
import { useAuth } from "../../contexts/AuthContext";

const StudentFormManager = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        const getFormData = getSubmittedFormByEmail(currentUser.email);
        getFormData.then((res) => setFormData(res));
    }, []);

  return (
    <>
      <div className="form">
        <div className="title">Quản lý đơn từ</div>
        <table>
          <tr>
            <th>STT</th>
            <th>Thời gian tạo đơn</th>
            <td>Loại giấy tờ</td>
            <th>Lời nhắn từ hệ thống</th>
            <th>Trạng thái</th>
            <th>Xem chi tiết</th>
          </tr>
          {formData.map((val, key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{val.timeCreate}</td>
                <td>{val.mess}</td>
                <td>{val.form_id}</td>
                <td>{val.status}</td>
                <td>
                  <EyeOutlined />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default StudentFormManager;
