const router = require("express").Router()
const authenticateToken = require("../middlewares/auth_middleware")
const pool = require("../config/db_config")


router.post("/create_task", authenticateToken, async (req, res) => {


  const { userId, title, description, priority, status } = req.body;
  
  
  try {
    const lowerCaseStatus = status.toLowerCase();
    const result = await pool.query(
      "INSERT INTO tasks (user_id , title, description, priority, status) VALUES ($1, $2, $3, $4 ,$5) RETURNING *",
      [userId, title, description, priority, lowerCaseStatus]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding task", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get_user_tasks", authenticateToken, async (req, res) => {
  const userId = req.user.userId

  try {
    
    const result = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
      userId,
    ]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "No tasks found for this user" });
    }
  } catch (err) {
    console.error("Error fetching tasks for user", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/update_task/:taskId", authenticateToken, async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.userId;
  const patchData = req.body; 

  try {
    
    const taskCheck = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [taskId, userId]
    );

    if (taskCheck.rows.length === 0) {
      return res
        .status(404)
        .json({
          message:
            "Task not found or you are not authorized to update this task",
        });
    }

    const currentTask = taskCheck.rows[0];

    const updatedTask = { ...currentTask, ...patchData };

    Object.keys(patchData).forEach((key) => {
      if (patchData[key] === null) {
        delete updatedTask[key];
      }
    });

    
    const result = await pool.query(
      `UPDATE tasks 
             SET title = $1, description = $2, priority = $3, status = $4, updated_at = NOW()
             WHERE id = $5 AND user_id = $6
             RETURNING *`,
      [
        updatedTask.title,
        updatedTask.description,
        updatedTask.priority,
        updatedTask.status,
        taskId,
        userId,
      ]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating task", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete_task/:taskId" , async (req, res) => {
  const { taskId } = req.params; // Get the taskId from URL parameters

  console.log(taskId)

  try {
    const deleteTaskQuery = "DELETE FROM tasks WHERE id = $1 RETURNING *";
    const result = await pool.query(deleteTaskQuery, [taskId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res
      .status(200)
      .json({ message: "Task deleted successfully"});
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router