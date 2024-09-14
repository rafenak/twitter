import { ForgotButtonOne } from "../components/ForgotButtons/ForgotButtonOne";
import { ForgotButtonThree } from "../components/ForgotButtons/ForgotButtonThree";
import { ForgotButtonTwo } from "../components/ForgotButtons/ForgotButtonTwo";
import { ForgotFormOne } from "../components/ForgotForms/ForgotFormOne";
import { ForgotFormThree } from "../components/ForgotForms/ForgotFormThree";
import { ForgotFormTwo } from "../components/ForgotForms/ForgotFormTwo";

export const determineForgotFormContent = (
  step: number,
  setCrdential: (value: string) => void,
  error: boolean,
  email: string,
  phone: string,
  valid:boolean,
  updateCode:(value:number)=>void
): JSX.Element => {
  switch (step) {
    case 1:
      return <ForgotFormOne setCredential={setCrdential} error={error} />;
    case 2:
      return <ForgotFormTwo phone={phone} email={email} />;
    case 3:
      return <ForgotFormThree updateCode={updateCode} valid={valid}/>  
  }
  return <></>;
};

export const determineForgotButton = (
  step: number,
  credential: string,
  searchUser: () => void,
  cancel: () => void,
  sendCode: () => void,
  formThreeActive:boolean,
  checkCode: () => void,
  back:() => void
): JSX.Element => {
  switch (step) {
    case 1:
      return <ForgotButtonOne handleClick={searchUser} value={credential} />;

    case 2:
      return <ForgotButtonTwo onCancel={cancel} sendCode={sendCode} />;

    case 3:
       return <ForgotButtonThree active={formThreeActive} checkCode={checkCode} back={back}/>; 
  }
  return <></>;
};
 