import React from "react";
import { Button, Checkbox, Form, Input, Card, message } from "antd";
import { login } from "../../api/process";
import { useLocation, useNavigate } from "react-router-dom";

function Login({ setAuthenticated }) {
  const Navigate = useNavigate();

  if (useLocation().pathname === "/logout") { 
    setAuthenticated(false);
  }

  return (
    <Card
      title="Sign In"
      bordered
      style={{
        width: 600,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }}
    >
      <Form
        name="basic"
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => {
          login(values)
            .then((res) => {
              Navigate("/benchmark")
              setAuthenticated(true);
            })
            .catch(() => {
              message.error("Account or password error, please login again!");
            });
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
            }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
