import { Outlet } from 'react-router-dom'
import SideNav from "../components/navbar/SideNav";
import Navbar from '../components/navbar/Navbar';
import './SharedLayout.css'

const SharedLayout = () => {
  return (
    <div className='dashboard'>
      <Navbar />
      <div className='dashboard-content'>
        <SideNav />
        <div className='dashboard-page'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SharedLayout
