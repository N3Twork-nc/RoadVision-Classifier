import { AppLayout } from "../../../components/ADMIN/Common/AppLayout";
import DashboardComponent from "../../../components/ADMIN/Dashboard/DashboardComponent";
const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col p-5 gap-5 justify-start items-center overflow-y-auto">
        <DashboardComponent />
      </div>
    </AppLayout>
  );
};

export default Dashboard;
