import React, { useState } from "react";
import { Button, Modal } from "antd";

interface _MyModalProps {
  children: React.ReactNode;
  onSuccess: (data: any) => void;
}

const MyModal: React.FC<_MyModalProps> = ({ children, onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (data: any) => {
    onSuccess && onSuccess(data);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 在这里将事件处理函数传递给子组件
  const ModifiedChildren: React.ReactNode[] =
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          onOk: handleOk,
          onCancel: handleCancel,
        });
      }
      return child;
    }) || [];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        创建任务
      </Button>
      <Modal
        title="任务创建"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        {ModifiedChildren}
      </Modal>
    </>
  );
};

export default MyModal;
