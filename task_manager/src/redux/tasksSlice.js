import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Task slice with reducers and async thunks
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    showLoading(state, action) {
      state.loading =true
    },
    hideLoading(state, action) {
      state.loading = false
    },
    fetchTasksRequest(state) {
      state.loading = true;
      state.error = null; // Clear any previous errors
    },
    fetchTasksSuccess(state, action) {
      state.loading = false;
      state.tasks = action.payload;
      state.error = null; // Clear errors on success
    },
    fetchTasksFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createTaskRequest(state) {
      state.loading = true;
      state.error = null; // Reset error on new task creation attempt
    },
    createTaskSuccess(state, action) {
      state.loading = false;
      state.tasks.push(action.payload); // Add new task
    },
    createTaskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskRequest(state) {
      state.loading = true;
      state.error = null; // Reset error on task update attempt
    },
    updateTaskSuccess(state, action) {
      state.loading = false;
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask; // Update the task in the tasks array
      }
    },
    updateTaskFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Exporting the action creators
export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  showLoading,
  hideLoading,
} = tasksSlice.actions;

// export const fetchTasks = (token) => async (dispatch) => {
//   dispatch(fetchTasksRequest());
//   try {
//     const response = await axios.get("/api/get_user_tasks", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     dispatch(fetchTasksSuccess(response.data));
//   } catch (error) {
//     dispatch(fetchTasksFailure(error.response?.data?.message || error.message));
//   }
// };


export const createTask = (taskData) => async (dispatch) => {
  console.log(taskData)
  const { title, description, userId, priority, status } = taskData;
  console.log(userId)
  const token = localStorage.getItem("token")
  console.log(token)
  dispatch(createTaskRequest());
  try {
    const response = await axios.post(
      "/api/tasks/create_task",
      { title, description, userId, priority, status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(createTaskSuccess(response.data));
  } catch (error) {
    dispatch(createTaskFailure(error.response?.data?.message || error.message));
  }
};

export const fetchTasks = (token) => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const response = await axios.get("/api/tasks/get_user_tasks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchTasksSuccess(response.data));
  } catch (error) {
    dispatch(fetchTasksFailure(error.response?.data?.message || error.message));
  }
};

// Thunk for updating a task
export const updateTask = (taskData) => async (dispatch) => {
  const { id, title, description, priority, status } = taskData;
  const token = localStorage.getItem("token");

  dispatch(updateTaskRequest());
  try {
    const response = await axios.patch(
      `/api/tasks/update_task/${id}`,
      { title, description, priority, status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(updateTaskSuccess(response.data));
  } catch (error) {
    dispatch(updateTaskFailure(error.response?.data?.message || error.message));
  }
};


export default tasksSlice.reducer;
