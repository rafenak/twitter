import React from "react";
import { Modal } from "../../../../components/modal/Modal";
import "./RegisterModal.css";
import { RegisterStepCounter } from "../RegisterStepCounter/RegisterStepCounter";
import { determineModalContent } from "../../utils/RegisterModalUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import { decrementStep } from "../../../../redux/Slices/RegisterSlice";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";


export const RegisterModal: React.FC = () => {
  //const [step, setStep] = useState<number>(3);

  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDisptach = useDispatch();

  const stepCheckBuild = () => {
    //step === 1 || step === 4 || step >= 6 ? setStep(step) : setStep(step - 1);
    dispatch(decrementStep());
  };

  return (
    <Modal
      topContent={
        <RegisterStepCounter step={state.step} changeStep={stepCheckBuild} />
      }
      content={determineModalContent(state.step)} 
      bottomContent={<StyledNextButton
        disabled={false}
        active={true}
        color={"black"}
        onClick={()=>{}}
      >
        Next
      </StyledNextButton>}
    />
  );

  // return (
  //   <Modal>
  //     <div className="register-container">
  //       <RegisterStepCounter step={state.step} changeStep={stepCheckBuild} />
  //       <div className="register-modal-content">
  //       {determineModalContent(state.step)}
  //         </div>

  //     </div>
  //   </Modal>
  // );
};
