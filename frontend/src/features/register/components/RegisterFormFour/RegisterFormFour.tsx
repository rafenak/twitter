import React, { useState, useEffect } from "react";
import { Checkbox } from "../../../../components/Checkbox/Checkbox";
import { DropDown } from "../../../../components/DropDown/DropDown";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import { countryCodeDropDown } from "../../utils/RegisterModalUtils";
import { validatePhone } from "../../../../services/Validators";
import { AppDisptach } from "../../../../redux/Store";
import { useDispatch } from "react-redux";
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import "./RegsiterFormFour.css";

export const RegisterFormFour: React.FC = () => {
  const [phoneCode, setPhoneCode] = useState<string>("+1");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [validateNumber, setValidateNumber] = useState<boolean>(true);

  const dispatch: AppDisptach = useDispatch();

  const changeCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneCode(e.target.value.split(" ")[0]);
  };

  const changePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    dispatch(
      updateRegister({
        name: "phoneNumber",
        value: e.target.value,
      })
    );
  };

  useEffect(() => {
    if (phoneNumber) {
      setValidateNumber(validatePhone(phoneNumber));
      dispatch(
        updateRegister({
          name: "phoneNumberValid",
          value: validatePhone(phoneNumber),
        })
      );
    }
  }, [phoneCode, phoneNumber]);

  return (
    <div className="reg-step-four-container">
      <div className="reg-step-four-content">
        <h1>Add a phone number</h1>
        <p className="reg-step-four-subhead">
          Enter the phone number you would like to associate with your Social
          Media account. You won't get verification code sent here.
        </p>
        <div className="reg-step-four-inputs">
          <DropDown
            content={countryCodeDropDown}
            change={changeCode}
            label={"Country Code"}
            defaultValue={"United States +1"}
          ></DropDown>
          <ValidatedTextInput
            valid={true}
            name={"phoneNumber"}
            label={"Your Phone Number"}
            changeValue={changePhoneNumber}
          />
          {validateNumber ? (
            <></>
          ) : (
            <p className="reg-step-four-invalid">
              Please enter a valid 10 digit number
            </p>
          )}
        </div>
        <div className="reg-step-four-check-group">
          <p>
            Let people who have phone number find and contact with you on Social
            Media.
            <span className="reg-step-four-link"> Learn More</span>.
          </p>
          <Checkbox />
        </div>
        <div className="reg-step-four-check-group">
          <p>
            Let Social Media use your phone number to personalize our services,
            including ads (if permitted by your Ads perferences). If you don't
            enable this, Social Media will still use your phone number for
            purpose including account security, spam, farud, and abuse
            prevention.
            <span className="reg-step-four-link">
              See our Privacy Policy for more information.
            </span>
          </p>
          <Checkbox />
        </div>
      </div>
    </div>
  );
};
