import React, { useState, useEffect } from 'react'

import RegisterModal from '../features/register'
import './Landing.css'
import '../assets/global.css'
import { RightSideBar, LandingFooter } from '../features/landing'
//import whiteLogo from '../assets/twitter-logo-large-white.png'
import socialWhiteLogo from '../assets/social-media-white.png'
import LoginModal from '../features/login'
import { useDispatch } from 'react-redux'
import { AppDisptach } from '../redux/Store'
import { resetUsername } from '../redux/Slices/UserSlice'
import ForgotPasswordModal from '../features/forgotpassword'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const Landing: React.FC = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false)
  const [forgotPassword, setforgotPassword] = useState<boolean>(false)

  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");
  const navigate = useNavigate();

  const dispatch: AppDisptach = useDispatch();

  const toggleRegister = () => {
    setRegister(!register);
  }

  const toggleLogin = () => {
    setLogin(!login);
    dispatch(resetUsername())
  }

  const toggleForgotPassword = () => {
    //toggleLogin();
    setLogin(false)
    setforgotPassword(!forgotPassword);
  }

  useEffect(() => {
    if (jwt !== '') {
      navigate('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt])



  return (
    <div className='home-container bg-color'>
      {register ? <RegisterModal toggleModal={toggleRegister} /> : <></>}
      {login ? <LoginModal toggleModal={toggleLogin} toggleRegister={toggleRegister} toggleForgot={toggleForgotPassword} /> : <></>}
      {forgotPassword ? <ForgotPasswordModal toggleModal={toggleForgotPassword} /> : <></>}
      <div className='landing-layout'>
        <div className='landing-top-left'>
          <img src={socialWhiteLogo} className='landing-top-left-logo' alt='leftlogo' />
        </div>
        <div className="landing-top-right">
          <RightSideBar toggleRegister={toggleRegister} toggleLogin={toggleLogin} />
        </div>
        <div className="landing-bottom">
          <LandingFooter />
        </div>
      </div>
    </div>
  )
}

