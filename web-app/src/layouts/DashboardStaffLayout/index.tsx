import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";

function DashboardStaffLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar cố định chiều rộng */}
      <Sidebar>
        <Outlet />
      </Sidebar>

      {/* Content chiếm toàn bộ phần còn lại */}
    </div>
  );
}

export default DashboardStaffLayout;
