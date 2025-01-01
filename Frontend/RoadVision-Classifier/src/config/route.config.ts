import { AdminPageEnum, PageEnum, TechnicianPageEnum } from "../defination/enums/page.enum";
import Home from "../pages/User/Home/Home";
import PublicMap from "../pages/User/PublicMap/PublicMap";
import Profile from "../pages/User/Profile/Profile";
import MapManagement from "../pages/User/MapManagement/MapManagement";
import MyLibrary from "../pages/User/MyLibrary/MyLibrary";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import UsersManagement from "../pages/Admin/Users/UsersManagement";
import TechniciansManagement from "../pages/Admin/Technicians/TechniciansManagement";
import DashboardTechnician from "../pages/Technician/Dashboard/Dashboard";
import TaskManagement from "../pages/Technician/TaskManagement/TaskManagement";
export const routesConfig = [
  // Routes for user role
  {
    role: "user",
    routes: [
      { path: PageEnum.HOME, element: {Home} },
      { path: PageEnum.PUBLIC_MAP, element: {PublicMap} },
      { path: PageEnum.PROFILE, element: {Profile}},
      { path: PageEnum.MAPMANAGEMENT, element: {MapManagement} },
      { path: PageEnum.LIBRARY, element: {MyLibrary} },
    ],
  },
  // Routes for admin role
  {
    role: "admin",
    routes: [
      { path: AdminPageEnum.DASHBOARD, element: {Dashboard} },
      { path: AdminPageEnum.USER_MANAGEMENT, element: {UsersManagement} },
      { path: AdminPageEnum.TECHNICIAN_MANAGEMENT, element: {TechniciansManagement} },
    ],
  },
  // Routes for technician role
  {
    role: "technical",
    routes: [
      { path: TechnicianPageEnum.DASHBOARD, element: {DashboardTechnician} },
      { path: TechnicianPageEnum.TASK_MANAGEMENT, element: {TaskManagement} },
    ],
  },
];