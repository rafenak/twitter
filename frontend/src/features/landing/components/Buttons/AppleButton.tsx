import React from 'react'

import apple from '../../../../assets/apple-logo.png'
import '../../../../assets/global.css'
import './Buttons.css'

export const AppleButton:React.FC = () => {
  return (
    <div className='landing-button color-gray apple'>
          <img src={apple} className='landing-button-logo' alt='google'/>
          <p className='apple-text'>Sign up with Apple</p>
      </div>
  )
}

  
  
