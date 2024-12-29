import React, { useState } from "react";
import { AppLayout } from "../../../components/ADMIN/Common/AppLayout";
import AllUser from "../../../components/ADMIN/Users/AllUser";
import UserInfo from "../../../components/ADMIN/Users/UserInfo";

const UsersManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<"allUsers" | "userInfo">("allUsers");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleViewUserInfo = (user: any) => {
    setSelectedUser(user);
    setCurrentView("userInfo"); 
  };

  const handleBackToAllUsers = () => {
    setCurrentView("allUsers"); 
  };

  return (
    <AppLayout>
      <div className="p-4 bg-gray-50">
        {currentView === "allUsers" ? (
          <AllUser onViewUserInfo={handleViewUserInfo} />
        ) : (
          <UserInfo user={selectedUser} onBack={handleBackToAllUsers} />
        )}
      </div>
    </AppLayout>
  );
};

export default UsersManagement;
