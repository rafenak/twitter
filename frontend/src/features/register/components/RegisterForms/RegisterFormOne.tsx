import React from "react";
import { RegisterNameInputs } from "../RegisterNameInputs/RegisterNameInputs";
import { RegisterDateInput } from "../RegisterDateInput/RegisterDateInput";
import { RegisterEmailInput } from "../RegisterEmailInput/RegisterEmailInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { StyledNextButtonFix } from "../RegisterNextButton/RegisterNextButton";
import './RegisterForms.css'
import '../../../../assets/global.css'


export const RegisterFormOne: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);
  
  return (
    <div className="register-container">
      <div className="register-content">
      <h1 className="register-header">Create your account</h1>
        <RegisterNameInputs
          firstName={state.firstName}
          lastName={state.lastName}
        />
         <RegisterEmailInput email={state.email} />
         <div className="register-one-dob-wrapper">
         <h4 className="register-h4">Date of Birth</h4>
          <span className="register-text-sm color-gray">
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
