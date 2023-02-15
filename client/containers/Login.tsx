import React, { useState } from "react";
import useFetch from "../hooks/fetch";
import { Form, Input, Checkbox, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import RoomsContainer from "./Rooms";
import MessagesContainer from "./Messages";

function LoginContainer() {
  const [authToken, setAuthToken] = useState({});
  //   const [error, setError] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogin = async (values) => {
    const { username, password } = values;
    localStorage.setItem("username", username);

    const response = await fetch("http://127.0.0.1:8000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    console.log("=====2======");

    const result = await response.json();
    console.log({ result });
    if (result.success === false) {
      console.log("=====3======");
      //   setError(result.message);
      //   messageApi.error(error);
    //   messageApi.error(result.message);
      message.error(result.message);
      return;
    }
    setAuthToken(result.authorizeTokern);
    console.log("=====4======");

    return (
      <div>
        <RoomsContainer />
        <MessagesContainer />
      </div>
    );
  };
  //   return (
  //     // <div>
  //     //   <div className={styles.usernameWrapper}>
  //     //     <div className={styles.usernameInner}>
  //     //       <input placeholder="Username" on />
  //     //       <input placeholder="Password" ref={} />
  //     //       <button className="cta" onClick={handleLogin}>
  //     //         START
  //     //       </button>
  //     //     </div>
  //     //   </div>
  //     // </div>
  //   );
  return (
    <Form
      name="login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
      style={{
        margin: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        padding: "10px",
        boxShadow: "5px",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
}

export default LoginContainer;
