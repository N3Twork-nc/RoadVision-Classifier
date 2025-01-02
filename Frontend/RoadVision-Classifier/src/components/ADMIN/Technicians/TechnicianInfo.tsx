import { useEffect, useState } from "react";
import { Breadcrumb, Table } from "antd";
import avt from "../../../assets/img/defaultAvatar.png";
import manageStatisticInfoService from "../../../services/manageStatisticInfo.service";

interface TaskType {
  task_id: number;
  status: string;
  ward_id: number;
  district_id: number;
  province_id: number;
  all_road: number;
  road_done: number;
  location: string;
  deadline: string;
}

interface DataType {
  key: React.Key;
  user_id: number;
  username: string;
  fullname: string;
  joindate: string;
  avatar: string;
  tasks: TaskType[];
}

interface AllTechniciansProps {
  technician: DataType;
  onBack: () => void;
}

export default function TechnicianInfo({
  technician,
  onBack,
}: AllTechniciansProps) {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await manageStatisticInfoService.getTask({
        user_id: technician.user_id,
      });
      if (Array.isArray(response)) {
        setTasks(response);
      } else {
        console.log("Is not array!:");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [technician.user_id]);

  const columns = [
    {
      title: "Task ID",
      dataIndex: "task_id",
      key: "task_id",
      align: "center" as "center",
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      align: "center" as "center",
    },
    {
      title: "Total",
      dataIndex: "all_road",
      key: "all_road",
      align: "center" as "center",
    },
    {
      title: "Done",
      dataIndex: "road_done",
      key: "road_done",
      align: "center" as "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center" as "center",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      align: "center" as "center",
      render: (text: string) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col gap-5 justify-start items-center overflow-y-auto">
      <Breadcrumb
        className="w-full justify-start "
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
      <div className="relative flex flex-row gap-5 w-[100%] h-48 px-10 rounded-2xl bg-[#3749A6] justify-between items-center">
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

      {/* Task Table */}
      <div className="w-[100%] bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Assigned Tasks</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : tasks.length > 0 ? (
          <Table
            dataSource={tasks.map((task) => ({ ...task, key: task.task_id }))}
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

