import icon_fb from "../../../assets/img/icon_fb.png";
import icon_gg from "../../../assets/img/icon_gg.png";

interface LoginBlockProps {
  handleAuth: () => void;
}

const LoginBlock: React.FC<LoginBlockProps> = ({handleAuth}) => {
  return (
    <div className="px-6 py-12 md:p-24 flex flex-col items-center md:items-start">
      <h2 className="font-bold text-[#23038C] text-4xl md:text-5xl">LOGIN</h2>
      <span className="font-normal text-[#153C71] text-center md:text-left mt-2">
        Welcome Back, Please login to your account!
      </span>
      <div className="w-full max-w-sm mt-4">
        {/* Input username */}
        <div className="w-full">
          <label className="text-sm font-semibold text-black-600">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            className="p-4 mt-1 w-full border border-[#6775A9] rounded-md"
          />
        </div>
        {/* Input password*/}
        <div className="w-full mt-4">
          <label className="text-sm font-semibold text-black-600">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="p-4 mt-1 w-full border border-[#6775A9] rounded-md"
          />
        </div>
        {/* Forgot password*/}
        <div className="flex items-center justify-between mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="hover:text-blue-800 text-sm underline">
            Forgot password?
          </a>
        </div>
        <button className="bg-blue-800 w-full rounded-lg text-white p-3 mt-5">
          Login
        </button>

        {/* Don't have account */}
        <div className="flex items-center justify-center mt-4">
          <label className="inline-flex items-center">
            Don't have an account?{" "}
          </label>
          <a onClick={handleAuth} className="text-sm cursor-pointer font-bold ml-1">
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

        {/* Login with Google and Facebook */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-10 py-2">
            <img src={icon_gg} alt="Google icon" className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-10 py-2">
            <img src={icon_fb} alt="Facebook icon" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginBlock;
