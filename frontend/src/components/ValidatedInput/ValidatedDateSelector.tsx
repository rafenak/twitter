import React, { useState,useEffect } from "react";
import { StyledInputBox, StyledInputLabel } from "./StyledInput";
import { determineValidatedSelectSylyes } from "../../utils/DetermineStylesUtils";

interface ValidateDatedSelectorProps {
  styles: string;
  valid: boolean;
  name: string;
  dropDown(): JSX.Element[];
}

export const ValidatedDateSelector: React.FC<ValidateDatedSelectorProps> = ({
  styles,
  valid,
  name,
  dropDown,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [color, setColor] = useState<string>('gray')

  useEffect(()=>{
    setColor(determineValidatedSelectSylyes(active,valid))
  },[active,valid,value])

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Dispatch this change to reducer");
    console.log("value ", e.target.value);
    setValue(+e.target.value);
  };

  const toogleActive = (e: React.FormEvent<HTMLSelectElement>) => {
    setActive(!active);
  };

  return (
    <div className={styles}>
      <StyledInputBox active={active} valid={valid}>
        <StyledInputLabel color={color} active={true} valid={valid}>
          {name}
        </StyledInputLabel>
        <select
          onChange={changeValue}
          onFocus={toogleActive}
          onBlur={toogleActive}
        >
          {dropDown()}
        </select>
      </StyledInputBox>
    </div>
  );
};
