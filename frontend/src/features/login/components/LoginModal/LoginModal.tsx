import React from "react";
import { Modal } from "../../../../components/modal/Modal";
import { LoginTopModal } from "../LoginTopModal/LoginTopModal";
import { LoginFormOne } from "../LoginForms/LoginFormOne";
import { RootState } from "../../../../redux/Store";
import { useSelector } from "react-redux";


interface LoginModalProps {
  toggleModal: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ toggleModal }) => {
  const state = useSelector((state: RootState) => state.user);
  return (
    <Modal
      topContent={<LoginTopModal closeModal={toggleModal} />}
      content={state.username ? <>Login Form 2</> : <LoginFormOne />}
      bottomContent={state.username ? <>Login form 2 buttom</>:<>/</>}
    />
  );
};
