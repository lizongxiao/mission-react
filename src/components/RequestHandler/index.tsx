import React, { useState, useCallback, useEffect, useRef } from "react";
import { Spin, message } from "antd";

interface RequestHandlerProps {
  interfaceFunction: () => Promise<any>;
  onDataReceived: (data: any) => void; // 定义一个函数用于传递数据
  children: React.ReactNode;
}

type _partial = "children"; // 定义可选结

type _RequestHandlerProps = Partial<Pick<RequestHandlerProps, _partial>> &
  Omit<RequestHandlerProps, _partial>;

const RequestHandler: React.FC<_RequestHandlerProps> = ({
  interfaceFunction,
  onDataReceived,
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const messageApiSuccess = useCallback(() => {
    messageApi.open({
      type: "success",
      content: "请求成功",
    });
  }, [messageApi]);

  const messageApiError = useCallback(() => {
    messageApi.open({
      type: "error",
      content: "请求成功",
    });
  }, [messageApi]);

  const handleRequest = useCallback(() => {
    setLoading(true);
    interfaceFunction()
      .then((res) => {
        messageApiSuccess();
        setLoading(false);
        onDataReceived(res);
      })
      .catch((error) => {
        messageApiError();
        setLoading(false);
        console.error("请求失败：", error);
      });
  }, [messageApiSuccess, messageApiError, interfaceFunction, onDataReceived]);

  useEffect(() => {}, []);

  let ignore = useRef(false);

  useEffect(() => {
    if (ignore.current) {
      return;
    }
    handleRequest();

    ignore.current = true;
  }, [handleRequest]);

  return (
    <>
      {contextHolder}
      <Spin tip="Loading..." spinning={loading}>
        {children}
      </Spin>
    </>
  );
};

export default RequestHandler;
