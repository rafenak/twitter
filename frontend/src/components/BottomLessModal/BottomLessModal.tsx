import React from "react";
import "./BottomLessModal.css";
import "../../assets/global.css";

interface BottomLessModalProps {
  topBar: JSX.Element;
  content: JSX.Element;
}

export const BottomLessModal: React.FC<BottomLessModalProps> = ({
  topBar,
  content,
}) => {
  return (
    <div className="bottomless-modal-bg">
      <div className="bottomless-modal-box bg-color">
        <div className="bottomless-modal-scrollbox">
          <div className="bottomless-modal-top">
            {topBar}
          </div>
          <div className="bottomless-modal-content">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};
 