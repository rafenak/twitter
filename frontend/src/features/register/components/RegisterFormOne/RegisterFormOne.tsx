import React, { useEffect, useState } from "react";
import "./RegisterFormOne.css";
// import { ValidatedInput } from "../../../../components/validatedInput/ValidatedInput"
// import { validateName } from "../../../../services/Validators";
import { RegisterNameInputs } from "../RegisterNameInputs/RegisterNameInputs";
import { RegisterDateInput } from "../RegisterDateInput/RegisterDateInput";
import { RegisterEmailInput } from "../RegisterEmailInput/RegisterEmailInput";
import { StyledNextButton } from "../RegisterNextButton/RegisterNextButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/Store";
import { AppDisptach } from "../../../../redux/Store";
import { incrementStep } from "../../../../redux/Slices/RegisterSlice";


interface FormOneState {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

export const RegisterFormOne: React.FC = () => {
  // const [stepOneState, setStepOneState] = useState<FormOneState>({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   dateOfBirth: "",
  // });

  const registerState = useSelector((state: RootState) => state.register);
  const dispatch:AppDisptach = useDispatch()

  const [buttonActive, setButtonActive] = useState<boolean>(false);

  const nextPage =()=>{
    dispatch(incrementStep())
  }


  // const updateUser = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setStepOneState({ ...stepOneState, [e.target.name]: e.target.value });
  // };

  useEffect(() => {
    if (
      registerState.dobValid &&
      registerState.emailValid &&
      registerState.firstNameValid &&
      registerState.lastNameValid
    ) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [registerState]);

  return (
    <div className="reg-step-one-container">
      <div className="reg-step-one-content">
        <RegisterNameInputs firstName={registerState.firstName} lastName={registerState.lastName} />
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
        <RegisterEmailInput email={registerState.email}/>
        <RegisterDateInput date={registerState.dob}/>
      </div>
      <StyledNextButton
        disabled={!buttonActive}
        active={buttonActive}
        color={"black"}
        onClick={nextPage}
      > Next </StyledNextButton>
    </div>
  );
};
