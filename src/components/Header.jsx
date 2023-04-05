import React from "react";
import { icons } from "react-icons";
import { MdAddShoppingCart } from "react-icons/md";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function Header() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(auth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });

    //   .then((result) => {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential.accessToken;
    //     // The signed-in user info.
    //     const user = result.user;
    //     // IdP data available using getAdditionalUserInfo(result)
    //     // ...
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // The email of the user's account used.
    //     const email = error.customData.email;
    //     // The AuthCredential type that was used.
    //     const credential = GoogleAuthProvider.credentialFromError(error);
    //     // ...
    //   });
  };

  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      {/* Desktop and tab screen */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="Logo" />
          <p className="text-headingColor text-xl font-bold">Vancouver</p>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Home</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Menu</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">About Us</li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Service</li>
          </ul>

          <div className="relative flex justify-center items-center">
            {/* shopping cart added */}
            <MdAddShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer" />
            <div className="absolute -top-3 -right-0.5 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img whileTap={{ scale: 0.8 }} src={Avatar} alt="Avatar" className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer" onClick={login} />
          </div>
        </div>
      </div>
      {/* mobile screen */}
      <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
}

export default Header;
