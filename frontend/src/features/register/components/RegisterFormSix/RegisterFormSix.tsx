import React, { useState } from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";
import { RootState, AppDisptach } from "../../../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import "./RegisterFormSix.css";
import { updateUserPassword } from "../../../../redux/Slices/RegisterSlice";

export const RegisterFormSix: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);

  const dispatch: AppDisptach = useDispatch();

  const [active, setActive] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleView = () => {
    setActive(!active);
  };

  const sendPassword = () => {
    dispatch(
      updateUserPassword({
        username: state.username,
        password: password,
      })
    );
  };

  return (
    <div className="reg-step-six-container">
      <div className="reg-step-six-content">
        <h1>You'all need a password</h1>
        <p>Make sure it's 8 character or more.</p>
        <div className="reg-step-six-password">
          <ValidatedTextInput
            valid={true}
            label={"password"}
            name={"password"}
            changeValue={handleChange}
            attributes={{
              minLength: 8,
              type: active ? "text" : "password",
            }}
          />
          <div onClick={toggleView} className="reg-step-six-icon">
            {active ? (
              <VisibilityOffOutlinedIcon
                sx={{
                  fontSize: "24px",
                }}
              />
            ) : (
              <VisibilityOutlinedIcon
                sx={{
                  fontSize: "24px",
                }}
              />
            )}
          </div>
        </div>
      </div>
      <StyledNextButton
        active={password.length >= 8}
        disabled={!(password.length >= 8)}
        onClick={sendPassword}
        color={"black"}
      >
        Next
      </StyledNextButton>
    </div>
  );
};
