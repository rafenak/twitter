import React, { useRef, useState } from 'react'
import './SchedulePostModalContent.css'
import ScheduleTimeSVG from '../../../../components/SVGs/ScheduleTimeSVG'
import { ValidatedDateSelector } from '../../../../components/ValidatedInput/ValidatedDateSelector'
import { getDays, getMonths, MONTHS } from '../../../../utils/DateUtils'
import CalendarMonthIcon  from '@mui/icons-material/CalendarMonth'
import { DAYS, getScheduleAmPm, getScheduleHours, getScheduleMinutes, getScheduleYear } from '../../utils/SchedulePostUtils'

export const SchedulePostModalContent:React.FC = () => {

    const dateSelectorRef = useRef<HTMLInputElement>(null);
    const [scheduleDate, setScheduleDate] = useState<Date>(() => new Date())

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
    }

    const generateDateString = ():string => {
      const month = MONTHS[scheduleDate.getMonth() === new Date().getMonth() ? scheduleDate.getMonth()+1 : scheduleDate.getMonth()].slice(0, 3);
      const day = DAYS[scheduleDate.getDay()];
      const dayOfMonth = scheduleDate.getDate();
      const year = scheduleDate.getFullYear();
      const hours = scheduleDate.getHours() % 12;
      const minutes = scheduleDate.getMinutes();
      const ampm = scheduleDate.getHours() / 12 > 0 ? "PM" : "AM";

      return `${day}, ${month} ${dayOfMonth}, ${year} at ${hours}:${minutes} ${ampm}`;
    };

   return (
    <div className='schedule-post-modal-content'>
        <div className='schedule-post-modal-content-top'>
            <div className='schedule-post-modal-scheduled-info'>
                <ScheduleTimeSVG height={20} width={20} color={'#657786'}/>
                Will send on {generateDateString()}
            </div>
            <p className='schedule-post-modal-content-label'>Date</p>
            <div className='schedule-post-modal-content-date-group'>
                <ValidatedDateSelector valid={true} key={'Month'} dropDown={getMonths} dispatcher={updateScheduleDate} name={'Month'} 
                data={scheduleDate.getMonth() === new Date().getMonth() ? scheduleDate.getMonth()+1 : scheduleDate.getMonth()}/>
                <ValidatedDateSelector valid={true} dropDown={getDays} dispatcher={updateScheduleDate} name={'Day'} data={scheduleDate.getDate()}/>
                <ValidatedDateSelector valid={true} dropDown={getScheduleYear} dispatcher={()=>{}} name={'Year'} data={scheduleDate.getFullYear()}/>
                <label htmlFor='date-selector' onClick={openDateSelector}>
                    <CalendarMonthIcon sx={{
                        fontSize:'14px'
                    }}/>
                </label> 
                <input type='date' hidden id='date-selector' ref={dateSelectorRef} />
            </div>  
             <div className='schedule-post-modal-content-date-group'>
            <p className='schedule-post-modal-content-label'>Time</p>
                <ValidatedDateSelector valid={true} dropDown={getScheduleHours} dispatcher={()=>{}} name={'Hour'} data={scheduleDate.getHours() % 12}/>
                <ValidatedDateSelector valid={true} dropDown={getScheduleMinutes} dispatcher={()=>{}} name={'Minute'} data={scheduleDate.getMinutes()}/>
                <ValidatedDateSelector valid={true} dropDown={getScheduleAmPm} dispatcher={()=>{}} name={'AM/PM'}
                    data={scheduleDate.getHours()/ 12 > 0 ? "PM" : "AM"}/>
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
