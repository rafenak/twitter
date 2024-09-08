import React from 'react'
import { StyledInputBox,StyledInputLabel } from './StyledInput'
import './ValidatedInput.css'

interface DisbaledValidatedInputProps{
    label:string;
    value:string;
}

export const DisbaledValidatedInput:React.FC<DisbaledValidatedInputProps> = ({label,value}) => {
  return (
    <div className='disabled-validated-input'>
        <StyledInputBox active={false} valid={true}>
            <StyledInputLabel color={'gray'} active={true} valid={true}>
                {label}
            </StyledInputLabel>
            <input className='validated-input-value  validate-input-text-transparent' value={value} disabled />
        </StyledInputBox>
    </div>
  )
}

