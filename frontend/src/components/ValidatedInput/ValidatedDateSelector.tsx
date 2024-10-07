import React, { useState, useEffect } from "react";
//import { StyledInputBox, StyledInputLabel } from './StyledInput'
import { determineValidatedSelectSylyes } from "../../utils/DetermineStylesUtils";

import "./ValidatedInput.css";
import { ExpandMoreRounded } from "@mui/icons-material";
import { StyledInputBox,StyledInputLabel } from "./StyledInput";

interface ValidateDatedSelectorProps {
  style: string;
  valid: boolean;
  name: string;
  dropDown(): JSX.Element[];
  dispatcher(name: string, value: string | number | boolean): void;
  data?: number;
}

export const ValidatedDateSelector: React.FC<ValidateDatedSelectorProps> = ({
  style,
  valid,
  name,
  dropDown,
  dispatcher,
  data,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [color, setColor] = useState<string>("gray");

  useEffect(() => {
    setColor(determineValidatedSelectSylyes(active, valid));
  }, [active, valid, value]);

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(+e.target.value);
    dispatcher(name.toLowerCase(), +e.target.value);
  };

  const toogleActive = (e: React.FormEvent<HTMLSelectElement>) => {
    setActive(!active);
  };

  return (
    <div className={"validated-input"}>
      <StyledInputBox active={active} valid={valid}>
        <StyledInputLabel color={color} active={true} valid={valid}>
          {name}
        <ExpandMoreRounded
          sx={{
            fontSize: 34,
            color: active ? "#1DA1F2" : "#65786",
            position: "absolute",
            right: "15px",
            top: "35%",
          }}
        />
         </StyledInputLabel>
        <select
          className={"validated-input-value validated-date-selector"}
          onChange={changeValue}
          onFocus={toogleActive}
          onBlur={toogleActive}
          value={data}
        >
          {dropDown()}
        </select>
      </StyledInputBox>
    </div>
  );
};
