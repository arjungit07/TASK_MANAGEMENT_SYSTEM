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
    origin: [
      "https://task-management-system-51md-5qssjiknw-harshs-projects-b52001fd.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://task-management-system-51md-5qssjiknw-harshs-projects-b52001fd.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});




app.use("/api/tasks", task_route)
app.use("/api/users",user_route)


const port = process.env.PORT || 8080
app.listen(port , () =>{
    console.log("server is listening at server 8080")
})
