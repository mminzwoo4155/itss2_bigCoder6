import React from "react";
import "./index.css";
import { dataForm } from "./../../mock/formManager";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import StudentFormManager from "./StudentFormManager";
import StaffFormManager from "./StaffFormManager";


const FormManager = () => {
  const { currentProfile } = useAuth();
  // console.log(currentProfile);
  switch (currentProfile?.role) {
    case "student":
      return <StudentFormManager />;
    case "staff":
      return <StaffFormManager />;
    default:
      return null;
  }
};

export default FormManager;
