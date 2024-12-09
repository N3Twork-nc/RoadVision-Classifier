import gg from "../../../assets/img/gg.png";
import fb from "../../../assets/img/fb.png";
import React, { useState } from "react";
import { z } from "zod";
import { useRecoilState } from "recoil";
import { verifyEmailState } from "../../../atoms/authState";
import authService from "../../../services/auth.service";

interface SignupBlockProps {
  handleAuth: () => void;
  onSignUpSuccess: () => void;
}

// Input validation rules
const signupSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  email: z.string().email("Invalid email format"),
});

type FormData = z.infer<typeof signupSchema> & { reEnterPassword: string };

const SignupBlock: React.FC<SignupBlockProps> = ({
  handleAuth,
  onSignUpSuccess,
}) => {
  const [verifyEmailRecoidState, setVerifyEmailRecoidState] = useRecoilState(verifyEmailState);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    reEnterPassword: "",
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

    // Check Validate form data
    const parseResult = signupSchema.safeParse(formData);
    if (!parseResult.success) {
      const errorMessage = parseResult.error.errors[0].message;
      setError(errorMessage);
      return;
    }

    // Check password
    if (formData.password !== formData.reEnterPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call signup API
      const response = await authService.signUp(formData);
      console.log("Signup successful:", response.data);

      setVerifyEmailRecoidState({
        email: formData.email,
        password: formData.password,
        username: formData.username,
      });

      onSignUpSuccess();
    } catch (err) {
      setError("Signup failed.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 sm:p-10 flex flex-col gap-2 items-center justify-center">
      <div className="Header w-full md:text-4xl text-3xl text-[#23038C] font-bold text-left">
        SIGN UP
      </div>
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="Username w-full">
          <label className="text-[#2F3D4C] font-semibold text-base">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter the username"
            value={formData.username}
            onChange={handleChange}
            className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
          />
        </div>

        <div className="Email w-full">
          <label className="text-[#2F3D4C] font-semibold text-base">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter the email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
          />
        </div>

        <div className="Password w-full">
          <label className="text-[#2F3D4C] font-semibold text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter the password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
          />
        </div>

        <div className="Re-enterpassword w-full">
          <label className="text-[#2F3D4C] font-semibold text-base">
            Re-enter password
          </label>
          <input
            type="password"
            name="reEnterPassword"
            placeholder="Re-enter the password"
            value={formData.reEnterPassword}
            onChange={handleChange}
            className="w-full h-11 p-4 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
          />
        </div>
      </form>

      {/* Display error message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex items-center justify-center mt-4">
        <label className="inline-flex items-center">
          Already have an account?{" "}
        </label>
        <a
          onClick={handleAuth}
          className="cursor-pointer hover:text-blue-800 text-sm font-bold ml-1"
        >
          Login
        </a>
      </div>

      <button
        onClick={handleSignupClick}
        className="w-full h-12 bg-[#024296] rounded-lg text-white font-semibold text-sm sm:text-base flex justify-center items-center hover:bg-[#27558f]"
      >
        Create Account
      </button>

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
