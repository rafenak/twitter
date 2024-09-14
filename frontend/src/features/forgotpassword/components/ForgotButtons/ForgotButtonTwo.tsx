import React from "react";
import { ModalButton } from "../../../../components/ModalButton/ModalButton";
import './ForgotButtonTwo.css'

interface ForgotButtonTwoProps {
    onCancel: () => void;
    sendCode:()=> void;
  }
  
  export const ForgotButtonTwo:React.FC<ForgotButtonTwoProps> = ({
    onCancel,
    sendCode
  }) => {
    return (
      <div className="forgot-button-two">
        <ModalButton active={true}
        height={50}
        fontColor={"white"}
        backgroundColor={"black"}
        fontSize={17}
        fontWeight={700}
        hoverBackgound={{
          r :0,
          g: 0,
          b: 0,
          a: 0.9
        }}
        onClick={sendCode}
        >Next</ModalButton>
        <ModalButton active={true}
        height={50}
        fontColor={"black"}
        backgroundColor={"white"}
        boderColor={"#d3d3d3"}
        fontSize={17}
        fontWeight={700}
        hoverBackgound={{
          r: 83,
          g: 100,
          b: 113,
          a: 0.2,
        }}
        hoverBorder={{
          r: 211,
          g: 211,
          b: 211,
          a: 1,
        }}
        onClick={onCancel}
        >
          Cancel
        </ModalButton>
      </div>
    )
  }
  