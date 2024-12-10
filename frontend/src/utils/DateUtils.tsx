import { Dob } from "./GlobalInterfaces";

export const MONTHS: string[] = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getMonths = (): JSX.Element[] => {
  return MONTHS.map((month, index) => {
    if (index === 0) {
      return <option value={index} key={month}></option>;
    } else {
      return (
        <option value={index} key={month}>
          {month}
        </option>
      );
    }
  });
};

// export const getMonths = (): JSX.Element[] => {
//   return MONTHS.map((month, index) => {
//       return (
//         <option value={index} key={month}>
//           {month}
//         </option>
//       );
//   });
// };

export const getDays = (): JSX.Element[] => {
  let options: JSX.Element[] = [];

  for (let i = 0; i < 32; i++) {
    if (i === 0) {
      options.push(<option value={0} key={i}></option>);
    } else {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
  }
  return options;
};

export const getYears = (): JSX.Element[] => {
  let options: JSX.Element[] = [];
  for (let i = 2025; i > 1901; i--) {
    if (i === 2025) {
      options.push(<option value={0} key={i}></option>);
    } else {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
  }
  return options;
};

export const stringifyDate = (date: Dob): string => {
  return `${MONTHS[date.month].substring(0, 3)} ${date.day}, ${date.year}`;
};

export const stringifyTime = (date: Date): string => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amPm;

  if (hours === 0) {
    hours = 12;
    amPm = "AM";
  } else if (hours > 12) {
    hours = hours % 12;
    amPm = "PM";
  } else {
    amPm = "AM";
  }

  return `${hours}:${minutes < 10 ? `0${minutes}` : `${minutes}`} ${amPm}`;
};

export const stringifyFullDate = (date: Date): string => {
  return `${MONTHS[date.getMonth() +1 ]} ${date.getDay()}, ${date.getFullYear()}`;
};

export const cleanDateForRequest = (date: Dob): string => {
  let month: string = "";
  let day: string = "";

  if (date.month < 10) {
    month = `0${date.month}`;
  } else {
    month = `${date.month}`;
  }

  if (date.day < 10) {
    day = `0${date.day}`;
  } else {
    day = `${date.day}`;
  }

  return `${date.year}/${month}/${day}`;
};
