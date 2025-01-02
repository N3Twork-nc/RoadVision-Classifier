import React, { useState } from "react";
import { AppLayout } from "../../../components/ADMIN/Common/AppLayout";
import AllTechnicians from "../../../components/ADMIN/Technicians/AllTechnicians";
import TechnicianInfo from "../../../components/ADMIN/Technicians/TechnicianInfo";
import homeheader from "../../../assets/img/TECHNICIAN-header.png";
import mask from "../../../assets/img/mask.png";

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
        <div className="flex flex-row w-[100%] h-44 rounded-2xl bg-[#2D82C6] justify-between relative">
          <img
            src={mask}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
          />

          <div className="relative z-100 w-full flex xl:flex-row justify-between">
            {/* content */}
            <div className="flex flex-col p-10 justify-between">
              <div>
                <p className="text-4xl font-bold text-white">
                  All Technicians management
                </p>
                <p className="text-white">
                  Let's take a look at the overall statistics.
                </p>
              </div>
              <div className="flex flex-row gap-4"></div>
            </div>
            {/* image */}
            <img
              src={homeheader}
              className="xl:h-full xl:block hidden mr-10 "
            />
          </div>
        </div>
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
