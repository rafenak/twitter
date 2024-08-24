import React, { useState,useEffect } from "react";
import { ValidatedDateSelector, } from "../../../../components/ValidatedInput/ValidatedDateSelector";
import { getMonths, getDays, getYears } from "../../utils/DateUtils";
import { useDispatch,useSelector } from "react-redux";
import {AppDisptach, RootState} from '../../../../redux/Store';
import { updateRegister } from "../../../../redux/Slices/RegisterSlice";
import { validateDob } from "../../../../services/Validators";




export const RegisterDateInput: React.FC = () => {

  const state = useSelector((state:RootState)=>state.register)
  const dispatch:AppDisptach =useDispatch();


  const [valid, setValid] = useState(true)

  const updateState = (name:string,value:string| number | boolean):void =>{
    dispatch(updateRegister({
      name,value
    }))
  }

  useEffect(() => {

    let { month, day, year } = state.dob;
    if(day && month && year){
      setValid(validateDob({
        day,
        month,
        year
      }));

      dispatch(updateRegister({name:'dobValid',value:valid}));

    } 

    
  }, [state.dob.day,state.dob.month,state.dob.year,state.dobValid,valid])


  return (
    <div className="register-date">
      <ValidatedDateSelector
        styles={"validated-month"}
        valid={valid}
        name={"Month"}
        dropDown={getMonths}
        dispatcher={updateState}
      />
      <ValidatedDateSelector
        styles={"validated-day"}
        valid={valid}
        name={"Day"}
        dropDown={getDays}
        dispatcher={updateState}
      />

      <ValidatedDateSelector
        styles={"validated-year"}
        valid={valid}
        name={"Year"}
        dropDown={getYears}
        dispatcher={updateState}
      />
    </div>
  );
};
