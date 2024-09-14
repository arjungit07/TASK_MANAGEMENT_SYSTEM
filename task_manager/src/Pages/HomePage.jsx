import React, { useState } from 'react'
import Sidebar from '../Components/Home/Sidebar';
import AllTasks from './AllTasks';
import Completed_Tasks from './Completed_Tasks';
import PendingTasks from './PendingTasks';
import Important_Tasks from './Important_Tasks';

const HomePage = () => {
   const [activeTab, setActiveTab] = useState("All Tasks");

   const handleTabClick = (tab) => {
     setActiveTab(tab);
   };

   const renderContent = () => {
     switch (activeTab) {
       case "All Tasks":
         return <AllTasks/>;
       case "Completed Tasks":
         return <Completed_Tasks />;
       case "Pending Tasks":
         return <PendingTasks />;
       case "Important Tasks":
         return <Important_Tasks />;
       default:
         return <AllTasks />; // Default fallback
     }
   };
  
   return (
     <div className="flex h-[98vh] mt-2 gap-4">
       {/* Sidebar */}
       <div className="border rounded-xl p-4 w-1/6">
         <Sidebar activeTab={activeTab} handleTabClick={handleTabClick} />
       </div>

       {/* Content Area */}
       <div className="border rounded-xl p-4 w-5/6">{renderContent()}</div>
     </div>
   );
}

export default HomePage