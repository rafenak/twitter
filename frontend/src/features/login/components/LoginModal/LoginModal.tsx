import React,{useState,useEffect} from "react";
import { Modal } from "../../../../components/modal/Modal";
import { LoginTopModal } from "../LoginTopModal/LoginTopModal";
import { LoginFormOne } from "../LoginForms/LoginFormOne";
import { RootState } from "../../../../redux/Store";
import { useSelector } from "react-redux";
import { LoginFormTwo } from "../LoginForms/LoginFormTwo";
import { LoginButton } from "../LoginButton/LoginButton";
import { useNavigate } from "react-router-dom";



interface LoginModalProps {
  toggleModal: () => void;
  toggleRegister:()=>void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ toggleModal,toggleRegister }) => {
  const state = useSelector((state: RootState) => state.user);

  const [password, setPassword] = useState<string>('')

  const navigate = useNavigate();

  const handlePassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value);
  }

  useEffect(()=>{
    if(state.loggedIn){
      navigate("/home");
      return ()=>{
        
      }
    }
  })

  const openRegister=()=>{
    toggleModal();
    toggleRegister();
  }

  return (
    <Modal
      topContent={<LoginTopModal closeModal={toggleModal} />}
      content={state.username ? <LoginFormTwo setPassword={handlePassword} />: <LoginFormOne noAccount={openRegister} />}
      bottomContent={state.username ? <LoginButton username={state.username} password={password}/>  :<></>}
    />
  );
};
