import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../../redux/tasksSlice";
import { IoMdClose } from "react-icons/io";

const InputData = ({
  closeModal,
  setCloseModal,
  isEditing,
  editTaskData,
  setIsEditing,
}) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks);

  const user = localStorage.getItem("user");
  console.log(user);

  useEffect(() => {
    if (isEditing && editTaskData) {
      setTaskName(editTaskData.title);
      setDescription(editTaskData.description);
      setPriority(editTaskData.priority);
    }
  }, [isEditing, editTaskData]);

  const handleCreateOrEditTask = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update task logic
      dispatch(
        updateTask({
          id: editTaskData.id,
          title: taskName,
          description,
          priority,
          status: editTaskData.status, // Keep the current status
          userId: user,
        })
      );
      setIsEditing(false); // Exit edit mode
    } else {
      // Create task logic
      dispatch(
        createTask({
          title: taskName,
          description,
          userId: user,
          priority,
          status: "Pending",
        })
      );
    }

    // Clear form and close modal
    setTaskName("");
    setPriority("");
    setDescription("");
    setCloseModal(true);
  };
  return (
    <div
      className={`fixed top-0 left-0 bg-gray-800 opacity-90 h-screen w-full ${
        !closeModal ? "block" : "hidden"
      }`}
    >
      <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full">
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button className="text-2xl" onClick={() => setCloseModal(true)}>
              <IoMdClose />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleCreateOrEditTask}>
            <input
              className="px-3 py-2 rounded w-full bg-gray-700 my-3"
              name="title"
              placeholder="Enter title"
              required
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              className="mt-1 px-3 py-2 rounded w-full bg-gray-700 my-3"
              placeholder="Enter description"
              required={!isEditing}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <select
              className="px-3 py-2 rounded w-full bg-gray-700 mb-4"
              value={priority}
              required={!isEditing}
              placeholder="Enter priority"
              onChange={(e) => setPriority(e.target.value)} // Update priority state
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="px-3 py-1 bg-blue-400  rounded text-xl">
              {/* Submit */}
              {loading
                ? isEditing
                  ? "Updating Task..."
                  : "Creating Task..."
                : isEditing
                ? "Update Task"
                : "Create Task"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default InputData;
