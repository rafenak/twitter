import { RegisterFormOne } from "../components/RegisterForms/RegisterFormOne";
import { RegisterFormTwo } from "../components/RegisterForms/RegisterFormTwo";
import { RegisterFormThree } from "../components/RegisterForms/RegisterFormThree";
import data from "../../../data/code.json";
import { RegisterFormFour } from "../components/RegisterForms/RegisterFormFour";
import { RegisterFormFive } from "../components/RegisterForms/RegisterFormFive";
import { RegisterFormSix } from "../components/RegisterForms/RegisterFormSix";

export const determineModalContent = (step: number): JSX.Element => {
  switch (step) {
    case 1:
      return <RegisterFormOne />;
    case 2:
      return <RegisterFormTwo />;
    case 3:
      return <RegisterFormThree />;
    case 4:
      return <RegisterFormFour />;
    case 5:
      return <RegisterFormFive />;
    case 6:
      return <RegisterFormSix />;
    default:
      return <></>;
  }
};

// export const countryCodeDropDown = (): JSX.Element[] => {
//   let options = data
//     .filter((country) => {
//       if (country.code !== "US") {
//         return country;
//       }
//     })
//     .map((country) => {
//       return (
//         <option
//           value={`${country.dial_code} ${country.name}`}
//           key={country.code}
//         >
//           {`${country.dial_code} ${country.name}`}
//         </option>
//       );
//     });

//   options.unshift(
//     <option value={"+1 United States"} key={"US"}>
//       {"+1 United States"}
//     </option>
//   );

//   return options;
// };

export const countryCodeDropDown = (): JSX.Element[] => {
  let options = data
    .filter((country) => country.code !== "US")
    .map((country) => (
      <option value={`${country.dial_code} ${country.name}`} key={country.code}>
        {`${country.dial_code} ${country.name}`}
      </option>
    ));

  options.unshift(
    <option value={"+1 United States"} key={"US"}>
      {"+1 United States"}
    </option>
  );

  return options;
};
