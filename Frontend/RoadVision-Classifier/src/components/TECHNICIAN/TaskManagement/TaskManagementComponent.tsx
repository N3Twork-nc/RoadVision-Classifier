import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import avatar from "../../../assets/img/defaultAvatar.png";
import { accountState } from "../../../atoms/authState";
import { Breadcrumb, Table, Tag } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import technicianService from "../../../services/technicianprofile.service";

interface RoadDetailsProps {
  road: any;
  onBack: () => void;
  onViewRoadDetails: (road: any) => void;
}

const TaskManagementComponent: React.FC<RoadDetailsProps> = ({
  onBack,
  onViewRoadDetails,
}) => {
  const technicianInfo = useRecoilValue(accountState);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasksAndRoads = async () => {
    setLoading(true);
    try {
      const tasksResponse = await technicianService.getAllTask({});
      const tasks = Array.isArray(tasksResponse) ? tasksResponse : tasksResponse.data;
  
      const data = await Promise.all(
        tasks.map(async (task: any) => {
          const roadResponse = await technicianService.getAllRoad(task.ward_id);
          const roadArray = Array.isArray(roadResponse) ? roadResponse : roadResponse.data;
          
          const roads = roadArray.map((road: string) => JSON.parse(road));
          console.log(roads)
  
          return roads.map((road: any) => ({
            key: task.task_id,
            road_id: road.id,
            road_image: `http://192.168.120.26${road.filepath}`,
            location: road.location, 
            task_deadline: task.deadline,  
            task_status: road.status, 
            task_notes: road.notes,  
            ward_id: road.ward_id,  
          }));
        })
      );
  
      const flattenedData = data.flat();
  
      setDataSource(flattenedData);
    } catch (error) {
      console.error("Error fetching tasks and roads:", error);
    } finally {
      setLoading(false);
    }
  };
    
  useEffect(() => {
    fetchTasksAndRoads();
  }, []);

  const columns = [
    {
      title: "Road ID",
      dataIndex: "road_id",
      key: "road_id",
      width: 100,
      align: "center" as "center",
    },
    {
      title: "Image",
      dataIndex: "road_image",
      key: "road_image",
      width: 250,
      align: "center" as "center",
      render: (text: string) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <img
            src={text}
            alt="Road"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
            }}
          />
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 250,
      align: "center" as "center",
    },
    {
      title: "Due date",
      dataIndex: "task_deadline",
      key: "task_deadline",
      width: 100,
      align: "center" as "center",
    },
    {
      title: "Status",
      dataIndex: "task_status",
      key: "task_status",
      width: 100,
      align: "center" as "center",
      render: (text: string) => {
        const colorMap: { [key: string]: string } = {
          "In progress": "blue",
          Done: "green",
          "Not start": "gray",
        };
        return <Tag color={colorMap[text] || "default"}>{text}</Tag>;
      },
    },
    {
      title: "Note",
      dataIndex: "task_note",
      key: "task_note",
      width: 100,
      align: "center" as "center",
    },
    {
      title: "Action",
      align: "center" as "center",
      render: () => (
        <div>
          <button className="text-red-500">
            <AiOutlineDelete className="w-5 h-5" />
          </button>
        </div>
      ),
      width: 80,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col gap-5 justify-start items-center overflow-y-auto">
      <Breadcrumb
        className="w-full justify-start px-10"
        separator=">"
        items={[
          {
            title: "All Users",
            onClick: onBack,
            className: "cursor-pointer",
          },
          {
            title: "User Info",
            onClick: onViewRoadDetails,
            className: "cursor-pointer",
          },
        ]}
      />
      <div className="relative flex flex-row gap-5 w-[95%] h-48 px-10 rounded-2xl bg-[#3749A6] justify-between items-center">
        <div className="relative flex flex-row gap-5 w-[95%] h-48 px-10 rounded-2xl bg-[#3749A6] justify-between items-center">
          <div className="absolute bg-white rounded-full w-36 h-36 flex justify-center items-center">
            <img
              src={technicianInfo.avatar || avatar}
              alt="Avatar"
              className="w-[95%] h-[95%] object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col justify-between ml-40">
            <div className="text-white font-bold text-2xl">
              {`Username: ${technicianInfo.username || ""}`}
            </div>
            <div className="text-white font-normal text-base">
              {`ID: ${technicianInfo.id || ""}`}
            </div>
          </div>
        </div>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowKey="task_id"
        className="w-[95%] bg-white p-5 rounded-2xl shadow-md"
      />
    </div>
  );
};

export default TaskManagementComponent;
