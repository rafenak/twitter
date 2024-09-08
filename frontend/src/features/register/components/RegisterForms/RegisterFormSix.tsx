import React, { useState, useEffect } from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { RootState, AppDisptach } from "../../../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { useNavigate } from "react-router-dom";
import "./RegisterForms.css";
import "../../../../assets/global.css";
import { loginUser, setFromReigster } from "../../../../redux/Slices/UserSlice";

export const RegisterFormSix: React.FC = () => {
  const state = useSelector((state: RootState) => state);

  const dispatch: AppDisptach = useDispatch();

  const [active, setActive] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    dispatch(
      updateRegister({
        name: "password",
        value: e.target.value,
      })
    );
  };

  const toggleView = () => {
    setActive(!active);
  };

  useEffect(() => {
    if(state.user.loggedIn){
      navigate("/home")
      //hack so it won't call disptach twice as user is logged in
      return(()=>{

      })
    }

    if(state.user.fromRegister){
      //we are read to dispatch the login
      dispatch(loginUser({
        username:state.register.username,
        password:state.register.password
      }))
      return;
    }

    if (state.register.login) {
      /*store some user info into local storage, we can load the user into user slice when we hit
      the feed page*/
      //navigate("/home");
      //set the dispatch to set user.fromRegister
      dispatch(setFromReigster(true))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.register.login,state.user.loggedIn,state.user.fromRegister]);

  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="regsiter-header-2">You'all need a password</h1>
        <p className="register-text color-gray">
          Make sure it's 8 character or more.
        </p>
        <div className="register-six-password">
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
          <div onClick={toggleView} className="register-six-icon">
            {active ? (
              <VisibilityOffOutlinedIcon
                sx={{
                  fontSize: "20px",
                }}
              />
            ) : (
              <VisibilityOutlinedIcon
                sx={{
                  fontSize: "20px",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
