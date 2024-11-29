import { useEffect, useState } from "react";
import React from "react";
import { axiosRequest } from "../../../config/axios.config";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useRecoilValue } from "recoil";
import { verifyEmailState } from "../../../atoms/authState";

// Định nghĩa schema cho dữ liệu form
const verifySchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  OTP: z.string(),
});
type FormData = z.infer<typeof verifySchema>;

interface VerifyBlockProps {
  handleAuth: () => void;
  onSignUpSuccess: () => void;
}

const VerifyBlock: React.FC<VerifyBlockProps> = ({
  handleAuth,
  onSignUpSuccess,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));
  const [error, setError] = useState<string | null>(null);
  const verifyEmailRecoidValue = useRecoilValue(verifyEmailState);

  // Khởi tạo dữ liệu form
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    OTP: "",
  });

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    // Cập nhật OTP trong formData
    setFormData((prevData) => ({
      ...prevData,
      OTP: newOtp.join(""),
    }));

    // Tự động chuyển sang ô input tiếp theo
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleVerifyClick = async () => {
    if (formData.OTP.length !== 5) {
      setError("Please enter all 5 digits of the OTP.");
      return;
    }

    console.log("OTP to be sent:", formData.OTP);

    try {
      const response = await axiosRequest.post("/auth/api/verifyEmail", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        OTP: formData.OTP,
      });
      console.log("Verification successful:", response.data);
      onSignUpSuccess();
    } catch (err) {
      console.error("Verification failed:", err);
      setError("Failed to verify OTP. Please try again.");
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      email: verifyEmailRecoidValue.email,
      password: verifyEmailRecoidValue.password,
      username: verifyEmailRecoidValue.username,
    });
  }, [verifyEmailRecoidValue]);

  return (
    <div className="flex flex-col p-5 sm:p-10 justify-center items-center rounded-2xl bg-white mx-auto mt-2">
      <div className="Header w-full mb-3 md:mb-5 text-2xl md:text-3xl lg:text-4xl text-[#23038C] font-bold text-center">
        VERIFY YOUR ACCOUNT
      </div>
      <span className="font-normal text-[#153C71] text-center text-sm sm:text-base md:text-lg mt-2 md:mt-3">
        A code will be sent to your email
      </span>
      <span className="font-normal mb-3 md:mb-5 text-[#153C71] text-center text-sm sm:text-base md:text-lg">
        Please enter the code below to confirm your email address
      </span>
      <div className="flex space-x-2 mt-2 sm:mt-3">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#024296]"
            maxLength={1}
            required
          />
        ))}
      </div>
      {error && <span className="text-red-500 mt-2 text-sm">{error}</span>}
      <button
        type="button"
        className="w-full sm:w-[100%] mt-6 sm:mt-10 h-10 sm:h-12 bg-[#024296] rounded-lg text-white font-semibold text-base sm:text-lg flex justify-center items-center"
        onClick={handleVerifyClick}
      >
        CONFIRM
      </button>
    </div>
  );
};

export default VerifyBlock;
