import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form, Input } from "antd";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/admin/accountState";
import { FaUser } from "react-icons/fa";
import technicianprofileService from "../../../services/technicianprofile.service";

interface DataType {
  key: React.Key;
  location: string;
  status: string;
  deadline: string;
  ward_id: number;
}

interface AllUserProps {
  onViewUserInfo: (user: DataType) => void;
}

export default function AllStreetComponent({ onViewUserInfo }: AllUserProps) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setRecoilProfile] = useRecoilState<any>(userState);

  const fetchAllRoadsTask = async () => {
    setLoading(true);
    try {
      const response = await technicianprofileService.getAllTask({});
      const taskArray = Array.isArray(response) ? response : response.data;
  
      const tasks = taskArray.map((task: any) => ({
        key: task.task_id,  
        ward_id: task.ward_id,
        location: task.location, 
        status: task.status,     
        deadline: task.deadline,
        summary: `Fixed ${task.road_done}/${task.all_road} roads`,
      }));
  
      console.log(tasks); 
      setDataSource(tasks); 
      setRecoilProfile(tasks); 
    } catch (error) {
      console.error("Không thể lấy danh sách task của technician!", error);
    } finally {
      setLoading(false);
    }
  };
      
  useEffect(() => {
    fetchAllRoadsTask();
  }, []);

  const columns = [
    {
      title: "Address",
      dataIndex: "location", 
      key: "location",
      align: "center" as "center",
    },
    {
      title: "Status",
      dataIndex: "status", 
      key: "status",
      align: "center" as "center",
    },
    {
      title: "Due Date",
      dataIndex: "deadline", 
      key: "deadline",
      align: "center" as "center",
    },
    {
      title: "Summary",
      dataIndex: "summary", 
      key: "summary",
      align: "center" as "center",
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-start items-center overflow-y-auto">
      <div className="w-full p-5 bg-white rounded-lg shadow-md">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row items-center gap-2">
            <FaUser color="#3B82F6" size={20} />
            <h1 className="text-2xl text-blue-500 font-bold">All Roads need to fix</h1>
          </div>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          onRow={(record) => ({
            onClick: () => onViewUserInfo(record),
          })}
          rowClassName="cursor-pointer"
        />
      </div>
    </div>
  );
}
