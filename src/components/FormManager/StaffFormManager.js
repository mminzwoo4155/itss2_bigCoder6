import React, { useEffect, useState } from "react";
import "./index.css";
import { dataForm } from "./../../mock/formManager";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { getAllSubmittedForm, getSubmittedFormByEmail } from "../../firebase/firestore/formStorage";
import { useAuth } from "../../contexts/AuthContext";

const StaffFormManager = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState([]);
    useEffect(() => {
        const getFormData = getAllSubmittedForm();
        getFormData.then((res) => setFormData(res));
    }, []);

  return (
    <>
      <div className="form">
        <div className="title">Quản lý đơn từ</div>
        <table>
          <tr>
            <th>STT</th>
            <th>Người tạo đơn</th>
            <th>Thời gian tạo đơn</th>
            <th>Lời nhắn từ hệ thống</th>
            <th>Trạng thái</th>
            <th>Xem chi tiết</th>
          </tr>
          {formData.map((val, key) => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>{val.student}</td>
                <td>{val.timeCreate}</td>
                <td>{val.mess}</td>
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

export default StaffFormManager;
