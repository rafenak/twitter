import React, { useState } from "react";
import { Modal } from "../../../../components/modal/Modal";
import "./RegisterModal.css";
import { RegisterStepCounter } from "../RegisterStepCounter/RegisterStepCounter";
import { determineModalContent } from "../../utils/RegisterModalUtils";

export const RegisterModal: React.FC = () => {
  const [step, setStep] = useState<number>(3);

  const stepCheckBuild = () => {
    step === 1 || step === 4 || step >= 6 ? setStep(step) : setStep(step - 1);
  };

  return (
    <Modal>
      <div className="register-container">
        <RegisterStepCounter step={step} changeStep={stepCheckBuild} />
        <div className="register-modal-content">
        {determineModalContent(step)}
          </div>
        
      </div>
    </Modal>
  );
};
