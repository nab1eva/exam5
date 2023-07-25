import { useCallback, useState } from "react";
import { Form, Input, message } from "antd";
import { request } from "../../server/request";
import { useEffect } from "react";
import { setAuthCookies } from "../../utils/setAuthCookies";
import "../../scss/account.scss";

const { useForm } = Form;

const Account = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [callback] = useState(false);

  const getUserData = useCallback(() => {
    request("auth/me").then(({ data }) => {
      form.setFieldsValue(data);
    });
  }, [form]);

  useEffect(() => {
    getUserData();
  }, [callback, getUserData]);

  const submit = async (values) => {
    try {
      setLoading(true);
      await request.put("auth/details", values);
      let { data } = await request.put("auth/password", values);
      setAuthCookies(data);
      message.success("Edited successfully !");
      getUserData();
      form.resetFields();
    } catch (err) {
      message.error("Wrong password !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="account">
      <div className="container">
        <div className="form-title">
          <h1>Account</h1>
        </div>
        <div className="account-form">
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={submit}
          >
            <Form.Item
              name="first_name"
              // label="First name"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              name="last_name"
              // label="Last name"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input placeholder="Last name" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              placeholder="Confirm password"
              rules={[
                {
                  required: true,
                  message: "Please fill this field !",
                },
              ]}
            >
              <Input placeholder="Confirm password" />
            </Form.Item>
            <Form.Item>
              <button loading={loading} type="submit">
                Save
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Account;
