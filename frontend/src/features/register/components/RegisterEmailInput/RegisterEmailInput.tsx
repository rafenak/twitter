import React, { useState, useEffect } from "react";
import { ValidatedTextInput } from "../../../../components/validatedInput/ValidatedTextInput";
import { useDispatch } from "react-redux";
import { AppDisptach } from "../../../../redux/Store";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { validateEmail } from "../../../../services/Validators";

export const RegisterEmailInput: React.FC = () => {
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const dispatch: AppDisptach = useDispatch();

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateRegister({ name: "email", value: e.target.value }));

    let valid = validateEmail(e.target.value)
    setValidEmail(valid);

    dispatch(updateRegister({ name: "emailValid", value: valid }));
  };

  return (
    <div className="register eamil-input">
      <ValidatedTextInput
        valid={validEmail}
        label={"Email"}
        name={"email"}
        changeValue={updateEmail}
      />
    </div>
  );
};
 