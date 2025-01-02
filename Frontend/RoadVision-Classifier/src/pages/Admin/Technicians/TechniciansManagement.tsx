import React, { useState } from "react";
import { AppLayout } from "../../../components/ADMIN/Common/AppLayout";
import AllTechnicians from "../../../components/ADMIN/Technicians/AllTechnicians";
import TechnicianInfo from "../../../components/ADMIN/Technicians/TechnicianInfo";


const TechniciansManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "allTechnicians" | "technicianInfo"
  >("allTechnicians");
  const [selectedTechnician, setselectedTechnician] = useState<any>(null);
  const handleViewTechnicianInfo = (user: any) => {
    setselectedTechnician(user);
    setCurrentView("technicianInfo");
  };

  const handleBackToAllTechnicians = () => {
    setCurrentView("allTechnicians");
  };

  return (
    <AppLayout>
      <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col p-5 gap-5 justify-start items-center overflow-y-auto">        
        {currentView === "allTechnicians" ? (
          <AllTechnicians onViewTechnicianInfo={handleViewTechnicianInfo} />
        ) : (
          <TechnicianInfo
            technician={selectedTechnician}
            onBack={handleBackToAllTechnicians}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default TechniciansManagement;
