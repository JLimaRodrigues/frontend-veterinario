import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import MainContent from '../components/MainContent';

const Admin: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {isSidebarOpen && <SideBar />}
      <div className="flex flex-col flex-1">
        <TopBar />
        <MainContent />
      </div>
    </div>
  );
  }
  
  export default Admin