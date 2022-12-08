import { Layout, Button } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
// import { LogoutOutlined } from "@ant-design/icons/lib/icons";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { logout, currentUser, currentProfile } = useAuth();
  const history = useHistory();
  // const profile = JSON.parse(localStorage.getItem('profile'))

  return (
    <>
      <Layout>
        <div className="update-profile">
          <Link to={`/update-profile`}>update-profile</Link>
        </div>

        <Layout>
          <div className="profile-top">
            <div className="profile-img">
              <img
                className="profileUserImg"
                src={
                  "https://www.thuocdantoc.org/wp-content/uploads/2019/10/thi-la-1.jpg"
                }
                alt=""
              />
            </div>
            <div className="profile-name">
              <h3>
                <b>名前</b>: {currentProfile.name || 'N/A'}
              </h3>
            </div>
          </div>

          <div className="info-detail">

            <div className="left">
              <p><b>メールアドレス:</b></p>
              <p><b>学部:</b></p>
              <p><b>証明番号:</b></p>
              <p><b>学籍番号:</b></p>
              <p><b>電話番号:</b></p>
              <p style={{ fontSize: 15 }}>
                <b>
                  <Link to={`/forgot-password`}>パスワード変更？</Link>
                </b>
              </p>
            </div>

            <div className="right">
              <p><input disabled defaultValue={currentProfile.email || 'N/A'}></input></p>
              <p><input disabled defaultValue={currentProfile.course || 'N/A'}></input></p>
              <p><input disabled defaultValue={currentProfile.id || 'N/A'}></input></p>
              <p><input disabled defaultValue={currentProfile.student_id || 'N/A'}></input></p>
              <p><input disabled defaultValue={currentProfile.phoneNumber || 'N/A'}></input></p>
            </div>
          </div>

          <div className="button">
            <button>保存</button>
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default Profile;