import React from "react";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import "./RegisterFormTwo.css";

export const RegisterFormTwo: React.FC = () => {
  return (
    <div className="reg-step-two-container">
      <div className="reg-step-two-content">
        <h1 className="reg-step-two-header">Customize your experience</h1>
        <h3 className="reg-step-two-sub-head">
          Track where you see Social Media content across the web.
        </h3>
        <div className="reg-step-two-toggle-group">
          <p className="reg-step-two-privacy">
            Social Media uses this data to personalize your experiene.This web
            browing history will be stored with your name, email or phone
            number.
          </p>
          <Checkbox />
        </div>
        <p className="reg-step-two-policy">
          By signing up, you agree to our
          <span className="reg-step-two-link"> Terms</span>,
          <span className="reg-step-two-link"> Privacy Policy</span> and
          <span className="reg-step-two-link"> Cookie use </span>. Social Media
          may use your contact information, including email address and phone
          number for the purpose outline in our Privacy Policy.{" "}
          <span className="reg-step-two-link">Learn More</span>.
        </p>
      </div>
    </div>
  );
};
