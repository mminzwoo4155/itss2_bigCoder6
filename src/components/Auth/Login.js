import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Input, Typography, Row, notification } from "antd";
import "./index.css";
const { Title } = Typography;
const Login = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const history = useHistory();
  const handleSubmit = async (val) => {
    console.log(val);
    try {
      await login(val.email, val.password);
      notification.success({
        message: " Login success",
      });
      history.push("/");
    } catch {
      notification.error({
        message: "Error",
        description: "Invalid email or password",
      });
    }
  };
  return (
    <div className="loginForm">
      <Form
        className="formStyle"
        form={form}
        onFinish={handleSubmit}
        // title="Sign Up"
        layout="vertical"
      >
        <Title style={{ textAlign: "center" }} level={2}>
          Login
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
            Login
          </Button>
        </Row>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Link to="/signup">Need an account? Sign Up</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
