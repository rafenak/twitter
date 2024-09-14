import React from "react";
import { AppDisptach } from "../../../../redux/Store";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/Slices/UserSlice";
import { ModalButton } from "../../../../components/ModalButton/ModalButton";
import "./LoginButton.css";
import "../../../../assets/global.css";

interface LoginButtonProps {
  username: string;
  password: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  username,
  password,
}) => {
  const disptach: AppDisptach = useDispatch();

  const handleLogin = () => {
    disptach(
      loginUser({
        username,
        password,
      })
    );
  };

  return (
    <div className="login-button">
      <ModalButton
        active={password !== "" ? true : false}
        disabled={password !== "" ? false : true}
        height={50}
        fontcolor={"white"}
        backgroundcolor={password !== "" ? "black" : "rgba(0,0,0,0.5)"}
        fontsize={17}
        fontweight={700}
        hoverbackgound={{
          r: 0,
          g: 0,
          b: 0,
          a: 0.8,
        }}
        onClick={handleLogin}
      >
        Log in
      </ModalButton>
      <div className="login-button-text color-gray">
        Don't have an account?
        <span className="link color-blue">{" "}Sign Up</span>
      </div>
    </div>
  );
};
