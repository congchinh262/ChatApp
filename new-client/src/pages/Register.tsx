import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Alert, Layout, Modal } from "antd";
import { BASE_API_URL } from "../configs";
import { useNavigate } from "react-router-dom";
const { Content } = Layout;

const Context = React.createContext({ name: "Default" });

function Register() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  let navigate = useNavigate();
  const fetchData = async (body: any) => {
    try {
      const response = await fetch(`${BASE_API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      // setError(error as Error);
      setLoading(false);
    }
  };
  const handleSubmit = (values: any) => {
    const { username, password, email } = values;
    fetchData({ username, password, email, type: "USER" });
    console.log({ data });
    if (data.success === true) {
      navigate("/login");
      return <Alert message="success" type="success"></Alert>;
    } else {
      return <Alert message="failed" type="error"></Alert>;
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  return (
    <Content
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        borderRadius: "15px",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, padding: "5%" }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Sign up
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 1, span: 32 }}>
          Already have an account ? <a href="/login">Login</a> here
        </Form.Item>
        {/* <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            Your verify email has been sent to your email, please verify an
            email
          </div>
          <Button type="primary">
            <a href="/login">Login</a>
          </Button>
        </Modal> */}
      </Form>
    </Content>
  );
}

export default Register;
