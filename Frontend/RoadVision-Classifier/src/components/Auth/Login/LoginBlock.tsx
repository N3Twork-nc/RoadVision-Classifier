// Import assets for social login buttons
import fb from "../../../assets/img/fb.png"; 
import gg from "../../../assets/img/gg.png"; 
import { z } from "zod"; 
import { useState } from "react"; 
import { useRecoilState } from "recoil"; 
import { userState } from "../../../atoms/authState";
import authService from "../../../services/auth.service"; 
import useNavigateTo from "../../../hooks/useNavigateTo";
import { setStoredUserInfo } from "../../../utils/local-storage.util"; 
import { saveAccessToken } from "../../../utils/auth.util";
import { ERROR_MESSAGES } from "../../../defination/consts/messages.const";

// Define the props for the SignInBlock component
interface SignInBlockProps {
  handleAuth: () => void; // Callback for handling sign-up flow
  handleForgotPass: () => void; // Callback for handling forgot password flow
}

// Input validation schema using zod
const signInSchema = z.object({
  username: z.string().min(6, ERROR_MESSAGES.auth.username), 
  password: z.string().min(6, ERROR_MESSAGES.auth.password), 
});

// Type for the sign-in data inferred from the schema
type SignInData = z.infer<typeof signInSchema>;

// Main SignInBlock component
const SignInBlock: React.FC<SignInBlockProps> = ({ handleAuth }) => {
  // Custom navigation hooks
  const { navigateForgotPassword, navigateHome } = useNavigateTo();

  // State for form input data
  const [formData, setFormData] = useState<SignInData>({
    username: "",
    password: "",
  });

  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // Recoil state for user information
  const [, setUserState] = useRecoilState(userState);

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extract field name and value
    setFormData((prev) => ({
      ...prev, // Preserve previous state
      [name]: value, // Update the field dynamically
    }));
  };

  // Handle sign-in button click
  const handleSignInClick = async () => {
    setError(null); // Reset error state

    // Validate input data using zod schema
    const parseResult = signInSchema.safeParse(formData);
    if (!parseResult.success) {
      const errorMessage = parseResult.error.errors[0].message; // Extract error message
      setError(errorMessage); // Set error message
      return;
    }

    try {
      // Call the API for sign-in
      const data = await authService.signIn(formData);

      const { info, token } = data; // Extract user info and token from response

      // Store user data and token locally
      saveAccessToken(token); // Save token for future API calls
      setStoredUserInfo(info); // Save user info to local storage
      setUserState(info); // Update Recoil user state

      // Navigate to the home page after successful login
      navigateHome();
    } catch (err) {
      setError("Please check your username/password again!");
      console.error(err);
    }
  };

  return (
    <div className="p-4 sm:p-10 flex flex-col gap-1 sm:gap-2 items-center justify-center max-w-full">
      {/* Header Section */}
      <div className="Header w-full md:text-4xl text-3xl text-[#23038C] font-bold text-left">
        LOGIN
      </div>
      <span className="font-normal text-[#153C71] text-center md:text-left mt-2">
        Welcome back, please login to your account!
      </span>

      {/* Username Input */}
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

      {/* Password Input */}
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

      {/* Error Message */}
      {error && <span className="text-red-500">{error}</span>}

      {/* Forgot Password Section */}
      <div className="flex items-center justify-center mt-4">
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox h-4 w-4" />
          <span className="ml-2">Remember me</span>
        </label>
        <button
          onClick={navigateForgotPassword}
          className="hover:text-blue-800 cursor-pointer text-sm underline ml-16"
        >
          Forgot password?
        </button>
      </div>

      {/* Login Button */}
      <button
        type="button"
        onClick={handleSignInClick}
        className="w-full mt-6 h-12 bg-[#024296] rounded-lg text-white font-semibold text-sm sm:text-base flex justify-center items-center hover:bg-[#012f68]"
      >
        Login
      </button>

      {/* Sign-Up Section */}
      <div className="flex items-center justify-center mt-1">
        <label className="inline-flex items-center">
          Don't have an account?{" "}
        </label>
        <button
          onClick={handleAuth}
          className="cursor-pointer hover:text-blue-800 text-sm font-bold ml-1"
        >
          Sign up
        </button>
      </div>

      {/* Divider for Social Login */}
      <div className="flex items-center justify-center mt-4">
        <span className="text-[#2d2c2c]">________</span>
        <label className="inline-flex items-center text-[#2d2c2c] mx-2 text-sm">
          OR LOGIN WITH
        </label>
        <span className="text-[#2d2c2c]">________</span>
      </div>

      {/* Social Login Buttons */}
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

export default SignInBlock;
