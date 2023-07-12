import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/invalid_prohibited/NotFound";
import Dashboard from "../pages/lecturer-view/dashboard/Dashboard";
import LectureConfig from "../pages/admin-student-view/admin-config-page/lecture-config";
import AttendenceSheet from "../pages/lecturer-view/attendence-sheet/attendence-sheet";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Invalid && prohibited routes  */}
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/lecture-config" element={<LectureConfig />} />
        <Route path="/attendence-sheet" element={<AttendenceSheet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
