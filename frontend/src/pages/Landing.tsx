import React,{useState} from 'react'

import RegisterModal from '../features/register'
import './Landing.css'
import '../assets/global.css'
import { RightSideBar,LandingFooter } from '../features/landing'
//import whiteLogo from '../assets/twitter-logo-large-white.png'
import socialWhiteLogo from '../assets/social-media-white.png'
import LoginModal from '../features/login'
import { useDispatch } from 'react-redux'
import { AppDisptach } from '../redux/Store'
import { resetUsername } from '../redux/Slices/UserSlice'

export const Landing:React.FC = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false)
  const dispatch:AppDisptach= useDispatch();

  const toggleRegister=()=>{
    setRegister(!register);
  }

  const toggleLogin=()=>{
    setLogin(!login);
    dispatch(resetUsername())
  }

  return (
    <div className='home-container bg-color'>
      {register ? <RegisterModal toggleModal={toggleRegister} /> : <></>}
      {login ? <LoginModal toggleModal={toggleLogin} />: <></>}
      <div className='landing-layout'>
        <div className='landing-top-left bg-blue'>
          <img src={socialWhiteLogo} className='landing-top-left-logo' alt='leftlogo'/>
        </div>
        <div className="landing-top-right">
        <RightSideBar toggleRegister={toggleRegister} toggleLogin={toggleLogin}  />
        </div>
        <div className="landing-bottom">
          <LandingFooter />
        </div>
      </div>
    </div>
  )
}

