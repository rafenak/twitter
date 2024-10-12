import React, { useRef, useState } from "react";
import "./SchedulePostModalContent.css";
import ScheduleTimeSVG from "../../../../components/SVGs/ScheduleTimeSVG";
import { ValidatedDateSelector } from "../../../../components/ValidatedInput/ValidatedDateSelector";
import { getDays, getMonths, MONTHS } from "../../../../utils/DateUtils";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  DAYS,
  getScheduleAmPm,
  getScheduleHours,
  getScheduleMinutes,
  getScheduleYear,
} from "../../utils/SchedulePostUtils";
import { AppDisptach } from "../../../../redux/Store";
import { useDispatch } from "react-redux";
import { setScheduleData } from "../../../../redux/Slices/PostSlice";
import { updateDiplaySchedule } from "../../../../redux/Slices/ModalSlice";
import { validateFutureDate } from "../../../../services/Validators";

export const SchedulePostModalContent: React.FC = () => {
  const dispatch: AppDisptach = useDispatch();
  const dateSelectorRef = useRef<HTMLInputElement>(null);
  const [scheduleDate, setScheduleDate] = useState<Date>(() => new Date());
  const [amPm, setAmPm] = useState<number>(() =>
    new Date().getHours() < 12 ? 0 : 1
  );

  const openDateSelector = () => {
    if (dateSelectorRef && dateSelectorRef.current) {
      let element: any = dateSelectorRef.current;
      element.showPicker();
    }
  };

  const updateScheduleDate = (
    name: string,
    value: string | number | boolean
  ) => {
    let dateCopy = new Date(scheduleDate);
    if (name === "month" && typeof value === "number") {
      dateCopy.setMonth(value);
      setScheduleDate(dateCopy);
    }

    if (name === "day" && typeof value === "number") {
      dateCopy.setDate(value);
      setScheduleDate(dateCopy);
    }

    if (name === "year" && typeof value === "number") {
      dateCopy.setFullYear(value);
      setScheduleDate(dateCopy);
    }

    if (name === "hour" && typeof value === "number") {
      if (amPm === 0) {
        let newHours = value % 12;
        dateCopy.setHours(newHours);
      } else {
        let newHours = value === 12 ? 12 : value + 12;
        dateCopy.setHours(newHours);
      }
      // dateCopy.setHours(value);
      setScheduleDate(dateCopy);
    }

    if (name === "minute" && typeof value === "number") {
      dateCopy.setMinutes(value);
      setScheduleDate(dateCopy);
    }

    if (name === "am/pm" && typeof value === "number") {
      if (value === 0) {
        dateCopy.setHours(dateCopy.getHours() - 12);
      } else {
        dateCopy.setHours(dateCopy.getHours() + 12);
      }
      setScheduleDate(dateCopy);
      setAmPm(value);
    }

    console.log('scheduleDate',scheduleDate.toLocaleTimeString())
    if (validateFutureDate(scheduleDate)) {
      dispatch(setScheduleData(scheduleDate));
    }
  };

  const onSelectDateChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
     let selectedDate:any = e.target.value;
     let d = new Date(selectedDate);
     
     let dateCopy = new Date(scheduleDate);
     dateCopy.setMonth(d.getMonth()+1);
     dateCopy.setDate(d.getDate());
     dateCopy.setFullYear(d.getFullYear())
     console.log(dateCopy)
     setScheduleDate(dateCopy)

     if (validateFutureDate(dateCopy)) {
        dispatch(setScheduleData(dateCopy));
      }
 
  }

  const generateDateString = (): string => {
    const month = MONTHS[getUpdatedMonths()].slice(0, 3);
    // const month = MONTHS[scheduleDate.getMonth() === new Date().getMonth() ? scheduleDate.getMonth()+1 : scheduleDate.getMonth()].slice(0, 3);
    const day = DAYS[scheduleDate.getDay()];
    const dayOfMonth = scheduleDate.getDate();
    const year = scheduleDate.getFullYear();
    //   const hours = scheduleDate.getHours() % 12;
    //   const minutes = scheduleDate.getMinutes();
    const hours = scheduleDate.getHours() % 12;
    const minutes = scheduleDate.getMinutes().toString().padStart(2, "0");
    // const ampm = scheduleDate.getHours() / 12 > 0 ? "PM" : "AM";
    //const time = scheduleDate.toLocaleTimeString('en-US');

    //return `${day}, ${month} ${dayOfMonth}, ${year} at ${time.split(":")[0]}:${time.split(":")[1]} ${time.split(" ")[1]}`;
    return `${day}, ${month} ${dayOfMonth}, ${year} at ${hours}:${minutes} ${
      amPm === 1 ? "PM" : "AM"
    }`;
  };

  // const  schedulePost = () =>{
  //     dispatch(setScheduleData(scheduleDate));
  //     dispatch(updateDiplaySchedule());
  // }

  const getUpdatedMonths = (): number => {
    let currentMonthIndex = scheduleDate.getMonth();

    // console.log(new Date().getMonth());
    // console.log('Date index', scheduleDate.getMonth());
    
    if (scheduleDate.getMonth() === new Date().getMonth()) {
      currentMonthIndex = scheduleDate.getMonth()+1;
    } else if (scheduleDate.getMonth() === 0) {
      currentMonthIndex = 12;
    } else if(scheduleDate.getMonth() === 9){
        currentMonthIndex = scheduleDate.getMonth() -1;
    }
    else {
      currentMonthIndex = scheduleDate.getMonth();
    }
    // console.log('current',currentMonthIndex);
    // console.log('Date index', scheduleDate.getMonth());
    return currentMonthIndex;
  };





  return (
    <div className="schedule-post-modal-content">
      <div className="schedule-post-modal-content-top">
        <div className="schedule-post-modal-scheduled-info">
          <ScheduleTimeSVG height={18} width={18} color={"#657786"} />
          <p className="schedule-post-modal-content-scheduled-date">
            Will send on {generateDateString()}
          </p>
        </div>
        <p className="schedule-post-modal-content-label">Date</p>
        <div className="schedule-post-modal-content-date-group">
          <div className="schedule-post-modal-month-select-wrapper">
            <ValidatedDateSelector
              valid={validateFutureDate(scheduleDate)}
              key={"Month"}
              dropDown={getMonths}
              dispatcher={updateScheduleDate}
              name={"Month"}
              data={getUpdatedMonths()}
            />
          </div>
          <div className="schedule-post-modal-day-select-wrapper">
            <ValidatedDateSelector
              valid={validateFutureDate(scheduleDate)}
              dropDown={getDays}
              dispatcher={updateScheduleDate}
              name={"Day"}
              data={scheduleDate.getDate()}
            />
          </div>
          <div className="schedule-post-modal-year-select-wrapper">
            <ValidatedDateSelector
              valid={validateFutureDate(scheduleDate)}
              dropDown={getScheduleYear}
              dispatcher={updateScheduleDate}
              name={"Year"}
              data={scheduleDate.getFullYear()}
            />
          </div>
          <div className="schedule-post-modal-calender-select-wrapper"> 
          <label
            htmlFor="date-selector"
            onClick={openDateSelector}
          >
            <CalendarMonthIcon
              sx={{
                fontSize: "16px",
              }}
            />
          </label>
          <input type="date" id="date-selector"  ref={dateSelectorRef} onChange={onSelectDateChange}/>
          </div>
        </div>
        <p className="schedule-post-modal-content-label">Time</p>
        <div className="schedule-post-modal-content-time-group">
          <div className="schedule-post-modal-hour-select-wrapper">
            <ValidatedDateSelector
              valid={validateFutureDate(scheduleDate)}
              dropDown={getScheduleHours}
              dispatcher={updateScheduleDate}
              name={"Hour"}
            //   data={+scheduleDate.toLocaleTimeString().split(":")[0]}
            data={scheduleDate.getHours() % 12 }
            />
          </div>
          <div className="schedule-post-modal-minute-select-wrapper">
            <ValidatedDateSelector
              valid={validateFutureDate(scheduleDate)}
              dropDown={getScheduleMinutes}
              dispatcher={updateScheduleDate}
              name={"Minute"}
              data={scheduleDate.getMinutes()}
            />
          </div>
          <div className="schedule-post-modal-am-pm-select-wrapper">

          <ValidatedDateSelector
            valid={validateFutureDate(scheduleDate)}
            dropDown={getScheduleAmPm}
            dispatcher={updateScheduleDate}
            name={"AM/PM"}
            // data={scheduleDate.getHours()/ 12 > 0 ? "PM" : "AM"}
            data={amPm}
          />
          </div>
        </div>
        <p className="schedule-post-modal-content-label">Time Zone</p>
        <h3 className="schedule-post-modal-content-time-zone">
          {Intl.DateTimeFormat().resolvedOptions().timeZone}
        </h3>
      </div>
      <div className="schedule-post-modal-content-bottom">
        <div className="schedule-post-modal-content-scheduled-post-bg">
            <p className="schedule-post-modal-content-scheduled-posts">
                Scheduled Post
            </p>
        </div>
      </div>
    </div>
  );
};
