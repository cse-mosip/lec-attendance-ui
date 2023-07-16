import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/invalid_prohibited/NotFound";
import Dashboard from "../pages/lecturer-view/dashboard/Dashboard";
import SideNav from "../components/navbar/SideNav";
import LectureConfig from "../pages/admin-student-view/admin-config-page/lecture-config";
import AttendenceSheet from "../pages/lecturer-view/attendence-sheet/attendence-sheet";
import Login from "../pages/login/login";
import ProtectedRoute from "./ProtectedRoutes";
import SharedLayout from "./SharedLayout";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
          <ProtectedRoute>
            <SharedLayout/>
          </ProtectedRoute>} >
            <Route index element={<Dashboard/>}/>
            <Route path="lecture-config" element={<LectureConfig />} />
            <Route path="attendence-sheet" element={<AttendenceSheet />} />
          </Route>

          {/* Invalid && prohibited routes  */}
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
