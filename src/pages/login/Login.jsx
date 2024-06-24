import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../api/user";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  //在存在token的情况下，跳转到home
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" replace />;
  }
  const [form] = Form.useForm();
  // 记住密码
  const [remember, setRemember] = useState(false);
  const onChange = (e) => {
    setRemember(e.target.checked);
  };
  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const remember = localStorage.getItem("remember");
    if (remember == "true") {
      form.setFieldsValue({
        username,
        password,
      });
    }
  }, [remember]);

  const onFinish = async (values) => {
    form.validateFields().then(async () => {
      const data = await login(values);
      if (data.code === 200) {
        message.success("登录成功");
        localStorage.setItem("username", values.username);
        localStorage.setItem("password", values.password);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("remember", remember);
        navigate("/home");
      } else {
        message.error("登录失败");
      }
    });
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={require("../../assets/images/Sinobest-logo.png")} />
        </div>
        <div className="login">
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{ remember }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input
                size="large"
                className="login-input"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password
                size="large"
                className="login-input"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="remember">
              <Checkbox
                onChange={onChange}
                checked={remember}
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ marginRight: 150 }}>记住密码</span>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
          <div className="login-form-forgot">
            <a href="#">忘记密码</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
