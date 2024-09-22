import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RootState, AppDisptach } from "../redux/Store";
import { getUserByToken, setToken } from "../redux/Slices/UserSlice";
import { useNavigate } from "react-router-dom";
import './Home.css'
import { Navigation } from "../components/Navigation/Navigation";
import { Feed } from "../features/feed/components/Feed/Feed";

export const Home: React.FC = () => {
  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDisptach = useDispatch();
  const [jwt, setJwt, removeJwt] = useLocalStorage("token", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt !== "" && state.token !== "") {
      dispatch(getUserByToken(state.token));
    } else if (jwt === "" && state.token !== "") {
      setJwt(state.token);
    } else if (jwt !== "" && state.token === "") {
      dispatch(setToken(jwt)); 
    } else {
      navigate("/");
    }
  }, [state.token]);

  return (
    <div className="home">
      <div className="home-layout">
        <div className="home-navigation-section">
          <Navigation />
        </div>
        <div className="home-content-section">
          <Feed />
        </div>
        <div className="home-info-section"></div>
      </div>
    </div>
  );
};
