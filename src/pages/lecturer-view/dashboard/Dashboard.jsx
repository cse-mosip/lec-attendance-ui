import DashboardCard from "../../../components/card/dashboardCard";
import DashboardTable from "../../../components/dashboard-table/dashboard-table";
import React from "react";
import {useEffect} from "react";
import { getAllLectures } from "../../../services/LecturerServices";
import { currentLectureDetails } from "../../../services/DashboardServices";
import SideNav from "../../../components/navbar/SideNav"

export default function Dashboard() {

    const [data, setData] = React.useState([]);
    const [cardTitle, setCardTitle] = React.useState([]);
    const [flag,setFlag] =React.useState(false);
    

    useEffect(() => {

        const getCurrentLectureDetails = async () => {
            const response = await currentLectureDetails();
            const temp = response.data.data[0];
            if (response.data.data.length > 0) {
                // console.log("tetete", response)
                setData(temp);
                setCardTitle("ONGOING")
                localStorage.setItem("lectureId", temp?.id)
                setFlag(true);
             
            } else {
                const response_ = await getAllLectures()
                const temp_ =  response_.data.data[0];
                setData(temp_);
                setCardTitle("LATEST")
                localStorage.setItem("lectureId", temp_?.id)
                setFlag(true);
            
            }
        }
        getCurrentLectureDetails();
        
    }, []);

    return (
        <>
        <SideNav/>
        <div className="page-container" style={{marginLeft: '100px', marginTop: '50px'}}>
            <div className="content-wrap">
                {flag &&
                <DashboardCard data={data} cardTitle={cardTitle} />
                }
                { flag &&
                <DashboardTable />
                }
            </div>
        </div>
        </>

    )
}