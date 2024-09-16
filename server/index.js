const express = require("express")
const dotenv = require("dotenv")
const pool = require("./config/db_config")
const task_route = require("./route/task.router")
const user_route = require("./route/user.router")
const cors = require("cors")

const app = express()
dotenv.config()

app.use(express.json())

pool.connect((err, client,release) => {
  if (err) {
    console.error("Error acquiring client from pool", err.stack);
  } else {
    console.log("Database connected successfully!");
    release(); //
  }
});

app.use(
  cors({
    origin:
     process.env.FRONTEND_URL,
    methods: ["GET", "POST", "OPTIONS","PATCH","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use("/api/tasks", task_route)
app.use("/api/users",user_route)


const port = process.env.PORT || 8080
app.listen(port , () =>{
    console.log("server is listening at server 8080")
})