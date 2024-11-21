
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Discovery } from '../features/discovery'
import { Navigation } from '../components/Navigation/Navigation'
import './LayoutPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisptach, RootState } from '../redux/Store'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getUserByToken, setToken } from '../redux/Slices/UserSlice'
import { updateDisplayEmojis, updateDisplayPostMore } from '../redux/Slices/ModalSlice'


export const LayoutPage: React.FC = () => {
  const state = useSelector((state: RootState) => state.user);
  const displayEmoji = useSelector((state: RootState) => state.modal.displayEmojis);
  const displayPostMore = useSelector((state: RootState) => state.modal.displayPostMore);
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

  const closedOpenedModals = (e: React.MouseEvent) => {
    if (displayEmoji) {
      dispatch(updateDisplayEmojis())
    }
    if(displayPostMore){
      dispatch(updateDisplayPostMore())
    }
  }


    return (
        <div className='layout-page' onClick={closedOpenedModals}>
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
