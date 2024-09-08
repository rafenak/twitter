import React,{useState} from "react";
import { Modal } from "../../../../components/modal/Modal";
import { LoginTopModal } from "../LoginTopModal/LoginTopModal";
import { LoginFormOne } from "../LoginForms/LoginFormOne";
import { RootState } from "../../../../redux/Store";
import { useSelector } from "react-redux";
import { LoginFormTwo } from "../LoginForms/LoginFormTwo";



interface LoginModalProps {
  toggleModal: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ toggleModal }) => {
  const state = useSelector((state: RootState) => state.user);

  const [password, setPassword] = useState<string>('')

  const handlePassword=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(e.target.value);
  }

  return (
    <Modal
      topContent={<LoginTopModal closeModal={toggleModal} />}
      content={state.username ? <LoginFormTwo setPassword={handlePassword} />: <LoginFormOne />}
      bottomContent={state.username ? <>Login form 2 buttom</>:<></>}
    />
  );
};
