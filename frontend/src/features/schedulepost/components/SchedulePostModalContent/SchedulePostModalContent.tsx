import React, { useRef, useState } from 'react'
import './SchedulePostModalContent.css'
import ScheduleTimeSVG from '../../../../components/SVGs/ScheduleTimeSVG'
import { ValidatedDateSelector } from '../../../../components/ValidatedInput/ValidatedDateSelector'
import { getDays, getMonths, MONTHS } from '../../../../utils/DateUtils'
import CalendarMonthIcon  from '@mui/icons-material/CalendarMonth'
import { DAYS, getScheduleAmPm, getScheduleHours, getScheduleMinutes, getScheduleYear } from '../../utils/SchedulePostUtils'
import { AppDisptach } from '../../../../redux/Store'
import { useDispatch } from 'react-redux'
import { setScheduleData } from '../../../../redux/Slices/PostSlice'
import { updateDiplaySchedule } from '../../../../redux/Slices/ModalSlice'
import { validateFutureDate } from '../../../../services/Validators'

export const SchedulePostModalContent:React.FC = () => {

    const dispatch:AppDisptach = useDispatch();
    const dateSelectorRef = useRef<HTMLInputElement>(null);
    const [scheduleDate, setScheduleDate] = useState<Date>(() => new Date())
    const [amPm,setAmPm] = useState<number>(() => new Date().getHours()/ 12 > 0 ? 1 : 0)

    const openDateSelector = () =>{
            if(dateSelectorRef && dateSelectorRef.current){
                let element:any = dateSelectorRef.current;
               element.showPicker();
            }
    }

    const updateScheduleDate = (name:string , value: string | number | boolean) =>{
        let dateCopy= new Date(scheduleDate);
        if(name==='month' && typeof(value)==='number'){
            dateCopy.setMonth(value);
            setScheduleDate(dateCopy)
        }
        if(name==='day' && typeof(value)==='number'){
            dateCopy.setDate(value);
            setScheduleDate(dateCopy)
        }
        if(name==='year' && typeof(value)==='number'){
            dateCopy.setFullYear(value);
            setScheduleDate(dateCopy)
        }
        if(name==='hour' && typeof(value)==='number'){
            if(amPm===0){
                let newHours = value % 12;
                dateCopy.setHours(newHours);
            }else{
                let newHours = value === 12 ? 12 : value + 12;
                dateCopy.setHours(newHours);
            }
           // dateCopy.setHours(value);
            setScheduleDate(dateCopy)
        }
        //update to calucate army time/24 hour time 
        if(name==='minute' && typeof(value)==='number'){
            dateCopy.setMinutes(value);
            setScheduleDate(dateCopy)
        }
 
        if(name ==='am/pm' && typeof(value)==='number'){
            console.log(value)
            if(value === 0){
                dateCopy.setHours(dateCopy.getHours() -12)
            }else{
                dateCopy.setHours(dateCopy.getHours() + 12)
            }
            setScheduleDate(dateCopy)
            setAmPm(value)
        }

        if(validateFutureDate(scheduleDate)){
            dispatch(setScheduleData(scheduleDate));
        }
       
    }

    const generateDateString = ():string => {
      const month = MONTHS[scheduleDate.getMonth() === new Date().getMonth() ? scheduleDate.getMonth()+1 : scheduleDate.getMonth()].slice(0, 3);
      const day = DAYS[scheduleDate.getDay()];
      const dayOfMonth = scheduleDate.getDate();
      const year = scheduleDate.getFullYear();
      const hours = scheduleDate.getHours() % 12;
      const minutes = scheduleDate.getMinutes();
     // const ampm = scheduleDate.getHours() / 12 > 0 ? "PM" : "AM";
      const time = scheduleDate.toLocaleTimeString('en-US');

     //return `${day}, ${month} ${dayOfMonth}, ${year} at ${time.split(":")[0]}:${time.split(":")[1]} ${time.split(" ")[1]}`;
      return `${day}, ${month} ${dayOfMonth}, ${year} at ${hours}:${minutes} ${amPm === 1 ? 'PM': 'AM'}`;
    };

    // const  schedulePost = () =>{
    //     dispatch(setScheduleData(scheduleDate));
    //     dispatch(updateDiplaySchedule());
    // } 

   return ( 
    <div className='schedule-post-modal-content'>
        <div className='schedule-post-modal-content-top'>
            <div className='schedule-post-modal-scheduled-info'>
                <ScheduleTimeSVG height={20} width={20} color={'#657786'}/>
                Will send on {generateDateString()}
            </div>
            <p className='schedule-post-modal-content-label'>Date</p>
            <div className='schedule-post-modal-content-date-group'>
                <ValidatedDateSelector valid={validateFutureDate(scheduleDate)} key={'Month'} dropDown={getMonths} dispatcher={updateScheduleDate} name={'Month'} 
                data={scheduleDate.getMonth() === new Date().getMonth() ? scheduleDate.getMonth()+1 : scheduleDate.getMonth()}
                />
                <ValidatedDateSelector valid={validateFutureDate(scheduleDate)} dropDown={getDays} dispatcher={updateScheduleDate} name={'Day'} data={scheduleDate.getDate()}/>
                <ValidatedDateSelector valid={validateFutureDate(scheduleDate)}  dropDown={getScheduleYear} dispatcher={updateScheduleDate} name={'Year'} data={scheduleDate.getFullYear()}/>
                <label htmlFor='date-selector' onClick={openDateSelector}>
                    <CalendarMonthIcon sx={{
                        fontSize:'14px'
                    }}/>
                </label> 
                <input type='date' hidden id='date-selector' ref={dateSelectorRef} />
            </div>  
             <div className='schedule-post-modal-content-date-group'>
            <p className='schedule-post-modal-content-label'>Time</p>
                <ValidatedDateSelector valid={validateFutureDate(scheduleDate)} dropDown={getScheduleHours} dispatcher={updateScheduleDate} name={'Hour'} data={+scheduleDate.toLocaleTimeString().split(":")[0]}/>
                <ValidatedDateSelector valid={validateFutureDate(scheduleDate)} dropDown={getScheduleMinutes} dispatcher={updateScheduleDate} name={'Minute'} data={scheduleDate.getMinutes()}/>
                <ValidatedDateSelector valid={validateFutureDate(scheduleDate)} dropDown={getScheduleAmPm} dispatcher={updateScheduleDate} name={'AM/PM'}
                    // data={scheduleDate.getHours()/ 12 > 0 ? "PM" : "AM"}
                data={amPm}/>
             </div> 
             <p className='schedule-post-modal-content-label'>Time Zone</p>
             <h3 className='schedule-post-modal-content-time-zone'>
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
             </h3>
        </div>
        <div className='schedule-post-modal-content-bottom'>
            <p className='schedule-post-modal-content-scheduled-posts'>Scheduled Post</p>
        </div>
    </div>
  )
}
