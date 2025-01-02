import { useRecoilValue } from "recoil";
import avatar from "../../../assets/img/defaultAvatar.png";
import { accountState } from "../../../atoms/authState";
import { Table, Tag } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
const dataSource = [
  {
    key: "1",
    task_id: "1",
    road_image: "https://i.imgur.com/7e8y6V9.jpg",
    task_street: "Nguyen Van Linh",
    task_deadline: "2022-12-12",
    task_status: "In progress",
    task_note: "",
  },
  {
    key: "2",
    task_id: "2",
    road_image: "https://i.imgur.com/7e8y6V9.jpg",
    task_street: "Nguyen Van Linh",
    task_deadline: "2022-12-12",
    task_status: "In progress",
    task_note: "",
  },
];
const columns = [
  {
    title: "Task ID",
    dataIndex: "task_id",
    key: "task_id",
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
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
    title: "Street",
    dataIndex: "task_street",
    key: "task_street",
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
        "Done": "green",
        "Not start": "gray",
       
      };
      return <Tag color={colorMap[text] || "default"}>{text}</Tag>;
    },
  },
  {
    title: "Note",
    dataIndex: "task_status",
    key: "task_status",
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
export default function TaskManagementComponent() {
  const technicianInfo = useRecoilValue(accountState);
  return (
    <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col gap-5 justify-start items-center overflow-y-auto">
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
        pagination={{ pageSize: 5 }}
        rowKey="task_id"
        className="w-[95%] bg-white p-5 rounded-2xl shadow-md"
      />
    </div>
  );
}
