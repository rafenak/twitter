import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RootState, AppDisptach } from "../redux/Store";
import { setToken } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import './Home.css'

export const Home: React.FC = () => {
  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDisptach = useDispatch();
  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === "" && state.token !== "") {
      // console.log("There is no token in localstorage but there one in state");
      //console.log("this mean the use just logged in, store the token in localstorage")
      setJwt(state.token);
    } else if (jwt !== "" && state.token === "") {
      // console.log("There is a token in localstorage but there is no one in state");
      //console.log('need to store the token in userSlice')
      dispatch(setToken(jwt));
    } else {
      // console.log("there is no token in localstorage and no one in state");
      // console.log('navigate to the login page')
      navigate("/");
    }
  }, []);

  return (
    <div className="home">
      <div className="home-layout">
        <div className="home-navigation-section"></div>
        <div className="home-content-section"></div>
        <div className="home-info-section"></div>
      </div>
    </div>
  );
};
