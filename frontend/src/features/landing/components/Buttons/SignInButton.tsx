import React from "react";
import "./Buttons.css";
import "../../../../assets/global.css";

interface SignInButtonProps {
  handleClick: () => void;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ handleClick }) => {
  return (
    <div className="landing-button sign-in" onClick={handleClick}>
      <p className="sign-in-text color-blue">Sign In</p>
    </div>
  );
};

