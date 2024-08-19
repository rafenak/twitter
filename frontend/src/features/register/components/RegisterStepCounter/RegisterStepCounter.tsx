import React from "react";

import {displayIcon,iconClass}  from '../../utils/RegisterStepUtils'
import './RegisterStepCounter.css'

interface RegisterSetpProps {
  step: number;
  changeStep():void
}

export const RegisterStepCounter: React.FC<RegisterSetpProps> = ({ step ,changeStep}) => {
  return (
    <div className="reg-step-counter-conatiner">
      <div className={iconClass(step)} onClick={changeStep}>
        {displayIcon(step)}
      </div>
      <span className="reg-step-number">Step {step} of 6</span>
    </div>
  );
};
