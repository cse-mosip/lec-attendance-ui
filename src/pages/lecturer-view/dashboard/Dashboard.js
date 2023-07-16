import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {

  const [attedance, setAttendace] = useState([]);
  const [totParticipant, setTotParticipant] = useState(0);

  // to load all the data before render
  useEffect(() => {
    getTotParticipant
  }, []);

  useEffect(() => {
    getAttendance
  }, []);


  const getTotParticipant = (event) => {
    axios.get("back_end_url/{Lec_Unique_id}").then(
      (response) => {
        if (response.ok){
          return response.json();
        } else {
          throw new Error("Error while loading data");
        }
      }
    ).then(
      (data)=>{
        if(data.status === "success"){
          const lectureTotal = data.data.lecture.allStudents.length;
          setTotParticipant(lectureTotal);
        }
      }
    )
  }

  const getAttendance = (event) => {
    axios.get("back_end_url/{Lec_Unique_id}").then(
      (response) => {
        if (response.ok){
          return response.json();
        } else{
          throw new Error("Error while loading data");
        }
      }
    ).then(
      (data)=>{
        if(data.status === "success"){
          const lectureAttendance = data.data;
          setAttendace(lectureAttendance);
        }
      }
    )
  }

  return (
    <div>
    </div>
  );
}

export default Dashboard;
