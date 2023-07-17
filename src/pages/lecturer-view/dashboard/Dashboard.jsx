import DashboardCard from "../../../components/card/dashboardCard";
import DashboardTable from "../../../components/dashboard-table/dashboard-table";
import React from "react";
export default function Dashboard() {
    return (
        <div className="page-container" style={{marginLeft: '100px', marginTop: '50px'}}>
            <div className="content-wrap">
                <DashboardCard/>
                <DashboardTable/>
            </div>
        </div>

    )
}