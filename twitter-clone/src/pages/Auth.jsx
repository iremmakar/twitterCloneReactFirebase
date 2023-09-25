import React, { useState } from "react";

import { RiTwitterXFill } from "react-icons/ri";

import { FcGoogle } from "react-icons/fc";

import { auth, provider } from "../firebase/config";

import { toast } from "react-toastify";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setIsError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const pass = e.target[1].value;
    console.log(email, pass);

    if (signUp) {
      console.log(email, pass);
      createUserWithEmailAndPassword(auth, email, pass).catch((err) =>
        toast.error(err.code)
      );
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {})
        .catch((err) => {
          toast.error(err.code);
          if (err.code === "auth/invalid-login-credentials") {
            setIsError(true);
          }
        });
    }
  };

  const handleReset = () => {
    /* sendPasswordResetEmail(auth, email).then(()=>toast.info("Lütfen mailinizi kontrol edin")).catch((err)=>{
      toast.error(err.code);
    }); */
  };

  const handleGoogle = () => {
    console.log("google");
    signInWithPopup(auth, provider).then((res) => console.log(res));
  };
  return (
    <div className="bg-zinc-800 grid place-items-center h-[100vh]">
      <div className="bg-black text-white flex flex-col gap-10 py-16 rounded-lg px-32">
        <div className="flex justify-center ">
          <RiTwitterXFill style={{ fontSize: "90px" }} onClick={handleGoogle} />
        </div>

        <h1 className="text-center font-bold text-lg">Twitter'a giriş yap</h1>

        <div className="flex items-center bg-white text-black py-2 px-10 rounded-full cursor-pointer hover:bg-gray-200 gap-3">
          <FcGoogle style={{ fontSize: "20px" }} />
          <p className="whitespace-nowrap">Google ile giriş yap</p>
        </div>

        <form
          action=""
          className="flex flex-col"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="text-black rounded p-2 shadow-lg focus:shadow-[#ffffff48]"
          />

          <label htmlFor="" className="mt-5">
            Password
          </label>
          <input
            type="password"
            className="text-black rounded p-2 shadow-lg focus:shadow-[#ffffff48]"
          />

          <button
            className="bg-white text-black mt-10 rounded-full p-1 font-bold hover:bg-gray-200 transition"
            type="submit"
          >
            {signUp ? "Kaydol" : "Giriş Yap"}
          </button>

          <p className="text-gray-500 mt-3">
            <span>Hesabınız Yok Mu?</span>
            <button
              className="mx-3 text-blue-500 "
              onClick={() => setSignUp(!signUp)}
              type="button"
            >
              {signUp ? "Giriş Yap" : " Kaydol"}
            </button>
          </p>

          {!signUp && error && (
            <button
              className="text-red-400 mt-5"
              onClick={handleReset}
              type="button"
            >
              Şifrenizi mi unuttunuz ?
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
