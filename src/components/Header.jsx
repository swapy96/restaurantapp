import React from "react";
import { icons } from "react-icons";
import { MdAddShoppingCart, MdAdd, MdLogout, MdLogin } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/restlogo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(auth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const dropdown = async () => {
    if (!user) {
      navigate("/login");
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* Desktop and tab screen */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-16 object-cover" alt="Logo" />
          <p className="text-headingColor text-xl font-bold">Vancouver</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className="flex items-center gap-24">
            <Link to={"/"}>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer" onClick={() => setIsMenu(false)}>
                Home
              </li>
            </Link>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer" onClick={() => setIsMenu(false)}>
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer" onClick={() => setIsMenu(false)}>
              About Us
            </li>
            <Link to={"/login"}>
              <li className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base">
                Login <MdLogout />
              </li>
            </Link>
          </motion.ul>

          <div className="relative flex justify-center items-center" onClick={showCart}>
            {/* shopping cart added */}
            <MdAddShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-3 -right-0.5 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img whileTap={{ scale: 0.8 }} src={user ? user?.photoURL : Avatar} alt="Avatar" className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full" onClick={dropdown} />
            {/*  onClick={login}*/}
            {isMenu && (
              <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">
                {user && user.email === "s.swapnil80@gmail.com" && (
                  <Link to={"/add"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base" onClick={() => setIsMenu(false)}>
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base" onClick={logout}>
                  LogOut
                  <MdLogin />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* mobile screen */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex justify-center items-center" onClick={showCart}>
          {/* shopping cart added */}
          <MdAddShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-3 -right-0.5 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
              <p className="text-xs text-white font-semibold">{cartItems.length}</p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> Vancouver</p>
        </Link>

        <div className="relative">
          <motion.img whileTap={{ scale: 0.6 }} src={user ? user.photoURL : Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full" alt="userprofile" onClick={dropdown} />
          {isMenu && (
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0">
              {user && user.email === "s.swapnil80@gmail.com" && (
                <Link to={"/add"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base" onClick={() => setIsMenu(false)}>
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col">
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={() => setIsMenu(false)}>
                  Home
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={() => setIsMenu(false)}>
                  Menu
                </li>
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={() => setIsMenu(false)}>
                  About Us
                </li>
                <li className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base" onClick={logout}>
                  Login <MdLogout />
                </li>
              </ul>

              <p className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base" onClick={logout}>
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
