import { Breadcrumb, Table } from "antd";
import avt from "../../../assets/img/nct.png";
import { useEffect, useState } from "react";
import manageAlluserService from "../../../services/manageAlluser.service";
import { RoadDataType } from "../../../defination/types/alluser.type";

interface DataType {
  key: React.Key;
  user_id: number;
  username: string;
  fullname: string;
  joindate: string;
  contribution: number;
  avatar: string;
}
interface AllUserProps {
  user: DataType;
  onBack: () => void;
}

const columns = [
  {
    title: "Road ID",
    dataIndex: "road_id",
    key: "road_id",
  },
  {
    title: "Image",
    dataIndex: "road_image",
    key: "road_image",
    render: (text: string) => (
      <img
        src={text}
        alt="Road"
        style={{ width: "80px", height: "50px", objectFit: "cover" }}
      />
    ),
  },
  {
    title: "Type",
    dataIndex: "road_type",
    key: "road_type",
  },
  {
    title: "Date Created",
    dataIndex: "road_time",
    key: "road_time",
  },
  {
    title: "Location",
    dataIndex: "road_location",
    key: "road_location",
  },
];

export default function UserInfo({ user, onBack }: AllUserProps) {
  const [dataSource, setDataSource] = useState<RoadDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchAllRoads = async () => {
    setLoading(true);
    try {
      const response = await manageAlluserService.getAllRoadInfo(user.user_id);

      const roads = response.data.map((roadData: string) => {
        const road = JSON.parse(roadData);
        return {
          key: road.id,
          road_id: road.id,
          road_image: road.filepath,
          road_type: road.level,
          road_time: road.created_at,
          road_location: road.location,
        };
      });

      console.log("roads", roads);

      setDataSource(roads || []);
    } catch (error) {
      console.log("Không thể lấy danh sách đường!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRoads();
  }, [user.user_id]);

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
            title: user.username || "User Info",
          },
        ]}
      />
      <div className="relative flex flex-row gap-5 w-[95%] h-48 px-10 rounded-2xl bg-[#3749A6] justify-between items-center">
        <div className="absolute bg-white rounded-full w-36 h-36 flex justify-center items-center">
          <img
            src={user.avatar || avt}
            alt="Avatar"
            className="w-[95%] h-[95%] object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col justify-between ml-40">
          <div className="text-white font-bold text-2xl">
            {user.fullname || ""}
          </div>
          <div className="text-white font-normal text-base">
            {user.username || ""}
          </div>
          <div className="text-white font-normal text-base">
            Contribution: {user.contribution || ""}
          </div>
        </div>
      </div>
      <div className="w-[95%] bg-white p-5 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Roads Information</h2>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 5 }}
          rowKey="road_id"
        />
      </div>
    </div>
  );
}
