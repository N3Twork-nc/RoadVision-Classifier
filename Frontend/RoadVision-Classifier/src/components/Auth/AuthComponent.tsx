import { useEffect, useState } from "react";
import road from "../../assets/img/road.png";
import SignupBlock from "./Signup/SignupBlock";
import SignInBlock from "./Login/LoginBlock";
import VerifyBlock from "./Verify/VerifyBlock";
import { useNavigate, useLocation } from "react-router-dom";


export default function AuthComponent() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  const location = useLocation();

  const handleAuth = () => {
    if (isLogin) {
      navigate("/sign-up");
    } else {
      navigate("/login");
    }
    setIsLogin(!isLogin);
  };
  
  const handleForgotPass = () => {
    navigate("/forgot-password");
  };

  const handleSignUpSuccess = () => {
    setIsSignedUp(true);
  };

  useEffect(() => {
    const handleSetDefault = () => {
      const pathname = location.pathname;
      if (pathname === "/sign-up") {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    };
    handleSetDefault();
  }, [location]);

  return (
    <div className="flex flex-col md:flex-row w-[60%] lg:h-[80%] h-fit rounded-2xl bg-white shadow-2xl">
      {/* left container */}
      <div className="lg:w-1/2 p-5 w-full rounded-l-3xl overflow-auto flex justify-center items-center">
        {isSignedUp ? (
          <VerifyBlock
            handleAuth={handleAuth}
            onSignUpSuccess={handleSignUpSuccess}
          />
        ) : isLogin ? (
          <SignInBlock
            handleAuth={handleAuth}
            handleForgotPass={handleForgotPass}
          />
        ) : (
          <SignupBlock
            handleAuth={handleAuth}
            onSignUpSuccess={handleSignUpSuccess}
          />
        )}
      </div>
      {/* right container */}
      <div className="lg:w-1/2 hidden lg:block rounded-r-2xl bg-opacity-40 relative">
        <img
          src={road}
          className="w-full h-full object-cover rounded-r-2xl"
          alt="Road background"
        />
        <div className="absolute inset-0 bg-[#5277CD] bg-opacity-30 rounded-r-2xl"></div>
      </div>
    </div>
  );
}
