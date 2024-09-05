import React from "react";
import { Modal } from "../../../../components/modal/Modal";

interface LoginModalProps {
  toggleModal: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ toggleModal }) => {
  return (
    <Modal
      topContent={<div>Login top</div>}
      content={<div>Login content</div>}
      bottomContent={<div>Login bottom</div>}
    />
  );
};
