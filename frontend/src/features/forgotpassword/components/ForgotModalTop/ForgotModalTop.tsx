import React from 'react' 
import buleLogo from '../../../../assets/social-media-no-bg.png'
import './ForgotModalTop.css'
import '../../../../assets/global.css'

interface ForgotModalTopProps {
    closeModal: () => void;
  }

export const ForgotModalTop:React.FC<ForgotModalTopProps> = ({closeModal}) => {
  return (
    <div className="forgot-modal-top">
      <div className="forgot-modal-top-left">
        <div className="forgot-modal-top-shadow" onClick={closeModal}>
          x
        </div>
      </div>
      <div className="forgot-modal-top-middle">
        <img src={buleLogo} alt="logo" className="forgot-modal-top-logo" />
      </div>
      <div className="forgot-modal-top-right"></div>
    </div>
  )
}
