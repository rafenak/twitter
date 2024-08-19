import React, { useEffect, useState } from "react";

import { StyledInputBox, StyledInputLabel } from "./StyledInput";

import "./ValidatedInput.css";

import { ValidatedInputState } from "../../utils/GlobalInterfaces";

interface ValidatedUserInputProps {
  name: string;
  label: string;
  errorMessage: string;
  validator(value: string): boolean;
  changeValue(e: React.ChangeEvent<HTMLInputElement>): void;
  attributes?: Record<string, string | number | boolean>;
}

export const ValidatedInput: React.FC<ValidatedUserInputProps> = ({
  name,
  label,
  errorMessage,
  validator,
  changeValue,
  attributes,
}) => {
  const [validatedState, setvalidatedState] = useState<ValidatedInputState>({
    active: false,
    valid: true,
    typedIn: false,
    labelActive: false,
    labelColor: "gray",
    value: "",
  });

  const focus = (e: React.FocusEvent<HTMLInputElement>): void => {
    setvalidatedState({
      ...validatedState,
      active: !validatedState?.active,
    });
  };

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setvalidatedState({
      ...validatedState,
      typedIn: true,
      value: e.target.value,
    });

    changeValue(e);
  };

  return (
    <div className="validated-input">
      <StyledInputBox active={validatedState.active} valid={validatedState.valid}>
        <StyledInputLabel color={validatedState.labelColor} active={validatedState.active} valid={validatedState.valid}>
          {label}
        </StyledInputLabel>
        <input
          className="validated-input-value"
          onFocus={focus}
          onBlur={focus}
          onChange={updateValue}
          {...attributes}
        />
      </StyledInputBox>
      <span>{errorMessage}</span>
    </div>
  );
};
