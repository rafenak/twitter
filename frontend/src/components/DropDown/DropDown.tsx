import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import React, { useState } from "react";
import {
  StyledInputBox,
  StyledInputLabel,
} from "../ValidatedInput/StyledInput";

interface DropDownProps {
  content(): JSX.Element[];
  change(e: React.ChangeEvent<HTMLSelectElement>): void;
  label: string;
  defaultValue: string | number;
}

export const DropDown: React.FC<DropDownProps> = ({
  content,
  change,
  label,
  defaultValue,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const toggleSelect = () => {
    setActive(!active);
  };

  const changeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    change(e);
  };

  return (
    <div className="dropdown-container">
      <StyledInputBox active={active} valid={true}>
        <StyledInputLabel
          active={true}
          valid={true}
          color={active ? "blue" : "gray"}
        >
            {label}
            <ExpandMoreRoundedIcon sx={{
                fontSize :34,
                color : active ? '#1DA1F2' : '#657786',
                position : 'absolute',
                right : '15px',
                top : '35%'
            }} />
        </StyledInputLabel>
        <select onChange={changeValue} onFocus={toggleSelect} onBlur={toggleSelect} value={defaultValue}>
            {content()}
        </select>
      </StyledInputBox>
    </div>
  );
};
