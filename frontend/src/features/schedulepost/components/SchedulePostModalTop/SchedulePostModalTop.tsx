import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import './SchedulePostModalTop.css'
import { updateDiplaySchedule } from '../../../../redux/Slices/ModalSlice'
import { AppDisptach } from '../../../../redux/Store'
import { useDispatch } from 'react-redux'

export const SchedulePostModalTop:React.FC = () => {
    const dispatch:AppDisptach=useDispatch();

    const hanldeCloseModal=()=>{
        dispatch(updateDiplaySchedule()) 
    }

  return (
    <div className='schedule-post-modal-top-bar'>
        <div className='schedule-post-modal-top-bar-left'>
            <div className='schedule-post-modal-top-bar-close-bg' onClick={hanldeCloseModal}>
                <CloseIcon />
                </div>
                <p className='schedule-post-modal-top-bar-text'>Schedule</p>
        </div>
        <div className='schedule-post-modal-top-bar-right'>
            <button className='schedule-post-modal-top-bar-confirm' onClick={()=>{}}>Confirm</button>
        </div>
    </div>
   
  )
}
