import road from "../../assets/img/road.png";
import LoginBlock from "./Login/LoginBlock";
export default function AuthComponent() {
  return (
    <div className="flex flex-col md:flex-row w-[60%] h-[70%] rounded-2xl bg-white shadow-2xl">
      
      <div className="md:w-1/2 w-full rounded-l-3xl">
        <LoginBlock/>
        {/* Signup */}
      </div>

      <div className="md:w-1/2 hidden md:block rounded-r-2xl bg-blue-200 bg-opacity-40 relative">
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
