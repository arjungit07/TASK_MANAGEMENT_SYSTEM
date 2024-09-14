import React from 'react'
import Cards from '../Components/Home/Cards';
import { useSelector } from 'react-redux';

const Completed_Tasks = () => {

  const { tasks } = useSelector((state) => state.tasks);
  

  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div>
      {tasks.length > 0 ? (
        <Cards home={false} tasks={completedTasks} />
      ) : (
        <h1 className="flex justify-center mt-8 items-center font-bold text-gray-400 text-2xl">
          NO TASKS
        </h1>
      )}
    </div>
  );
}

export default Completed_Tasks