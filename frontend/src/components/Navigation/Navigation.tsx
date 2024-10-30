import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import logoSocial from "../../assets/social-media-no-bg.png";
import HomeSVG from "../SVGs/HomeSVG";
import ExploreSVG from "../SVGs/ExploreSVG";
import NotificationSVG from "../SVGs/NotificationSVG";
import MessageSVG from "../SVGs/MessagesSVG";
import ListSVG from "../SVGs/ListSVG";
import CommunitieSVG from "../SVGs/CommuniteSVG";
import VerifiedSVG from "../SVGs/VerifiedSVG";
import ProfileSVG from "../SVGs/ProfileSVG";
import MoreSVG from "../SVGs/MoreSVG";
import defaultProfile from '../../assets/Generic-Profile.jpg'
import "./Navigation.css";


interface NavigationProps{
    currentPage:string
}

export const Navigation: React.FC<NavigationProps> = ({currentPage}) => {

  useEffect(()=>{

  }
,[currentPage])

    const state = useSelector((state:RootState)=>state.user)

  return (
    <div className="navigation">
      <nav className="navigation-container">
        <Link to="/home" className="navigation-logo-blue">
          <img
            src={logoSocial}
            className="navigation-logo"
            alt="logoSocial"
          />
        </Link>
        <div className="navigation-item">
          <Link to="/home" className="navigation-link">
            <HomeSVG height={26} width={26} />
            <p className={`navigation-text ${currentPage === '/home' ? 'navigation-active' : 'navigation-inactive'}`}>Home</p>
          </Link>
        </div>
        <div className="navigation-item"> 
          <Link to="/explore" className="navigation-link">
            <ExploreSVG height={26} width={26} />
            <p className={`navigation-text ${currentPage === '/explore' ? 'navigation-active' : 'navigation-inactive'}`}>Explore</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <NotificationSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Notifications</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <MessageSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Messages</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <ListSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Lists</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <CommunitieSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Communitues</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <VerifiedSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Verified</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <ProfileSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Profile</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <MoreSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">More</p>
          </Link>
        </div>
        <button className="navigation-post-button">Post</button>
      </nav>
      <div className="navigation-options">
        <img
          className="navigation-options-pfp"
          src={defaultProfile}
          alt="pfp"
        />
        <div className="navigation-options-info">
          <p className="navigation-options-info-display-name">{state.loggedIn && state.loggedIn.nickname ? state.loggedIn.nickname : state.loggedIn?.username}</p>
          <p className="navigation-options-info-handle">{state.username ? state.username : "" }</p>
        </div>
        <p className="navigation-options-dotdotdot">...</p>
      </div>
    </div>
  );
};




