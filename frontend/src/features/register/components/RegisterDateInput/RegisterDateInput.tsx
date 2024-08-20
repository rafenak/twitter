import React from "react";
import { ValidatedDateSelector, } from "../../../../components/ValidatedInput/ValidatedDateSelector";
import { getMonths, getDays, getYears } from "../../utils/DateUtils";
import { useDispatch } from "react-redux";
import {AppDisptach} from '../../../../redux/Store';
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";


export const RegisterDateInput: React.FC = () => {

  const dispatch:AppDisptach =useDispatch();

  const updateState = (name:string,value:string| number | boolean):void =>{
    dispatch(updateRegister({
      name,value
    }))
  }


  return (
    <div className="register-date">
      <ValidatedDateSelector
        styles={"validated-month"}
        valid={true}
        name={"Month"}
        dropDown={getMonths}
        dispatcher={updateState}
      />
      <ValidatedDateSelector
        styles={"validated-day"}
        valid={true}
        name={"Day"}
        dropDown={getDays}
        dispatcher={updateState}
      />

      <ValidatedDateSelector
        styles={"validated-year"}
        valid={true}
        name={"Year"}
        dropDown={getYears}
        dispatcher={updateState}
      />
    </div>
  );
};
