import React, { useState } from "react";
import { ValidatedTextInput } from "../../../../components/validatedInput/ValidatedTextInput";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDisptach, store } from "../../../../redux/Store";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { validateName } from "../../../../services/Validators";

import './RegisterNameInputs.css'

interface RigesterNameProps {
  firstName: string;
  lastName: string;
}

export const RegisterNameInputs: React.FC<RigesterNameProps> = ({
  firstName,
  lastName,
}) => {
  const [firstValid, setFirstValid] = useState<boolean>(true);
  const [lastValid, setLastValid] = useState<boolean>(true);

  const dispatch: AppDisptach = useDispatch();

  const updateName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "firstName") {
      dispatch(updateRegister({ name: e.target.name, value: e.target.value }));

      let valid = validateName(e.target.value);
      setFirstValid(valid);

      dispatch(
        updateRegister({ name: "firstNameValid", value: e.target.value })
      );
    }

    if (e.target.name === "lastName") {
      dispatch(updateRegister({ name: e.target.name, value: e.target.value }));

      let valid = validateName(e.target.value);
      setLastValid(valid);

      dispatch(
        updateRegister({ name: "lastNameValid", value: e.target.value })
      );
    }
  };

  return (
    <div className="register-name-input">
      <div className="register-name-content">
      <ValidatedTextInput
        valid={firstValid}
        name={"firstName"}
        label={"First"}
        changeValue={updateName}
        data={firstName}
      />
      {firstValid ? <></> : <span className="register-name-error">what's your first name?</span>}
      </div>
      <div className="register-name-content">
      <ValidatedTextInput
        valid={lastValid}
        name={"lastName"}
        label={"Last"}
        changeValue={updateName}
        data={lastName}
      />
      {lastValid ? <></> : <span className="register-name-error">what's your last name?</span>}
    </div>
    </div>
  );
};
