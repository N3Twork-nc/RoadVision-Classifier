import fb from "../../../assets/img/fb.png";
import gg from "../../../assets/img/gg.png";

export default function LoginBlock() {
  return (
    <div className="p-2 sm:p-4 md:p-10 flex flex-col gap-1 sm:gap-2 items-center justify-center max-w-full">
      <div className="Header w-full md:text-4xl text-3xl text-[#23038C] font-bold text-left">
        LOGIN
      </div>
      <span className="font-normal text-[#153C71] text-center md:text-left mt-2">
        Welcome back, please login to your account!
      </span>
      {/* Input username */}
      <div className="Username w-full mt-4">
        <label className="text-[#2F3D4C] font-semibold text-base">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter the username"
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
      {/* Forgot password*/}
      <div className="flex items-center justify-between mt-4">
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <span className="ml-2">Remember me</span>
        </label>
        <a href="#" className="hover:text-blue-800 text-sm underline ml-16">
          Forgot password?
        </a>
      </div>
      {/* Login button */}
      <button className="w-full h-12 bg-[#024296] rounded-lg text-white font-semibold text-sm sm:text-base flex justify-center items-center">
        Login
      </button>
      {/* Don't have account */}
      <div className="flex items-center justify-center mt-1">
        <label className="inline-flex items-center">
          Don't have an account?{" "}
        </label>
        <a href="#" className="text-sm font-bold ml-1">
          Sign up
        </a>
      </div>
      {/* Or login with */}
      <div className="flex items-center justify-center mt-4">
        <span className="text-[#2d2c2c]">________</span>
        <label className="inline-flex items-center text-[#2d2c2c] mx-2 text-sm">
          OR LOGIN WITH
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
}
