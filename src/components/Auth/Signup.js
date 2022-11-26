import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Input, Typography, Row } from "antd";
import "./index.css";
const { Title } = Typography;
const Signup = () => {
  const [form] = Form.useForm();
  const { signup } = useAuth();
  const history = useHistory();
  const handleSubmit = async (val) => {
    console.log(val);
    try {
      await signup(val.email, val.password);
      history.push("/");
    } catch {
      console.log("err");
    }
  };
  return (
    <div className="loginForm">
      <Form
        className="formStyle"
        form={form}
        onFinish={handleSubmit}
        title="Sign Up"
        layout="vertical"
      >
        <Title style={{ textAlign: "center" }} level={2}>
          Register
        </Title>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="cfpassword"
          rules={[
            {
              required: true,
              message: "Please re-input your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Row justify="center">
          <Button
            htmlType="submit"
            type="primary"
            style={{
              width: "160px",
              height: "50px",
              marginBottom: "20px",
            }}
          >
            Register
          </Button>
        </Row>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Link to="/login">Already have an account? Go to login page</Link>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
