import React from "react";
import { ValidatedDisplay } from "../../../../components/validatedInput/ValidatedDisplay";
import { RootState } from "../../../../redux/Store";
import { useSelector } from "react-redux";
import { stringifyDate } from "../../utils/DateUtils";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";

import './RegisterFormThree.css'

export const RegisterFormThree: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);

  return (
    <div className="reg-step-three-container">
      <div className="reg-step-three-content">
        <h1 className="reg-step-three-header">Create your account</h1>
        <div className="reg-step-three-value">
          <ValidatedDisplay
            label={"Name"}
            value={`${state.firstName} ${state.lastName}`}
          />
        </div>
        <div className="reg-step-three-value">
          <ValidatedDisplay label={"Email"} value={state.email} />
        </div>
        <div className="reg-step-three-value">
          <ValidatedDisplay
            label={"Birth date"}
            value={stringifyDate(state.dob)}
          />
        </div>
        <p className="reg-step-three-policy">
          By signing up are agree{" "}
          <span className="reg-step-three-link">Terms and Services</span> and{" "}
          <span className="reg-step-three-link">Privacy Policy</span>, including{" "}
          <span className="reg-step-three-link">Cookie use</span>. Socail Media{" "}
          may use your contact information, including your email address and{" "}
          phone number for purpose outlined in our Privcay Policy, like keeping{" "}
          in your account secure and personalizing our services including ads.{" "}
          <span className="reg-step-three-link">Learn More</span>. Others will{" "}
          be able to find you by email or phone number, when provided unless you{" "}
          choose otherwise <span className="reg-step-three-link">here</span>.
        </p>
      </div>
      <StyledNextButton onClick={()=> alert("singing up!")} color={"blue"} active={true}>
        Sign Up
      </StyledNextButton>
    </div>
  );
};
