import DashboardCard from "../../../components/card/dashboardCard";
import DashboardTable from "../../../components/dashboard-table/dashboard-table";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
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