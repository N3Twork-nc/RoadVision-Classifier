import { useState } from "react";
import { AppLayout } from "../../../components/TECHNICIAN/Common/AppLayout";
import TaskManagementComponent from "../../../components/TECHNICIAN/TaskManagement/TaskManagementComponent";
import { useRecoilState } from "recoil";
import { technicianState } from "../../../atoms/admin/accountState";
import AllStreetComponent from "../../../components/TECHNICIAN/TaskManagement/AllStreetComponent";

export default function TaskManagement() {
  const [currentView, setCurrentView] = useState<"allRoads" | "detailTask" >("allRoads");
    const [selectedRoad, setSelectedRoad] = useState<any>(null);
    const [userinf, setUser] = useRecoilState(technicianState);
    const handleBackToAllUsers = () => {
      setCurrentView("allRoads");
    };
    const handleViewRoadDetails = (road: any) => {
      setCurrentView(road); 
      setCurrentView("detailTask");
    };
    const handleBackToAllRoad = () => {
      setCurrentView("allRoads");
    };
  return (
    <AppLayout>
       <div className="p-4 bg-gray-50">
        {currentView === "allRoads" && (
          <AllStreetComponent onViewUserInfo={handleViewRoadDetails} />
        )}
        {currentView === "detailTask" && (
          <TaskManagementComponent
            road={selectedRoad} 
            onBack={handleBackToAllRoad}
            onViewRoadDetails={handleViewRoadDetails} 
          />
        )}
        </div>
    </AppLayout>
  );
}


