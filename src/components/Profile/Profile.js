import { Layout, Button } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
// import { LogoutOutlined } from "@ant-design/icons/lib/icons";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { logout, currentUser } = useAuth();
  const history = useHistory();

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
                <b>名前</b>: {currentUser.email}
              </h3>
            </div>
          </div>

          <div className="info-detail">
            {/* <p><b>メールアドレス:</b>      <span>{currentUser.email}</span></p>
              <p className="_1"><b>クラス:</b>      <span>{currentUser.email}</span></p>
              <p className="_1"><b>学部:</b>      <span>{currentUser.email}</span></p>
              <p className="_1"><b>学籍番号:</b>      <span>{currentUser.email}</span></p> */}

            <div className="left">
              <p>
                <b>メールアドレス:</b>
              </p>
              <p>
                <b>クラス:</b>
              </p>
              <p>
                <b>学部:</b>
              </p>
              <p>
                <b>学籍番号:</b>
              </p>
              <p style={{ fontSize: 15 }}>
                <b>
                  <Link to={`/forgot-password`}>パスワード変更？</Link>
                </b>
              </p>
            </div>

            <div className="right">
              <p>
                <input disabled defaultValue={currentUser.email}></input>
              </p>
              <p>
                <input disabled defaultValue={"hom nay la thu 4"}></input>
              </p>
              <p>
                <input disabled defaultValue={""}></input>
              </p>
              <p>
                <input disabled defaultValue={"troi dang mua"}></input>
              </p>
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
