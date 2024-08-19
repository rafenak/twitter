import React, { useEffect, useState } from "react";

import "./RegisterFormOne.css";
import { TextInput } from "../../../../components/TextInput/TextInput";

import { ValidatedInput } from "../../../../components/ValidatedInput/ValidatedInput";

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
        <ValidatedInput name={"firstName"} label={"First"} errorMessage={"Whats your name?"} 
        changeValue={updateUser} validator={()=>true}
        />
        </div>
        <div className="reg-step-one-content">
        <ValidatedInput name={"lastName"} label={"Last"} errorMessage={"Whats your name?"} 
        changeValue={updateUser} validator={()=>true}
        />
         </div>
         <div className="reg-step-one-content">
         <ValidatedInput name={"email"} label={"Email"} errorMessage={"Please enter a valid email"} 
        changeValue={updateUser} validator={()=>true}
        />
      </div>
    </div>
  );
};
