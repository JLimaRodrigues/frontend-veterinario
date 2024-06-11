import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import MainContent from '../components/MainContent';

function Admin() {
    return (
        <div className="flex h-screen">
        <SideBar />
            <div className="flex flex-col flex-1">
                <TopBar />
                <MainContent />
            </div>
        </div>
    )
  }
  
  export default Admin