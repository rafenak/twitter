import React from "react";
import "./RightSideBar.css";
import "../../../../assets/global.css";
import logoBlue from "../../../../assets/twitter-logo-large-blue.png";

interface RightSideBarProps {
  toggleRegister: () => void;
  toggleLogin: () => void;
}

export const RightSideBar: React.FC<RightSideBarProps> = ({
  toggleRegister,
  toggleLogin,
}) => {
  return (
    <div className="right-side-bar">
      <img src={logoBlue} className="right-side-bar-logo" alt="logoBlue" />
      <h1 className="right-side-bar-h1">Happening Now</h1>
      <h2 className="right-side-bar-h2">Join Social Media today.</h2>
      <div className="right-side-bar-signup-wrapper">
        <button>Sign up with Google</button>
        <button>Sign up with Apple</button>
        <div className="right-side-bar-divider">
          <div className="right-side-bar-line"></div>
          <p className="right-side-bar-or">or</p>
          <div className="right-side-bar-line"></div>
        </div>
        <button onClick={toggleRegister}>Create account</button>
        <p className="right-side-bar-legal color-gray">
          By Siging up, you agree to the
          <span className="link color-blue">Terms of Service</span> and{" "}
          <span className="link color-blue">Privacy Policy</span>, including{" "}
          <span className="link color-blue">Cookie Use.</span>
        </p>
      </div>
      <div className="right-side-bar-loggin-wrapper">
        <h3 className="right-side-bar-h3">Already have an account?</h3>
        <button>Sign in</button>
      </div>
    </div>
  );
};
