import React, { useEffect } from "react";
import { Modal } from "../../../../components/modal/Modal";
import { RegisterStepCounter } from "../RegisterStepCounter/RegisterStepCounter";
import { determineModalContent } from "../../utils/RegisterModalUtils";
import { useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "../../../../redux/Store";
import {
  cleanRegisterState,
  decrementStep,
} from "../../../../redux/Slices/RegisterSlice";
import { RegisterNextButton } from "../RegisterNextButton/RegisterNextButton";
import "./RegisterModal.css";

interface RegisterModalProps{
  toggleModal:()=>void;

}

export const RegisterModal: React.FC<RegisterModalProps> = ({toggleModal}) => {
  //const [step, setStep] = useState<number>(3);

  const state = useSelector((state: RootState) => state.register);
  const dispatch: AppDisptach = useDispatch();

  const stepCheckBuild = () => {
    if(state.step ===1){
      toggleModal();
      return;
    }
    dispatch(decrementStep());
  };

  useEffect(() => {
    return () => {
      dispatch(cleanRegisterState());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      topContent={
        <RegisterStepCounter step={state.step} changeStep={stepCheckBuild} />
      }
      content={determineModalContent(state.step)}
      bottomContent={
        <RegisterNextButton step={state.step}></RegisterNextButton>
      }
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
