import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/invalid_prohibited/NotFound";
import Dashboard from "../pages/lecturer-view/dashboard/Dashboard";
import SideNav from "../components/navbar/SideNav";
import LectureConfig from "../pages/admin-student-view/admin-config-page/lecture-config";

function Router() {
  return (
    <>
      <SideNav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lecture-config" element = {<LectureConfig/>} />
          {/* Invalid && prohibited routes  */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
