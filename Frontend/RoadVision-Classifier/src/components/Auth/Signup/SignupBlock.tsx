import gg from "../../../assets/img/gg.png";
import fb from "../../../assets/img/fb.png";
import React from "react";

interface SignupBlockProps {
  handleAuth: () => void;
}

const SignupBlock: React.FC<SignupBlockProps> = ({ handleAuth }) => {  
  return (
    <div className="p-4 sm:p-10 flex flex-col gap-2 items-center justify-center">
    <div className="Header w-full md:text-4xl text-3xl text-[#23038C] font-bold text-left">
      SIGN UP
    </div>
    <div className="Username w-full">
      <label className="text-[#2F3D4C] font-semibold text-base">Username</label>
      <input
        type="text"
        placeholder="Enter the username"
        className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
      />
    </div>
    <div className="Email w-full">
      <label className="text-[#2F3D4C] font-semibold text-base">Email</label>
      <input
        type="email"
        placeholder="Enter the email"
        className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
      />
    </div>
    <div className="Password w-full">
      <label className="text-[#2F3D4C] font-semibold text-base">Password</label>
      <input
        type="password"
        placeholder="Enter the password"
        className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
      />
    </div>
    <div className="Re-enterpassword w-full">
      <label className="text-[#2F3D4C] font-semibold text-base">Re-enter password</label>
      <input
        type="password"
        placeholder="Re-enter the password"
        className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
      />
    </div>
    <a onClick={handleAuth} className="Login cursor-pointer underline w-full text-right text-xs sm:text-sm">
      Already have an account? Login
    </a>
    <button className="w-full h-12 bg-[#024296] rounded-lg text-white font-semibold text-sm sm:text-base flex justify-center items-center">
      Create Account
    </button>
    <div className="w-full h-[0.5px] bg-gray-300 mt-2 text-xs text-center text-gray-700 sm:text-sm">
      OR SIGNUP WITH
    </div>
    <div className="flex flex-row justify-center gap-2 mt-4">
      <button className="w-20 h-10 sm:w-15 sm:h-15 rounded-lg border-[2px] border-[#a5b3ff] flex justify-center items-center">
        <img src={fb} alt="Facebook" className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button className="w-20 h-10 sm:w-15 sm:h-15 rounded-lg border-[2px] border-[#a5b3ff] flex justify-center items-center">
        <img src={gg} alt="Google" className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  </div>
  )
}
export default SignupBlock;
