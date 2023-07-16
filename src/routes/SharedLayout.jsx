import { Outlet } from 'react-router-dom'
import SideNav from "../components/navbar/SideNav";
import Navbar from '../components/navbar/Navbar';

const SharedLayout = () => {
  return (
    <div>
      <main className='dashboard'>
        <Navbar />
        <SideNav />
        <div>
          {/* <Navbar /> */}
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default SharedLayout
