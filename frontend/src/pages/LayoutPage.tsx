
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Discovery } from '../features/discovery'
import { Navigation } from '../components/Navigation/Navigation'
import './LayoutPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../redux/Store'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getUserByToken, setToken } from '../redux/Slices/UserSlice'


export const LayoutPage: React.FC = () => {
  const state = useSelector((state: RootState) => state.user);
  const dispatch: AppDisptach = useDispatch();
  const [jwt, setJwt] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const location = useLocation();

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
        <div className='layout-page'>
            <div className='layout-layout'>
                <div className="layout-navigation-section">
                    <Navigation currentPage={location.pathname} />
                </div>
                <div className="layout-content-section">
                    <Outlet />
                </div>
                <div className="layout-info-section">
                    <Discovery />
                </div>
            </div>
        </div>
    )
}
