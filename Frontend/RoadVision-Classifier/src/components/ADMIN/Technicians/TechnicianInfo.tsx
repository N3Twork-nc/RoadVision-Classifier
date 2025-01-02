import { Breadcrumb, Table } from "antd";
import avt from "../../../assets/img/defaultAvatar.png";

interface TaskType {
  task_id: number;
  description: string;
}

interface DataType {
  key: React.Key;
  username: string;
  fullname: string;
  joindate: string;
  avatar: string;
  tasks: TaskType[]; // Thêm danh sách tasks
}

interface AllTechniciansProps {
  technician: DataType;
  onBack: () => void;
}

export default function TechnicianInfo({
  technician,
  onBack,
}: AllTechniciansProps) {
  const technicianInfo = technician.tasks.map(
    (technicianInfo: any, index: number) => ({
      key: index,
      ward: technicianInfo.ward_name,
      status: technicianInfo.status,
      province: technicianInfo.province_name,
      district: technicianInfo.district_name,
      deadline: technicianInfo.deadline,
    })
  );
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as "center",
    },
    {
      title: "Ward",
      dataIndex: "ward",
      key: "deadline",
      align: "center" as "center",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      align: "center" as "center",
    },
    {
      title: "Province",
      dataIndex: "province",
      key: "province",
      align: "center" as "center",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      align: "center" as "center",
    },

  ];
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

      {/* Danh sách tasks */}
      <div className="w-[95%] bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Assigned Tasks</h3>
        {technician.tasks && technician.tasks.length > 0 ? (
          <Table
          dataSource={technicianInfo}
          columns={columns}
          rowClassName="cursor-pointer"          
          pagination={{ pageSize: 10 }}
        />
        ) : (
          <p className="text-gray-500">No tasks assigned.</p>
        )}
      </div>
    </div>
  );
}
