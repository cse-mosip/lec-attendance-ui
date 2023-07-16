import DashboardCard from "../../../components/card/dashboardCard";
import DashboardTable from "../../../components/dashboard-table/dashboard-table";
import {Container} from "@mui/material";


function Dashboard() {
    return (
        <div className="page-container">
            <div className="content-wrap">
                <Container>
                    <DashboardCard />
                    <DashboardTable />
                </Container>
            </div>
        </div>
    );
}
export default Dashboard;