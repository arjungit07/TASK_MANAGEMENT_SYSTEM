import React from 'react'
import Cards from '../Components/Home/Cards'
import { useSelector } from 'react-redux';

const Important_Tasks = () => {
  const { tasks } = useSelector((state) => state.tasks);
  

    const importantTasks = tasks.filter((task) => task.priority === "high");
  return (
    <div>
      {tasks.length > 0 ? (
        <Cards home={false} tasks={importantTasks} />
      ) : (
        <h1 className="flex justify-center items-center mt-8 font-bold text-gray-400 text-2xl">
          NO TASKS
        </h1>
      )}
    </div>
  );
}

export default Important_Tasks