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
        fontcolor={"white"}
        backgroundcolor={"black"}
        fontsize={17}
        fontweight={700}
        hoverbackgound={{
          r :0,
          g: 0,
          b: 0,
          a: 0.9
        }}
        onClick={sendCode}
        >Next</ModalButton>
        <ModalButton active={true}
        height={50}
        fontcolor={"black"}
        backgroundcolor={"white"}
        bodercolor={"#536471"}
        fontsize={17}
        fontweight={700}
        hoverborder={{
          r :83,
          g: 100 ,
          b: 113,
          a: 1
        }}
        hoverbackgound={{
          r :83,
          g: 100 ,
          b: 113,
          a: 1
        }}
        onClick={onCancel}
        >
          Cancel
        </ModalButton>
      </div>
    )
  }
  