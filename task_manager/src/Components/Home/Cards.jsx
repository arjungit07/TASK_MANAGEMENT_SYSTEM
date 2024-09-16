import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { hideLoading, showLoading, updateTask } from "../../redux/tasksSlice";
import { useDispatch } from "react-redux";

import { FaStar } from "react-icons/fa";

const Cards = ({
  home,
  setCloseModal,
  tasks,
  setIsEditing,
  setEditTaskData,
}) => {
  // const data = [
  //   {
  //     title: "Projects",
  //     desc: "For Project I need to see tutorials of the code master youtube channel For Project I need to see tutorials of the code master youtube channel.",
  //     status: "Completed",
  //   },
  //   {
  //     title: "Projects",
  //     desc: "For Project I need to see tutorials ",
  //     status: "Incomplete",
  //   },
  // ];
  const dispatch = useDispatch();
  const backendUrl = process.env.BACKEND_URL;

  const deleteHandler = async (task_id) => {
    try {
      dispatch(showLoading());
      console.log(task_id);
      const deleteTask = await axios.delete(
        `${backendUrl}/api/tasks/delete_task/${task_id}`
      );
      if (deleteTask.status === 200) {
        window.location.reload();
      }
      return deleteTask;
    } catch (error) {
      throw error;
    } finally {
      dispatch(hideLoading()); // Set loading to false
    }
  };

  const handleEditTask = (task) => {
    setIsEditing(true); // Set editing mode
    setEditTaskData(task); // Set the task to be edited
    setCloseModal(false); // Open the modal
  };

  const updateTaskHandler = async (task, type) => {
    const token = localStorage.getItem("token");
    const updates = {};

    if (type === "status") {
      updates.status = task.status === "pending" ? "completed" : "pending";
    } else if (type === "priority") {
      updates.priority = task.priority === "high" ? "low" : "high";
    }

    try {
      dispatch(showLoading());
      // const response = await axios.patch(
      //   `${backendUrl}/api/tasks/update_task/${task.id}`,
      //   updates,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      const response = dispatch(updateTask(task))
      if (response.status === 200) {
       window.location.reload()
      }
    } catch (error) {
      console.error(`Error updating task ${type}:`, error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

    const sortedTasks = [...tasks].sort((a, b) => {
      // Customize sorting logic as needed
      // Example: sort by priority first, then by creation date
      if (a.priority === "high" && b.priority === "low") return -1;
      if (a.priority === "low" && b.priority === "high") return 1;
      return new Date(a.createdAt) - new Date(b.createdAt);
    });



  return (
    <div className="grid grid-cols-4 gap-6 p-2 ">
      {sortedTasks && sortedTasks.length > 0 ? (
        sortedTasks.map((items) => (
          <div className="bg-gray-700 flex flex-col justify-between p-4 rounded-lg">
            <div className="bg-gray-700 rounded-xl p-4">
              <h3 className="text-xl font-semibold">
                {capitalizeFirstLetter(items.title)}
              </h3>
              <p className="text-gray-300">{items.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => {
                  updateTaskHandler(items, "status");
                }}
                className={`p-2 ${
                  items.status === "pending" ? "bg-red-700" : "bg-green-400"
                }`}
              >
                {capitalizeFirstLetter(items.status)}
              </button>
              <div className="w-2/6 p-2 text-2xl flex justify-around">
                <button
                  onClick={() => updateTaskHandler(items, "priority")}
                  className={`p-2  ${
                    items.priority === "high"
                      ? "text-yellow-600    border-none py-1 px-1"
                      : "text-gray-400 border-none py-1 px-1"
                  }`}
                >
                  <FaStar />
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleEditTask(items)}
                >
                  <CiEdit />
                </button>
                <button
                  className="icon-button"
                  onClick={() => deleteHandler(items.id)}
                >
                  {<MdDelete />}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-4 text-center text-gray-300">
          No tasks available
        </p>
      )}
      {home && (
        <div className="text-2xl text-gray-400  flex flex-col bg-gray-700  justify-center items-center p-4 rounded-lg ">
          <h2>Add Task</h2>
          <div className="text-4xl mt-2 text-gray-300 hover:scale-110  hover:cursor-pointer transition-all duration-300">
            <button onClick={() => setCloseModal(false)}>
              <IoIosAddCircleOutline />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
