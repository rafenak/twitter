import React from "react";
import styled from "styled-components";
//import styled from '@emotion/styled';
import { StyledNextButtonProps } from "../../../../utils/GlobalInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDisptach } from "../../../../redux/Store";
import {
  incrementStep,
  registerUser,
  sendVerification,
  updateUserPassword,
  updateUserPhone,
} from "../../../../redux/Slices/RegisterSlice";

export const StyledNextButton = styled.button<StyledNextButtonProps>`
  width: 75%;
  height: 52px;
  font-size: 17px;
  color: white;
  background-color: ${(props) =>
    props.color === "blue"
      ? props.theme.colors.blue
      : props.theme.colors.black};
  opacity: ${(props) => (props.active ? 1.0 : 0.5)};
  border-radius: 50px;
  border: none;
  cursor: ${(props) => (props.active ? "pointer" : "auto")};
`;

export const StyledNextButtonFix = styled.button`
  width: 0%;
  height: 0%;
  display: none;
`;

interface RegisterNextButtonProps {
  step: number;
}

export const RegisterNextButton: React.FC<RegisterNextButtonProps> = ({
  step,
}) => {
  const dispatch: AppDisptach = useDispatch();
  const state = useSelector((state: RootState) => state.register);

  const nextStep = () => {
    dispatch(incrementStep());
  };

  const pad = (num: number): string => num.toString().padStart(2, "0");

  const sendUserInfo = () => {
    const user = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      dob: `${state.dob.year}-${pad(state.dob.month)}-${pad(state.dob.day)}`,
    };
    dispatch(registerUser(user));
  };

  const sendPhoneNumber=() =>{
    dispatch(updateUserPhone({
        username:state.username,
        phone: state.phoneNumber
    }))
  }

  const verifyEmail=()=>{
    dispatch(sendVerification({
      username: state.username,
      code: state.code
    }));
  }

  const sendPassword = async () => {
    await dispatch(
      updateUserPassword({
        username: state.username,
        password: state.password,
      })
    );
  };



  const determineModalButtonContent = (step: number): JSX.Element => {
    switch (step) {
      case 1:
        let stepOneActive =
          state.dobValid &&
          state.emailValid &&
          state.firstNameValid &&
          state.lastNameValid;
        return (
          <StyledNextButton
            disabled={!stepOneActive}
            color={"black"}
            active={stepOneActive}
            onClick={nextStep}
          >
            Next
          </StyledNextButton>
        );

      case 2:
        return (
          <StyledNextButton
            disabled={false}
            color={"black"}
            active={true}
            onClick={nextStep}
          >
            Next
          </StyledNextButton>
        );

      case 3:
        return (
          <StyledNextButton
            onClick={sendUserInfo}
            color={"black"}
            active={true}
          >
            Sign Up
          </StyledNextButton>
        );

      case 4:
        let stepFourActive = (state.phoneNumber && state.phoneNumberValid)? true : false
        return (
          <StyledNextButton
            disabled={!stepFourActive}
            color={"black"}
            active={stepFourActive}
            onClick={sendPhoneNumber}
          >
            Update Number
          </StyledNextButton>
        );

        case 5:
          let stepFiveActive = (state.code) ? true : false
        return (
          <StyledNextButton
          active={stepFiveActive}
          disabled={!stepFiveActive}
          color={"black"}
          onClick={verifyEmail}
        >
          Next
        </StyledNextButton>
        )

        case 6 :

        let stepSixActive = (state.password.length >=8) ? true : false;
          return (
            <StyledNextButton
        active={stepSixActive}
        disabled={!stepSixActive}
        onClick={sendPassword}
        color={"black"}
      >
        Next
      </StyledNextButton>
          )

      default:
        return (
          <StyledNextButton
            disabled={true}
            active={false}
            color={"black"}
            onClick={() => {}}
          >
            {step}
          </StyledNextButton>
        );
    }
  };

  return determineModalButtonContent(step);
};
