import {AppLayout} from "../../../components/ADMIN/Common/AppLayout";
import AllUser from "../../../components/ADMIN/Users/AllUser";
import UserInfo from "../../../components/ADMIN/Users/UserInfo";
const UsersManagement: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-4 bg-gray-50">
        <AllUser />
        {/* <UserInfo /> */}
      </div>
    </AppLayout>
  );
};

export default UsersManagement;
