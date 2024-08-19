import React, { useEffect, useState } from "react";

import "./RegisterFormOne.css";
import { TextInput } from "../../../../components/TextInput/TextInput";

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
    setStepOneState({...stepOneState, [e.target.name]: e.target.value})
  };

  useEffect(() => {
    console.log("state change",stepOneState)
  }, [stepOneState])
  



  return (
    <div className="reg-step-one-container">
      <div className="reg-step-one-content">
        {/* <TextInput></TextInput> */}
        <TextInput name={"firstName"} label={"First"} errorMessage={"Please enter your name"} 
        onChange={updateUser}></TextInput>
        <TextInput name={"lastName"} label={"last"} errorMessage={"Please enter your name"} 
        onChange={updateUser}></TextInput>
        <TextInput name={"email"} label={"email"} errorMessage={"Please enter your valid email"} 
        onChange={updateUser}></TextInput>
      </div>
    </div>
  );
};
