import React, { useState,useEffect } from "react";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { RootState, AppDisptach } from "../../../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import "./RegisterFormSix.css";
import { updateRegister, updateUserPassword } from "../../../../redux/Slices/RegisterSlice";
import { useNavigate } from "react-router-dom";

export const RegisterFormSix: React.FC = () => {
  const state = useSelector((state: RootState) => state.register);

  const dispatch: AppDisptach = useDispatch();

  const [active, setActive] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    dispatch(updateRegister({
      name:"password",
      value: e.target.value
    }));
  };

  const toggleView = () => {
    setActive(!(password.length> 0 )? true : false);
  };

  

  useEffect(()=>{
    if(state.login){
      /*store some user info into local storage, we can load the user into user slice when we hit
      the feed page*/
      navigate('/home')
    }

  },[state.login])

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
