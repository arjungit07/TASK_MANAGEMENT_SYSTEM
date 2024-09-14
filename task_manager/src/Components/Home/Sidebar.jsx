import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { logout } from "../../redux/userslice";
import { useDispatch } from "react-redux";


const Sidebar = ({ activeTab, handleTabClick }) => {
  const data = [
    { title: "All Tasks", icon: <CgNotes /> },
    { title: "Important Tasks", icon: <MdLabelImportant /> },
    { title: "Completed Tasks", icon: <FaCheckDouble /> },
    { title: "Pending Tasks", icon: <TbNotebookOff /> },
  ];

   const dispatch = useDispatch();

  // useEffect(() => {

  //   renderContent()

  // }, [activeTab])

   const logoutUser = () => {
     localStorage.removeItem("token");
     window.location.reload(); // Reload the page to reflect the logout
     dispatch(logout());
   };


  return (
    <div className="flex flex-col  h-full gap-4 p-4 text-white">
      <h2 className="text-xl font-semibold text-center mb-6">
        Task Categories
      </h2>
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex items-center p-2 rounded-lg gap-2 transition-all duration-300 cursor-pointer ${
            activeTab === item.title
              ? "bg-gray-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => handleTabClick(item.title)}
        >
          {item.icon}
          <span>{item.title}</span>
        </div>
      ))}

      <div className="flex-grow"></div>

      <div className="mt-auto">
        <button
          className="flex w-full items-center justify-center p-2 bg-red-400 text-white rounded-lg cursor-pointer hover:bg-red-700 transition duration-300"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
