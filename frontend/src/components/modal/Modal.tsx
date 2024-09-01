import React from "react";
import "./Modal.css";
import "../../assets/global.css";

interface ModalProps {
  topContent: JSX.Element;
  content: JSX.Element;
  bottomContent: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({
    topContent,content,bottomContent
}) => {
  return (
    <div className="modal">
      <div className="modal-box bg-color">
        <div className="modal-top">
            {topContent}
        </div>
        <div className="modal-content">
            {content}
        </div>
        <div className="modal-bottom">
            {bottomContent}
        </div>
      </div>
    </div>
  );
};
