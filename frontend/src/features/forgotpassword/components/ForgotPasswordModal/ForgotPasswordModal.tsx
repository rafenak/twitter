import React, { useState } from "react";
import { Modal } from "../../../../components/modal/Modal";
import { ForgotModalTop } from "../ForgotModalTop/ForgotModalTop";
import { ForgotFormOne } from "../ForgotForms/ForgotFormOne";
import { validateEmail, validatePhone } from "../../../../services/Validators";
import axios from "axios";
import { ForgotButtonOne } from "../ForgotButtons/ForgotButtonOne";
import { ForgotFormTwo } from "../ForgotForms/ForgotFormTwo";
import { ForgotButtonTwo } from "../ForgotButtons/ForgotButtonTwo";

interface UserInfo {
  email: string;
  phone: string;
  username: string;
}

export const ForgotPasswordModal: React.FC<{ toggleModal: () => void }> = ({
  toggleModal,
}) => {
  const [credential, setCredential] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: "",
    phone: "",
    username: "",
  });
  const [error, setError] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [resetCode, setResetCode] = useState<number>(0);

  const changeCredentials = (credential: string) => {
    setCredential(credential);
  };

  const searchUser = async () => {
    let findUserDTO = {
      email: "",
      phone: "",
      username: "",
    };

    if (validateEmail(credential)) {
      findUserDTO = {
        ...findUserDTO,
        email: credential,
      };
    } else if (validatePhone(credential)) {
      findUserDTO = {
        ...findUserDTO,
        phone: credential,
      };
    } else {
      findUserDTO = {
        ...findUserDTO,
        username: credential,
      };
    }

    try {
      setError(false);
      let res = await axios.post("http://localhost:8000/auth/identifiers", {
        email: findUserDTO.email,
        phone: findUserDTO.phone,
        username: findUserDTO.username,
      });
      let data = await res.data;
      setUserInfo({
        email: data.email,
        phone: data.phone,
        username: data.username,
      });
      setStep(2);
    } catch (e) {
      setError(true);
    }
  };

  const sendReset = async () => {
    // const code = Math.floor(100000+ Math.random()*900000);
    const code =
      100000 + (window.crypto.getRandomValues(new Uint32Array(1))[0] % 900000);
    setResetCode(code);
    try {
      let req = await axios.post("http://localhost:8000/auth/password/code", {
        email: userInfo.email,
        code: code,
      });
      let res = await req.data;
      setStep(3);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Modal
        topContent={<ForgotModalTop closeModal={toggleModal} />}
        content={
          step === 1 ? (
            <ForgotFormOne setCredential={changeCredentials} error={error} />
          ) : (
            <ForgotFormTwo email={userInfo.email} phone={userInfo.phone} />
          )
        }
        bottomContent={
          step === 1 ? (
            <ForgotButtonOne
              value={credential}
              handleClick={searchUser}
            />
          ) : (
            <ForgotButtonTwo onCancel={toggleModal} sendCode={sendReset} />
          )
        }
      />
    </div>
  );
};
