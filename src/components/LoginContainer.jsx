import React from "react";
import Logo from "../img/restlogo.png";
import LoginInput from "./LoginInput";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase.config";
import { validateUserJWTToken } from "../api";
import { useNavigate } from "react-router";

const LoginContainer = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            console.log(token);
            validateUserJWTToken(token).then((data) => {
              // console.log(data);
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };

  const signUpWithEmailPassword = async () => {
    if (userEmail === "" || password === "" || confirmPassword === "") {
      alert("ERROR, fields can not be empty");
    } else {
      if (password === confirmPassword) {
        setUserEmail("");
        setConfirmPassword("");
        setPassword("");
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                // console.log(token);
                validateUserJWTToken(token).then((data) => {
                  console.log(data);
                });
                navigate("/", { replace: true });
              });
            }
          });
        });
      } else {
        alert("password must match!");
      }
    }
  };

  const signIpWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred) => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              // console.log(token);
              validateUserJWTToken(token).then((data) => {
                console.log(data);
              });
              navigate("/", { replace: true });
            });
          }
        });
      });
    } else {
      alert("Enter email and password to log in.");
    }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      {/* bg-img */}
      <img className="w-full h-full object-cover absolute top-0 left-0" src="https://img.freepik.com/premium-photo/preparation-cooking-wooden-background-top-view-free-space-text_187166-51517.jpg" alt="bg image" />
      {/* content box */}
      <div className="flex flex-col items-center bg-slate-400 w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
        {/* top logosecton */}
        <div className="flex items-center justify-start gap-4 w-full">{/* <img src={Logo} alt="logo" /> */}</div>
        {/* welcome text */}
        <p className="text-3xl font-semibold text-headingColor">Welcome Back! </p>
        <p className="text-xl text-textColor -mt-6">{isSignUp ? "Sign up" : "Sign In"} with following </p>

        {/* input section */}

        <div className="w-full flex flex-col items-center justify-center gap-6 md:px-12 py-4">
          <LoginInput placeholder={"email here"} icon={<FaEnvelope className="text-xl text-textColor" />} inputState={userEmail} inputStateFunction={setUserEmail} type="email" isSignUp={isSignUp} />

          <LoginInput placeholder={"Password here"} icon={<FaLock className="text-xl text-textColor" />} inputState={password} inputStateFunction={setPassword} type="password" isSignUp={isSignUp} />

          {isSignUp && <LoginInput placeholder={"Confirm Password here"} icon={<FaLock className="text-xl text-textColor" />} inputState={confirmPassword} inputStateFunction={setConfirmPassword} type="password" isSignUp={isSignUp} />}

          {!isSignUp ? (
            <p>
              Don't have an account?{" "}
              <motion.button className="text-red-400 text-xl underline cursor-pointer bg-transparent" onClick={() => setIsSignUp(true)} whileTap={{ scale: 0.95 }}>
                Create One NOW!
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <motion.button className="text-red-400 text-xl underline cursor-pointer bg-transparent" onClick={() => setIsSignUp(false)} whileTap={{ scale: 0.95 }}>
                Sign In here!
              </motion.button>
            </p>
          )}

          {/* login button */}
          {isSignUp ? (
            <motion.button whileTap={{ scale: 0.75 }} className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-100" onClick={signUpWithEmailPassword}>
              Sign UP
            </motion.button>
          ) : (
            <motion.button whileTap={{ scale: 0.75 }} className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-100" onClick={signIpWithEmailPass}>
              Sign in
            </motion.button>
          )}
        </div>
        {/* google acct sign in */}
        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">OR</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>
        <motion.div whileTap={{ scale: 0.75 }} className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4" onClick={loginWithGoogle}>
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">SignIn with Google</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginContainer;
