import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDisptach } from "../../../../redux/Store";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { validateEmail } from "../../../../services/Validators";
import './RegsiterEmailInput.css'
import {ValidatedTextInput} from '../../../../components/ValidatedInput/ValidatedTextInput'

interface RegisterEmailInputPros{
    email:string;
}

export const RegisterEmailInput: React.FC<RegisterEmailInputPros> = ({email}) => {
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const dispatch: AppDisptach = useDispatch();

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateRegister({ name: "email", value: e.target.value }));

    let valid = validateEmail(e.target.value)
    setValidEmail(valid);

    dispatch(updateRegister({ name: "emailValid", value: valid }));
  };

  return (
    <div className="register-email-input">
      <ValidatedTextInput
        valid={validEmail}
        label={"Email"}
        name={"email"}
        changeValue={updateEmail}
        data={email}
      />
      {validEmail ? <></> : <span className="register-email-error">Please enter a valid email.</span>}
    </div>
  );
};
 