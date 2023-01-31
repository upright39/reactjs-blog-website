import { React, useState } from 'react'
import '../../assets/admin/css/styles.css'
import { Outlet } from "react-router-dom";
import Footer from './Footer'
import Navber from './Navber';
import SideBer from './SideBer';


function MasterLayout() {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className="sb-nav-fixed">
      <Navber setsidebar={setSidebar} sidebar={sidebar} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav" className={`${sidebar ? 'sb-sidenav-toggled' : null}`}>
          <SideBer />
        </div>

        <div id="layoutSidenav_content">
          <main>
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MasterLayout
