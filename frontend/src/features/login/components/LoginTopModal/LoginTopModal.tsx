import React from "react";
import buleLogo from "../../../../assets/social-media-no-bg.png";
import "./LoginTopModal.css";

interface LoginTopModalProps {
  closeModal: () => void;
}

export const LoginTopModal: React.FC<LoginTopModalProps> = ({ closeModal }) => {
  return (
    <div className="login-modal-top">
      <div className="login-modal-top-left">
        <div className="login-modal-top-shadow" onClick={closeModal}>
          x
        </div>
      </div>
      <div className="login-modal-top-middle">
        <img src={buleLogo} alt="logo" className="login-modal-top-logo" />
      </div>
      <div className="login-modal-top-right"></div>
    </div>
  );
};
