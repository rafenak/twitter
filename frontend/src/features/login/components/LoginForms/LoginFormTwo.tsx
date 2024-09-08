import React, { useState } from "react";
import { RootState } from "../../../../redux/Store";
import { useSelector } from "react-redux";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import { DisbaledValidatedInput } from "../../../../components/ValidatedInput/DisbaledValidatedInput";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import "./LoginForms.css";

interface LoginFormTwoProps {
  setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginFormTwo: React.FC<LoginFormTwoProps> = ({ setPassword }) => {
  const state = useSelector((state: RootState) => state.user);

  const [active, setActive] = useState<boolean>(false);

  const toggleView = () => {
    setActive(!active);
  };

  return (
    <div className="login-form-two-container">
      <div className="login-form-two-content">
        <h1 className="login-form-header">Enter your password</h1>
        <DisbaledValidatedInput label={"Username"} value={state.username} />
        <div className="login-form-two-password">
          <ValidatedTextInput
            valid={!state.error}
            label={"Password"}
            name={"password"}
            attributes={{
              minLength: 8,
              type: active ? "text" : "password",
            }}
            changeValue={setPassword}
          />

          <div onClick={toggleView} className="login-form-two-password-icon">
            {active ? (
              <VisibilityOffOutlinedIcon
                sx={{
                  fontSize: "22px",
                }}
              />
            ) : (
              <VisibilityOutlinedIcon
                sx={{
                  fontSize: "22px",
                }}
              />
            )}
          </div>
          {state.error ? <p className="login-form-error color-red">Password is incorrect</p>: <></>} 
          <p className="login-form-two-forgot color-blue">Forgot password?</p>
        </div>
      </div>
    </div>
  );
};
