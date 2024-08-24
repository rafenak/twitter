import React, { useEffect, useState } from "react";
import { StyledInputBox, StyledInputLabel } from "./StyledInput";

export const ValidatedTextInput: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [borderActive, setBorderActive] = useState<boolean>(false);
  const [labelActive, setLabelActive] = useState<boolean>(false);
  const [color, setColor] = useState<string>("gray");

  const focus =():void =>{
    setBorderActive(!borderActive);
    if(!value){
        setLabelActive(!labelActive);
    }
  }

  const update =(e:React.ChangeEvent<HTMLInputElement>):void =>{
        setValue(e.target.value);
        console.log('send the info back to dispact');
        //changeValue(e);
  }

  useEffect(() => {

    if(value){
        setLabelActive(true)
    }
  }, [value,borderActive,labelActive,color])
  

  return (
    <div className="validated-text-input">
      <StyledInputBox active={borderActive} valid={true}>
        <StyledInputLabel color={color} active={labelActive} valid={true}>
          {"lable"}
        </StyledInputLabel>
      </StyledInputBox>
      <input
        className="validated-input-value"
        name={"name"}
        onFocus={() => {}}
        onBlur={() => {}}
        onChange={() => {}}
      ></input>
    </div>
  );
};
