import { useState } from "react";
import road from "../../assets/img/road.png";
import LoginBlock from "./Login/LoginBlock";
import SignupBlock from "./Signup/SignupBlock";
import VerifyBlock from "./Verify/VerifyBlock";

export default function AuthComponent() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);

  const handleAuth = () => {
    setIsLogin(!isLogin);
  };

  const handleSignUpSuccess = () => {
    setIsSignedUp(true); 
  };

  return (
    <div className="flex flex-col md:flex-row w-[60%] lg:h-[80%] h-fit rounded-2xl bg-white shadow-2xl">
      {/* left container */}
      <div className="lg:w-1/2 p-5 w-full rounded-l-3xl overflow-auto flex justify-center items-center">
        {isSignedUp ? (
          <VerifyBlock handleAuth={handleAuth} onSignUpSuccess={handleSignUpSuccess} />
        ) : isLogin ? (
          <LoginBlock handleAuth={handleAuth} />
        ) : (
          <SignupBlock handleAuth={handleAuth} onSignUpSuccess={handleSignUpSuccess} />
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
