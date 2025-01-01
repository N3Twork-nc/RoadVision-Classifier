import { Breadcrumb } from "antd";
import avt from "../../../assets/img/defaultAvatar.png"

interface DataType {
  key: React.Key;
  username: string;
  fullname: string;
  joindate: string;
  avatar: string,
}
interface AllTechniciansProps {
    technician: DataType;
    onBack: () => void;
  }

export default function TechnicianInfo({ technician, onBack }: AllTechniciansProps) {
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col gap-5 justify-start items-center overflow-y-auto">
      <Breadcrumb
        className="w-full justify-start px-10"
        separator=">"
        items={[
          {
            title: "All Technicians",
            onClick: onBack,
            className: "cursor-pointer",
          },
          {
            title: technician.username || "Technician Info",
          },
        ]}
      />
      <div className="relative flex flex-row gap-5 w-[95%] h-48 px-10 rounded-2xl bg-[#3749A6] justify-between items-center">
        <div className="absolute bg-white rounded-full w-36 h-36 flex justify-center items-center">
          <img
            src={technician.avatar || avt}
            alt="Avatar"
            className="w-[95%] h-[95%] object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col justify-between ml-40">
          <div className="text-white font-bold text-2xl">
            {technician.fullname || ""}
          </div>
          <div className="text-white font-normal text-base">
            {technician.username || ""}
          </div>
          <div className="text-white font-normal text-base">
            {technician.joindate || ""}
          </div>
        </div>
      </div>
    </div>
  );
}
