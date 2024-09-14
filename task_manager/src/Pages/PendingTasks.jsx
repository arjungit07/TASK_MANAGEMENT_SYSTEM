import React from 'react'
import Cards from '../Components/Home/Cards';
import { useSelector } from 'react-redux';

const PendingTasks = () => {

 const { tasks } = useSelector((state) => state.tasks);

 const incompletedTasks = tasks.filter((task) => task.status === "pending");

  return (
    <div>
      {tasks.length > 0 ? (
        <Cards home={false} tasks={incompletedTasks} />
      ) : (
        <h1 className="flex justify-center items-center mt-8 font-bold text-gray-400 text-2xl">
          NO TASKS
        </h1>
      )}
    </div>
  );
}

export default PendingTasks