import React, { useState, useEffect } from "react";
import { RootState, AppDisptach } from "../../../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";
import "./RegisterFormFive.css";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import { resendEmail,sendVerification } from "../../../../redux/Slices/RegisterSlice";

export const RegisterFormFive: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);

  const dispatch: AppDisptach = useDispatch();

  const [code, setSode] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSode(e.target.value);
  };

  const resend = () => {
    dispatch(resendEmail(state.username));
  };

  const verify= () => {
    dispatch(sendVerification({
      username: state.username,
      code: code
    }));
  };


  return (
    <div className="reg-step-five-container">
      <div className="reg-step-five-content">
        <h1>We have sent a code</h1>
        <p>Please enter it below to verify {state.email}</p>
        <ValidatedTextInput
          valid={true}
          name={"code"}
          label={"Verification Code"}
          changeValue={handleChange}
        />
        <p className="reg-step-five-message" onClick={resend}>Didn't received a email?</p>
      </div>
      <StyledNextButton
          active={code ? true : false}
          disabled={code ? false : true}
          color={"black"}
          onClick={verify}
        >
          Next
        </StyledNextButton>
    </div>
  );
};
