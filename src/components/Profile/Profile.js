import { Layout, Button } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons/lib/icons";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";

const Profile = () => {
    const { logout, currentUser } = useAuth();
    const history = useHistory();
    const profile = JSON.parse(localStorage.getItem('profile'))

    console.log(profile);

    const handleLogout = async () => {
        try {
          await logout();
          history.push("/login");
        } catch {
          console.log("err");
          // setError("Failed to log out");
        }
      };

  return (
    <>
      <Layout>
        <div className="header">
          <div className="logo" />
          <div className="user-info">
            <div>
              <Link to={`/profile/${currentUser.uid}`}>
                {currentUser.email}
              </Link>
            </div>
            <Button
              danger
              ghost
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{
                margin: "10px",
              }}
            ></Button>
          </div>
        </div>

        
        <div className="update-profile">
          <Link to={`/update-profile`}>
            update-profile
          </Link>
        </div>

        <Layout>
            <div className="profile-top">
              <div className="profile-img">
              <img
                className="profileUserImg"
                src={'https://www.thuocdantoc.org/wp-content/uploads/2019/10/thi-la-1.jpg'}
                alt=""
              />
              </div>
              <div className="profile-name">
                <h3><b>名前</b>:   {profile.name || 'N/A'}</h3>
              </div>
            </div>

            <div className="info-detail">
              {/* <p><b>メールアドレス:</b>      <span>{currentUser.email}</span></p>
              <p className="_1"><b>クラス:</b>      <span>{currentUser.email}</span></p>
              <p className="_1"><b>学部:</b>      <span>{currentUser.email}</span></p>
              <p className="_1"><b>学籍番号:</b>      <span>{currentUser.email}</span></p> */}

              <div className="left">
                <p><b>メールアドレス:</b></p>
                <p><b>学部:</b></p>
                <p><b>証明番号:</b></p>
                <p><b>学籍番号:</b></p>
                <p><b>電話番号:</b></p>
                <p style={{fontSize: 15}}><b>
                    <Link to={`/forgot-password`}>
                        パスワード変更？
                    </Link>
                </b></p>
              </div>

              <div className="right">
                <p><input disabled defaultValue={profile.email}></input></p>
                <p><input disabled defaultValue={profile.specialized || 'N/A'}></input></p>
                <p><input disabled defaultValue={profile.id || 'N/A'}></input></p>
                <p><input disabled defaultValue={profile.studentId || 'N/A'}></input></p>
                <p><input disabled defaultValue={profile.phoneNumber || 'N/A'}></input></p>
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
