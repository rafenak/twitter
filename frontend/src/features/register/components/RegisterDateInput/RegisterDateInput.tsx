import React from "react";
import { ValidatedDateSelector, } from "../../../../components/ValidatedInput/ValidatedDateSelector";
import { getMonths, getDays, getYears } from "../../utils/DateUtils";


export const RegisterDateInput: React.FC = () => {
  return (
    <div className="register-date">
      <ValidatedDateSelector
        styles={"validated-month"}
        valid={true}
        name={"Month"}
        dropDown={getMonths}
      />
      <ValidatedDateSelector
        styles={"validated-day"}
        valid={true}
        name={"Day"}
        dropDown={getDays}
      />

      <ValidatedDateSelector
        styles={"validated-year"}
        valid={true}
        name={"Year"}
        dropDown={getYears}
      />
    </div>
  );
};
