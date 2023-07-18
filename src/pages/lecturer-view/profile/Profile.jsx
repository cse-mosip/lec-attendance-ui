import React from "react";
import SideNav from "../../../components/navbar/Navbar";
import LecturerProfile from "../../lecture-profile/LectureProfile";
const Profile = () => {
  return (
  
      <div
        className="page-container"
        style={{ marginLeft: "100px", marginTop: "50px" }}
      >
        <div className="content-wrap">
          <LecturerProfile />
        </div>
      </div>
    
  );
};

export default Profile;
