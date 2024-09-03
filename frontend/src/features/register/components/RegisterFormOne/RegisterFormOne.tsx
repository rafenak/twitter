import React from "react";
import { RegisterNameInputs } from "../RegisterNameInputs/RegisterNameInputs";
import { RegisterDateInput } from "../RegisterDateInput/RegisterDateInput";
import { RegisterEmailInput } from "../RegisterEmailInput/RegisterEmailInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import "./RegisterFormOne.css";
import { StyledNextButtonFix } from "../RegisterNextButton/RegisterNextButton";


export const RegisterFormOne: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);
  
  return (
    <div className="reg-step-one-container">
      <div className="reg-step-one-content">
      <h1 className="reg-step-one-header">Create your account</h1>
        <RegisterNameInputs
          firstName={state.firstName}
          lastName={state.lastName}
        />
         <RegisterEmailInput email={state.email} />
         <div className="reg-step-one-dob-disclaimer">
         <p className="reg-step-one-dob-header">Date of Birth</p>
          <span className="reg-step-one-dob-text">
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </span>
          </div>
          <RegisterDateInput date={state.dob} />
        </div>
        <StyledNextButtonFix></StyledNextButtonFix>
      </div>
    
  );
};
