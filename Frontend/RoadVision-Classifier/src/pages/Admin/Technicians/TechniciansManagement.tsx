import React, { useState } from "react";
import { AppLayout } from "../../../components/ADMIN/Common/AppLayout";
import AllTechnicians from "../../../components/ADMIN/Technicians/AllTechnicians";
import TechnicianInfo from "../../../components/ADMIN/Technicians/TechnicianInfo";




const TechniciansManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<"allTechnicians" | "technicianInfo">("allTechnicians");
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
      <div className="p-4 bg-gray-50">
        {currentView === "allTechnicians" ? (
          <AllTechnicians onViewTechnicianInfo={handleViewTechnicianInfo} />
        ) : (
          <TechnicianInfo technician={selectedTechnician} onBack={handleBackToAllTechnicians} />
        )}
      </div>
    </AppLayout>
  );
};

export default TechniciansManagement;
