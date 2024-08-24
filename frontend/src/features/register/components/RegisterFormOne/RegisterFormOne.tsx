import React, { useEffect, useState } from "react";
import "./RegisterFormOne.css";
import { ValidatedInput } from "../../../../components/validatedInput/ValidatedInput"
import { validateName } from "../../../../services/Validators";
import { RegisterNameInputs } from "../RegisterNameInputs/RegisterNameInputs";
import { RegisterDateInput } from "../RegisterDateInput/RegisterDateInput";
import { RegisterEmailInput } from "../RegisterEmailInput/RegisterEmailInput";



interface FormOneState {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

export const RegisterFormOne: React.FC = () => {
  const [stepOneState, setStepOneState] = useState<FormOneState>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
  });

  const updateUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepOneState({ ...stepOneState, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("state change", stepOneState);
  }, [stepOneState]);

  return (
    <div className="reg-step-one-container">
      <div className="reg-step-one-content">
        <RegisterNameInputs/>
         {/* <ValidatedInput
          name={"firstName"}
          label={"First"}
          errorMessage={"Whats your name?"}
          changeValue={updateUser}
          validator={validateName}
        />
        <ValidatedInput
          name={"lastName"}
          label={"Last"}
          errorMessage={"Whats your name?"}
          changeValue={updateUser}
          validator={validateName}
        /> 
        <ValidatedInput
          name={"email"}
          label={"Email"}
          errorMessage={"Please enter a valid email"}
          changeValue={updateUser}
          validator={() => true}
        /> */}
        <RegisterEmailInput />
        <RegisterDateInput />
      </div>
    </div>
  );
};
