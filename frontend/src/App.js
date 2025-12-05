import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import {
  TeacherDashboard,
  HomeLayout,
  Landing,
  Login,
  Logout,
  Register,
  Nav,
  NewSession,
  StudentDashboard,
  ForgotPassword,
} from "./pages/Index";
import DashboardLayout from "./pages/DashboardLayout";

import Profile from "./pages/Profile";
import AttendanceReport from "./pages/AttendanceReport";
import Settings from "./pages/Settings";

// Helper: Check user login state safely
const isLoggedIn = () => !!localStorage.getItem("token");
const userType = () => localStorage.getItem("type");

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Landing /> },

      // PUBLIC ROUTES
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },

      // SAFE DASHBOARD REDIRECT
      {
        path: "dashboard",
        element: isLoggedIn() ? (
          <Navigate to={userType() === "teacher" ? "/teacher-dashboard" : "/student-dashboard"} />
        ) : (
          <Navigate to="/login" />
        ),
      },

      // DASHBOARDS
      {
        path: "teacher-dashboard",
        element: isLoggedIn() ? <TeacherDashboard /> : <Navigate to="/login" />,
      },
      {
        path: "student-dashboard",
        element: isLoggedIn() ? <StudentDashboard /> : <Navigate to="/login" />,
      },

      // NEW ROUTES YOU ADDED
     {
  path: "profile",
  element: isLoggedIn() ? (
    <DashboardLayout title="Your Profile">
      <Profile />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  ),
},

{
  path: "attendance-report",
  element: isLoggedIn() ? (
    <DashboardLayout title="Attendance Report">
      <AttendanceReport />
    </DashboardLayout>
  ) : (
    <Navigate to="/login" />
  ),
},
      {
        path: "settings",
        element: isLoggedIn() ? <Settings /> : <Navigate to="/login" />,
      },

      // SESSION CREATION
      {
        path: "create-session",
        element: isLoggedIn() ? <NewSession /> : <Navigate to="/login" />,
      },

      // LOGOUT
      { path: "logout", element: <Logout /> },

      // 404
      { path: "*", element: <h1>404 Not Found</h1> },
    ],
  },
]);

function App() {
  return (
    <div>
      <Nav />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
