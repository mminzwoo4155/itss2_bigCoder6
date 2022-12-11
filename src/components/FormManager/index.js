import React from "react";
import "./index.css";
import { dataForm } from "./../../mock/formManager";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import StudentFormManager from "./StudentFormManager";
import StaffFormManager from "./StaffFormManager";

// const FormManager = () => {
//   return (
//     <>
//       <div className="form">
//         <div className="title">Quản lý đơn từ</div>
//         <table>
//           <tr>
//             <th>STT</th>
//             <th>Người tạo đơn</th>
//             <th>Thời gian tạo đơn</th>
//             <th>Lời nhắn từ hệ thống</th>
//             <th>Trạng thái</th>
//             <th>Xem chi tiết</th>
//           </tr>
//           {dataForm.map((val, key) => {
//             return (
//               <tr key={key}>
//                 <td>{val.id}</td>
//                 <td>{val.name}</td>
//                 <td>{val.timeCreate}</td>
//                 <td>{val.mess}</td>
//                 <td>{val.status}</td>
//                 <td>
//                   <EyeOutlined />
//                 </td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>
//     </>
//   );
// };

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
