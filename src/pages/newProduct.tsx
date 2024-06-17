import React, { useState } from 'react';
import TopBar from '@/components/Bar/TopBar';
import SideBar from '@/components/Bar/SideBar';
import FormNewProduct from '@/components/Contents/FormNewProduct';

const NewProduct: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div className="flex h-screen">
      {isSidebarOpen && <SideBar />}
      <div className="flex flex-col flex-1">
        <TopBar toggleSidebar={toggleSidebar} />
        <FormNewProduct />
      </div>
    </div>
  );
  }
  
  export default NewProduct