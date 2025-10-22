import React, { StrictMode, Suspense, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Import global styles và variables
import "./styles/variables.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound/index.tsx";

import { AuthProvider } from "./contexts/AuthContext.tsx";
import { requireAuth } from "./utils/auth.ts";

const HomeLayout = React.lazy(() => import("./layouts/HomeLayout"));
const DashboardStaffLayout = React.lazy(
  () => import("./layouts/DashboardStaffLayout")
);

const HomePage = React.lazy(() => import("./pages/Home"));
const StationPage = React.lazy(
  () => import("./pages/Stations/StationDetail.tsx")
);
const DashboardPage = React.lazy(() => import("./pages/Dashboard"));
const StationAdminPage = React.lazy(() => import("./pages/StationAdmin"));
const UserAdmin = React.lazy(() => import("./pages/ManageUser"));
const Support = React.lazy(() => import("./pages/Support/index.tsx"));
const ReportAdmin = React.lazy(() => import("./pages/ReportAdmin"));
const TransactionManagement = React.lazy(
  () => import("./pages/TransactionManagement")
);
const StationStaff = React.lazy(() => import("./pages/StationStaff"));
const ReportStaff = React.lazy(() => import("./pages/ReportStaff"));

const withSuspense = (el: ReactNode) => (
  <Suspense fallback={<div className="p-6">Loading…</div>}>{el}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/admin",
    loader: requireAuth,
    element: withSuspense(<App />),
    errorElement: withSuspense(<NotFound />),
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
        path: "supports",
        element: withSuspense(<Support />),
      },
      {
        path: "reports",
        element: withSuspense(<ReportAdmin />),
      },
    ],
  },
  {
    path: "/staff",
    loader: requireAuth,
    element: withSuspense(<DashboardStaffLayout />),
    errorElement: withSuspense(<NotFound />),
    children: [
      // các trang con năm trong layout Dashboard
      {
        index: true,
        element: withSuspense(<DashboardPage />),   // đợt sau sửa lại trang dashboard riêng cho staff
      },
      {
        path: "stations", //quản lí trạm xem tồn kho pin
        element: withSuspense(<StationStaff />),
      },

      {
        path: "transaction-management",
        element: withSuspense(<TransactionManagement />),
      },
      {
        path: "reports", //báo cáo này là báo cáo nhà hàng thôi
        element: withSuspense(<ReportStaff />),
      },
    ],
  },
  {
    path: "/",
    element: withSuspense(<HomeLayout />),
    errorElement: withSuspense(<NotFound />),
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
  { path: "*", element: withSuspense(<NotFound />) },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
