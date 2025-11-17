import React, { StrictMode, Suspense, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

// Import global styles và variables
import "./styles/variables.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound/index.tsx";

// import { requireAuth, requireRole } from "./utils/auth.ts";
import SwapTransactions from "./pages/Staff/TransactionManagement/SwapTransaction.tsx";
import { ProgressDemo } from "./components/ui/ProgressRadix.tsx";
import { requireRole, testAuth } from "./utils/auth.ts";
import { AuthProvider } from "./contexts/AuthProvider.tsx";

const NotPermission = React.lazy(() => import("./pages/NotPermission"));
const HomeLayout = React.lazy(() => import("./layouts/HomeLayout"));
const DashboardStaffLayout = React.lazy(
  () => import("./layouts/DashboardStaffLayout")
);
const DashboardLayout = React.lazy(() => import("./layouts/DashboardLayout"));

const HomePage = React.lazy(() => import("./pages/Home"));
const StationPage = React.lazy(
  () => import("./pages/Stations/StationDetail.tsx") // các thông tin chi tiết trạm(coi như trang trạm của user[ai cung có thể xem được])
);
const DashboardPage = React.lazy(() => import("./pages/Dashboard")); // nên tách ra
const StationAdminPage = React.lazy(() => import("./pages/StationAdmin"));
const UserAdmin = React.lazy(() => import("./pages/ManageUser"));
const Support = React.lazy(() => import("./pages/Support/index.tsx")); // chưa rõ thông tin lắm, cần chia role rõ ràng hơn
const ReportAdmin = React.lazy(() => import("./pages/ReportAdmin")); // báo cáo dành cho admin
const ManagePackage = React.lazy(() => import("./pages/PackageAdmin")); // quản lí gói dịch vụ
// const TransactionManagement = React.lazy(
//   () => import("./pages/Staff/TransactionManagement/SwapTransaction.tsx")        // xóa tạm để build docker, ông nào cần thì mở lại
// );
const StationStaff = React.lazy(
  () => import("./pages/Staff/StationStaff/index.tsx")
); // trang quản lí trạm dành cho nhân viên
const InventoryStaff = React.lazy(
  () => import("./pages/Staff/ManageBattery/index.tsx")
); // trang quản lí kho pin dành cho nhân viên
const ReportStaff = React.lazy(() => import("./pages/Staff/ReportStaff")); // trang báo cáo cho trạm
const DashboardStaff = React.lazy(
  () => import("./pages/Staff/DashboardStaff/DashboardStaff.tsx")
); // trang dashboard dành cho nhân viên
const MyInfo = React.lazy(() => import("@/pages/MyInfo"));

const withSuspense = (el: ReactNode) => (
  <Suspense
    fallback={
      <div className="justify-center items-center p-6 w-100">
        <ProgressDemo />
        <div>Đang tải...</div>
      </div>
    }
  >
    {el}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/admin",
    loader: requireRole(["ADMIN"]),
    element: withSuspense(<DashboardLayout />),
    errorElement: withSuspense(<NotFound role="ADMIN" />),
    children: [
      // các trang con năm trong layout Dashboard
      {
        index: true,
        element: withSuspense(<DashboardPage />),
      },
      {
        path: "stations",
        element: withSuspense(<StationAdminPage />),
      },
      {
        path: "accounts",
        element: withSuspense(<UserAdmin />),
      },
      {
        path: "packages",
        element: withSuspense(<ManagePackage />),
      },
      {
        path: "supports",
        element: withSuspense(<Support />),
      },
      {
        path: "reports",
        element: withSuspense(<ReportAdmin />),
      },
      {
        path: "my-info",
        element: withSuspense(<MyInfo />),
      },
    ],
  },
  {
    path: "/staff",
    loader: requireRole(["STAFF"]),
    element: withSuspense(<DashboardStaffLayout />),
    errorElement: withSuspense(<NotFound role="STAFF" />),
    children: [
      // các trang con năm trong layout Dashboard
      {
        index: true,
        element: withSuspense(<DashboardStaff />), // đợt sau sửa lại trang dashboard riêng cho staff || đã sửa
      },
      {
        path: "stations",
        element: withSuspense(<StationStaff />),
      },

      {
        path: "transaction-management", //
        element: withSuspense(<SwapTransactions />),
      },

      {
        path: "battery-inventory",
        element: withSuspense(<InventoryStaff />),
      },

      {
        path: "reports", //báo cáo của nhận(có thể xuất báo cáo)
        element: withSuspense(<ReportStaff />),
      },
      {
        path: "my-info",
        element: withSuspense(<MyInfo />),
      },
    ],
  },
  {
    path: "/",
    loader: testAuth,
    element: withSuspense(<HomeLayout />),
    errorElement: withSuspense(<NotFound />),
    // loader: requireAuth,
    children: [
      //các màn hình con trong trang home
      {
        index: true,
        element: withSuspense(<HomePage />),
      },
      {
        path: "stationDetail",
        element: withSuspense(<StationPage />),
      },
    ],
  },
  {
    path: "not-permission",
    element: withSuspense(<NotPermission />),
  },
  { path: "*", element: withSuspense(<NotFound />) },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
