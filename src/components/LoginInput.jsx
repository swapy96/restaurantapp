import React, { useState } from "react";
import { motion } from "framer-motion";

const LoginInput = ({ placeholder, icon, inputState, inputStateFunction, type, isSignUp }) => {
  const [isFocus, setisFocus] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-4 ${isFocus ? "shadow-md shadow-red-400" : "shadow-none"}`}>
      {icon}
      <input type={type} placeholder={placeholder} className="w-full h-full bg-transparent text-headingColor lext-lg font-semibold outline-none" value={inputState} onChange={(e) => inputStateFunction(e.target.value)} onFocus={() => setisFocus(true)} onBlur={() => setisFocus(false)} />
    </motion.div>
  );
};

export default LoginInput;
