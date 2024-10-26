import gg from "../../../assets/img/gg.png";
import fb from "../../../assets/img/fb.png";
import React from "react";
import { z } from "zod";
import { axiosRequest } from "../../../config/axios.config";
import { useState } from "react";

interface SignupBlockProps {
  handleAuth: () => void;
}

// đặt type cho formData
const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
type FormData = z.infer<typeof loginSchema>;

const SignupBlock: React.FC<SignupBlockProps> = ({ handleAuth }) => {
  // thiết lập formData và Error
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupClick = async () => {
    setError(null);
    // Gọi API login
    try {
      const response = await axiosRequest.post("api/signup", formData);
      console.log("Login successful:", response.data);
    } catch (err) {
      setError("Login failed. Please check your information!");
      console.error(err);
    }
  };
  

  return (
    <div className="p-4 sm:p-10 flex flex-col gap-2 items-center justify-center">
      <div className="Header w-full md:text-4xl text-3xl text-[#23038C] font-bold text-left">
        SIGN UP
      </div>
      {/* Input username */}
      <div className="Username w-full">
        <label className="text-[#2F3D4C] font-semibold text-base">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter the username"
          className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
        />
      </div>
      {/* Input email */}
      <div className="Email w-full">
        <label className="text-[#2F3D4C] font-semibold text-base">Email</label>
        <input
          type="email"
          placeholder="Enter the email"
          className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
        />
      </div>
      {/* Input password */}
      <div className="Password w-full">
        <label className="text-[#2F3D4C] font-semibold text-base">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter the password"
          className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
        />
      </div>
      {/* Input password again */}
      <div className="Re-enterpassword w-full">
        <label className="text-[#2F3D4C] font-semibold text-base">
          Re-enter password
        </label>
        <input
          type="password"
          placeholder="Re-enter the password"
          className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
        />
      </div>
      {/* Already have account */}
      <div className="flex items-center justify-center mt-4">
        <label className="inline-flex items-center">
          Already have an account?{" "}
        </label>
        <a
          onClick={handleAuth}
          className="cursor-pointer text-sm font-bold ml-1"
        >
          Login
        </a>
      </div>
      {/* Create account */}
      <button className="w-full h-12 bg-[#024296] rounded-lg text-white font-semibold text-sm sm:text-base flex justify-center items-center">
        Create Account
      </button>

      {/* Or signup with */}
      <div className="flex items-center justify-center mt-4">
        <span className="text-[#2d2c2c]">________</span>
        <label className="inline-flex items-center text-[#2d2c2c] mx-2 text-sm">
          OR SIGNUP WITH
        </label>
        <span className="text-[#2d2c2c]">________</span>
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
  );
};
export default SignupBlock;
