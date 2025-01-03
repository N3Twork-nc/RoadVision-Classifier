import { Breadcrumb } from "antd";

interface AllTaskDetailProps {
  task: any;
  technician: any;
  onBackToTechnicianInfo: () => void;
  onBackToAllTechnicians: () => void;
}

const DetailRoadsTask = ({
  task,
  technician,
  onBackToTechnicianInfo,
  onBackToAllTechnicians,
}: AllTaskDetailProps) => {
  return (
    <div className="w-full h-full flex flex-col gap-5 justify-start items-center overflow-y-auto">
      <Breadcrumb
        className="w-full justify-start "
        separator=">"
        items={[
          {
            title: "All Technicians",
            onClick: onBackToAllTechnicians,
            className: "cursor-pointer",
          },
          {
            title: technician.username || "Technician Info",
            onClick: onBackToTechnicianInfo,
            className: "cursor-pointer",
          },
          {
            title: `Task ID: ${task.task_id}` || "Task Info",
            className: "text-[#23038C]",
          },
        ]}
      />
      <div className="flex flex-col gap-5 w-full  bg-white rounded-lg shadow-md">
        <div className="w-full bg-[#23038C] text-white py-4 px-10 rounded-lg shadow-md flex justify-between items-center">
          <h2 className="text-3xl font-bold">Road Details</h2>
          <p className="text-lg font-light">
            Comprehensive information about the selected road
          </p>
        </div>
        <div className="w-full px-20">
          <p>
            <strong className="text-[#23038C]">Road ID:</strong> 
          </p>
          <p>
            <strong className="text-[#23038C]">Type:</strong>
          </p>
          <p>
            <strong className="text-[#23038C]">Location:</strong>{" "}
          
          </p>
          <p>
            <strong className="text-[#23038C]">Latitude:</strong>{" "}
         
          </p>
          <p>
            <strong className="text-[#23038C]">Longitude:</strong>{" "}
           
          </p>
          <p>
            <strong className="text-[#23038C]">Status:</strong>{" "}
          
          </p>
          <p>
            <strong className="text-[#23038C]">Date Uploaded:</strong>{" "}
          
          </p>
        </div>
        <div className="w-full flex px-20 py-5 flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <img
             
              alt="Road"
              style={{
                objectFit: "cover",
                display: "block",
                border: "3px solid #f1f1ff",
              }}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          
        </div>
      </div>
      <div className="w-full flex justify-end">
        
      </div>
    </div>
  );
};

export default DetailRoadsTask;
