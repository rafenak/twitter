import React from "react";
import { ModalButton } from "../../../../components/ModalButton/ModalButton";
import "./ForgotButtonOne.css";

interface ForgotButtonOneProps {
  value: string;
  handleClick: () => void;
}

export const ForgotButtonOne: React.FC<ForgotButtonOneProps> = ({
  value,
  handleClick,
}) => {
  return (
    <div className="forgot-button-one">
      <ModalButton
        active={value ? true : false}
        height={50}
        fontcolor={"white"}
        backgroundcolor={value ? "black" : "rgba(0,0,0,0.8)"}
        fontsize={17}
        fontweight={700}
        hoverbackgound={{
          r: 0,
          g: 0,
          b: 0,
          a: 0.8,
        }}
        onClick={handleClick}
      >
        Next
      </ModalButton>
    </div>
  );
};
