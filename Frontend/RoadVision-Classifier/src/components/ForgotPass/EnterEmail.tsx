interface EnterEmailProps {
    onContinue: () => void;
  }

  const EnterEmail: React.FC<EnterEmailProps> = ({ onContinue }) => {

  return (
    <div className="w-full h-screen bg-[#CFEEFF] flex justify-center items-center">
      <div className="flex flex-col p-10 justify-center items-center w-[60%] lg:h-[80%] h-fit rounded-2xl bg-white shadow-2xl">
        <div className="Header w-full mb-5 md:text-4xl text-3xl text-[#23038C] font-bold text-center">
          FORGOT PASSWORD
        </div>
        <span className="font-normal text-[#153C71] text-center text-lg md:text-left mt-3">
          Please your email for the verification.
        </span>
        <span className="font-normal mb-5 text-[#153C71] text-center text-lg md:text-left">
          New password will send to your email.
        </span>
        <div className="Username w-[80%] mt-4 mb-5">
          <label className="text-[#2F3D4C] font-semibold text-base">
            Email
          </label>
          <input
            type="email"
            name="email" 
            placeholder="Enter your email"
            className="w-full h-11 p-4 mt-2 rounded-md border-[1px] border-[#2F3D4C] text-sm sm:text-base"
            required
          />
        </div>
        <button 
          type="button"
          onClick={onContinue}
          className="w-[50%] mt-10 h-12 bg-[#024296] rounded-lg text-white font-semibold text-base sm:text-lg flex justify-center items-center"
        >
          CONTINUE
        </button>
      </div>
    </div>
  )
}

export default EnterEmail;
