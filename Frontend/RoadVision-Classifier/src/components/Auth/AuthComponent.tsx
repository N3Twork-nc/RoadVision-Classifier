import { useState } from "react";
import road from "../../assets/img/road.png";
import LoginBlock from "./Login/LoginBlock";
import SignupBlock from "./Signup/SignupBlock";

export default function AuthComponent() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col md:flex-row w-[60%] sm:h-[80%] h-fit rounded-2xl bg-white shadow-2xl">
      {/* left container */}
      <div className="lg:w-1/2 p-5 w-full rounded-l-3xl overflow-auto flex justify-center items-center ">
      {isLogin ? <LoginBlock handleAuth={handleAuth} /> : <SignupBlock handleAuth={handleAuth} />}
      </div>
      {/* right container */}
      <div className="lg:w-1/2 hidden lg:block rounded-r-2xl bg-opacity-40 relative">
        <img
          src={road}
          className="w-full h-full object-cover rounded-r-2xl"
          alt="Road image"
        />
        <div className="absolute inset-0 bg-[#5277CD] bg-opacity-30 rounded-r-2xl"></div>
      </div>
    </div>
  );
}
