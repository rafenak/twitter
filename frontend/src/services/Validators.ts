import { Dob } from "../utils/GlobalInterfaces";

export const validateName = (value: string): boolean => {
  return value !== "";
};

// export const validateDob = (dob: Dob): boolean => {
//   let { month, day, year } = dob;

//   let leapYears: number[] = [];

//   for (let i = 2024; i > 1902; i -= 4) {
//     leapYears.push(i);
//   }
//   if (!month || !day || !year) {
//     return false;
//   } else if (month === 2 && day > 29) {
//     return false;
//   } else if (month === 2 && day === 29 && !leapYears.includes(year)) {
//     return false;
//   } else if (
//     (month === 4 || month === 6 || month === 9 || month === 11) &&
//     day > 30
//   ) {
//     return false;
//   }
//   return checkAge(dob);
// };

// const checkAge = (dob: Dob): boolean => {
//   let { month, day, year } = dob;

//   let today = new Date();
//   let todaysYear = today.getFullYear();
//   let todaysMonth = today.getMonth();
//   let todaysDay = today.getDay();
//   if (todaysYear - year > 13) {
//     return true;
//   } else if (todaysYear - year === 13) {
//     if (todaysMonth > month) {
//       return true;
//     } else if (todaysMonth === month) {
//       if (todaysDay >= day) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   }
//   return false;
// };

export const validateDob = (dob: Dob): boolean => {
    const { month, day, year } = dob;
  
    if (!month || !day || !year) return false;
  
    const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  
    const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day > daysInMonth[month - 1]) return false;
  
    return checkAge(dob);
  };
  
  const checkAge = (dob: Dob): boolean => {
    const { month, day, year } = dob;
  
    const today = new Date();
    const age = today.getFullYear() - year;
  
    if (age > 13) return true;
    if (age === 13) {
      const currentMonth = today.getMonth() + 1; // +1 to convert from 0-based to 1-based month
      const currentDay = today.getDate();
  
      if (currentMonth > month || (currentMonth === month && currentDay >= day)) {
        return true;
      }
    }
  
    return false;
  };
  