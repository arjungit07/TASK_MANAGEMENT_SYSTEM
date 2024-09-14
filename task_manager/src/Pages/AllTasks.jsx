import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/tasksSlice";
import Cards from "../Components/Home/Cards";
import { IoIosAddCircleOutline } from "react-icons/io";
import InputData from "../Components/Home/InputData";

const AllTasks = () => {
  const { loading, error, tasks } = useSelector((state) => state.tasks);

  const [closeModal, setCloseModal] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editTaskData, setEditTaskData] = useState(null);

 const handleOpenCreateModal = () => {
   setIsEditing(false); // Not in editing mode
   setEditTaskData(null); // Clear any existing task data
   setCloseModal(false); // Open modal
 };
 

  return (
    <div>
      <div>
        <button
          className=" w-full flex justify-end text-4xl hover:text-gray-400 transition-all duration-300"
          onClick={handleOpenCreateModal}
        >
          <IoIosAddCircleOutline />
        </button>
      </div>
      {/* {loading && <p>Loading tasks...</p>}
      {error && <p>Error: {error}</p>} */}
      {tasks.length > 0 ? (
        <Cards
          home={true}
          setCloseModal={setCloseModal}
          tasks={tasks}
          setIsEditing={setIsEditing}
          setEditTaskData={setEditTaskData}
        />
      ) : (
        // !loading && <p>No tasks available</p>
        <h1 className="flex justify-center items-center font-bold text-gray-400 text-2xl">NO TASKS</h1> 
      )}

      {!closeModal && (
        <InputData
          closeModal={closeModal}
          setCloseModal={setCloseModal}
          isEditing={isEditing}
          editTaskData={editTaskData}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default AllTasks;
