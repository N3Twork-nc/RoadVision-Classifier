import fb from "../../../assets/img/fb.png";
import gg from "../../../assets/img/gg.png";
import { z } from "zod";
import { axiosRequest } from "../../../config/axios.config"; 
import { useState } from "react";

interface LoginBlockProps {
  handleAuth: () => void;
}

// đặt type cho formData
const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
type FormData = z.infer<typeof loginSchema>;

const LoginBlock: React.FC<LoginBlockProps> = ({ handleAuth }) => {

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

  const handleLoginClick = async () => {
    setError(null);
    // Gọi API login
    try {
      const response = await axiosRequest.post('/APIsignin', formData);
      console.log('Login successful:', response.data);
    } catch (err) {
      setError('Login failed. Please check your information!'); 
      console.error(err);
    }
  };

  return (
    <div className="p-4 sm:p-10 flex flex-col gap-1 sm:gap-2 items-center justify-center max-w-full">
      <div className="Header w-full md:text-4xl text-3xl text-[#23038C] font-bold text-left">
        LOGIN
      </div>
      <span className="font-normal text-[#153C71] text-center md:text-left mt-2">
        Welcome back, please login to your account!
      </span>
      <form className="w-full" onSubmit={(e) => e.preventDefault()}> {/* Ngăn chặn submit mặc định */}
        {/* Input username */}
        <div className="Username w-full mt-4">
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
            required
          />
        </div>
        {/* Input password */}
        <div className="Password w-full mt-2">
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
            required 
          />
        </div>
        {error && <span className="text-red-500">{error}</span>} {/* Hiển thị thông báo lỗi nếu có */}
        {/* Forgot password*/}
        <div className="flex items-center justify-center mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="hover:text-blue-800 text-sm underline ml-16">
            Forgot password?
          </a>
        </div>
        {/* Login button */}
        <button 
          type="button"
          onClick={handleLoginClick}
          className="w-full mt-6 h-12 bg-[#024296] rounded-lg text-white font-semibold text-sm sm:text-base flex justify-center items-center"
        >
          Login
        </button>
        {/* Don't have account */}
        <div className="flex items-center justify-center mt-1">
          <label className="inline-flex items-center">
            Don't have an account?{" "}
          </label>
          <a onClick={handleAuth} className="cursor-pointer text-sm font-bold ml-1">
            Sign up
          </a>
        </div>
      </form>
      {/* Or login with */}
      <div className="flex items-center justify-center mt-4">
        <span className="text-[#2d2c2c]">________</span>
        <label className="inline-flex items-center text-[#2d2c2c] mx-2 text-sm">
          OR LOGIN WITH
        </label>
        <span className="text-[#2d2c2c]">________</span>
      </div>

      {/* Login with Google and Facebook */}
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

export default LoginBlock;
