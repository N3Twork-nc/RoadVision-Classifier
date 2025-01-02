import React, { useState } from "react";
import { AppLayout } from "../../../components/ADMIN/Common/AppLayout";
import AllUser from "../../../components/ADMIN/Users/AllUser";
import UserInfo from "../../../components/ADMIN/Users/UserInfo";
import RoadDetails from "../../../components/ADMIN/Users/RoadDetails";
import { useRecoilState } from "recoil";
import { userState } from "../../../atoms/admin/accountState";
import homeheader from "../../../assets/img/USER-header.png";
import mask from "../../../assets/img/mask.png";

const UsersManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    "allUsers" | "userInfo" | "roadDetails"
  >("allUsers");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [currentRoad, setCurrentRoad] = useState<any>(null);
  const [userinf, setUser] = useRecoilState(userState);

  // VIEW USER INFO
  const handleViewUserInfo = (user: any) => {
    setSelectedUser(user);
    setUser(user);
    setCurrentView("userInfo");
  };

  const handleBackToAllUsers = () => {
    setCurrentView("allUsers");
  };

  // VIEW ROAD DETAILS
  const handleViewRoadDetails = (road: any) => {
    setCurrentRoad(road);
    setCurrentView("roadDetails");
  };

  const handleBackToUserInfo = () => {
    setCurrentView("userInfo");
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
                <p className="text-4xl font-bold text-white">All Users management</p>
                <p className="text-white">
                  Thanks to the community of contributors!
                </p>
              </div>
              <div className="flex flex-row gap-4"></div>
            </div>
            {/* image */}
            <img
              src={homeheader}
              className="xl:h-full xl:block hidden mt-5 mr-10 "
            />
          </div>
        </div>
        {currentView === "allUsers" && (
          <AllUser onViewUserInfo={handleViewUserInfo} />
        )}
        {currentView === "userInfo" && (
          <UserInfo
            user={selectedUser}
            onBack={handleBackToAllUsers}
            onViewRoadDetails={handleViewRoadDetails}
          />
        )}
        {currentView === "roadDetails" && (
          <RoadDetails
            user={userinf}
            road={currentRoad}
            onBackToUsers={handleBackToAllUsers}
            onBackToUserInfo={handleBackToUserInfo}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default UsersManagement;
