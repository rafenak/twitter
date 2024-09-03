import React from "react";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import "./RegisterForms.css";
import '../../../../assets/global.css'

export const RegisterFormTwo: React.FC = () => {
  return (
    <div className="register-container">
      <div className="register-content">
        <h1 className="register-header">Customize your experience</h1>
        <h3 className="register-subheader">
          Track where you see Social Media content across the web.
        </h3>
        <div className="register-two-checkbox-wrapper">
          <p className="register-text">
            Social Media uses this data to personalize your experiene.This web
            browing history will be stored with your name, email or phone
            number.
          </p>
          <Checkbox />
        </div>
        <p className="register-text color-gray">
          By signing up, you agree to our
          <span className="register-link color-blue"> Terms</span>,
          <span className="register-link color-blue"> Privacy Policy</span> and
          <span className="register-link color-blue"> Cookie use </span>. Social Media
          may use your contact information, including email address and phone
          number for the purpose outline in our Privacy Policy.{" "}
          <span className="register-link color-blue">Learn More</span>.
        </p>
      </div>
    </div>
  );
};
