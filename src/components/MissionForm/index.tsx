import React, { useState, useRef } from "react";
import type { FormInstance, FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import "./index.css";

type FieldType = {
  mission?: string;
};

interface MissionFormProps {
  onOk?: (mission: any) => void;
}

const MissionForm: React.FC<MissionFormProps> = ({ onOk }) => {
  const formRef = useRef<FormInstance>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    formRef.current?.resetFields();
    onOk && onOk(values.mission);
    messageApi.open({
      type: "success",
      content: "添加成功",
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const [disabled, setDisabled] = useState<boolean>(true);

  return (
    <>
      {contextHolder}
      <Form
        ref={formRef}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 700, marginTop: "20px" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onChange={() => setDisabled(false)}
      >
        <Form.Item<FieldType>
          label="任务名称"
          name="mission"
          rules={[{ required: true, message: "请输入任务名称" }]}
        >
          <div className="MissionForm">
            <Input allowClear placeholder="请输入任务名称" />
            <Button disabled={disabled} type="primary" htmlType="submit">
              确定
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default MissionForm;
