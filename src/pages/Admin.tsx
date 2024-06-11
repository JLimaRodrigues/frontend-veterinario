import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import MainContent from '../components/MainContent';

const Admin: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {isSidebarOpen && <SideBar />}
      <div className="flex flex-col flex-1">
        <TopBar toggleSidebar={toggleSidebar} />
        <MainContent />
      </div>
    </div>
  );
  }
  
  export default Admin