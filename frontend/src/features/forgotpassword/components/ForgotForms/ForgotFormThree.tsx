import React from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import "./ForgotForms.css";
import "../../../../assets/global.css";

interface ForgotFormThreeProps {
  updateCode: (value: number) => void;
  valid: boolean;
}

export const ForgotFormThree: React.FC<ForgotFormThreeProps> = ({
  updateCode,
  valid,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateCode(+e.target.value);
  };

  return (
    <div className="forgot-form-container">
      <h1 className="forgot-form-header">We 've sent you a code</h1>
      <p className="forgot-form-text color-gray">
        Check your email to get the confirmation code,If you need a new code, go back
        and reselect to a confrmation
      </p>
      <ValidatedTextInput
        valid={valid}
        name={"code"}
        label={"Enter you code"}
        changeValue={handleChange}
      />
    </div>
  );
};
