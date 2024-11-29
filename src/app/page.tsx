'use client' // Indicates that this is a client-side component
import React, { useState } from "react";

// Define the structure of a task
interface Task {
  text: string; // The task description
  completed: boolean; // Indicates if the task is completed
}

// Main ToDo application component
const ToDoApp = () => {
  // State for the current input task
  const [task, setTask] = useState<string>("");

  // State for the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to add a new task
  const addTask = () => {
    if (task.trim() !== "") {
      // Add new task to the list only if it's not empty
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(""); // Clear the input field after adding
    }
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (index: number) => {
    setTasks(
      tasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Function to delete a task
  const deleteTask = (indexToDelete: number) => {
    // Filter out the task at the specified index
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    // Main container - centers content vertically and horizontally
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Centered Box - contains all todo app elements */}
      <div className="bg-gray-200 p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-left text-black mb-8">
          My Todo App
        </h1>

        {/* Input Field and Add Button - for adding new tasks */}
        <div className="flex items-right mb-6 space-x-4 ">
          <input
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full px-5 py-3 bg-white-700 text-black rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 bg-black-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          >
            Add
          </button>
        </div>

        {/* Task List - displays all added tasks */}
        <ul className="space-y-4">
          {tasks.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
            >
              <div className="flex items-center space-x-4">
                {/* Checkbox for task completion */}
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="w-5 h-5 text-indigo-500 focus:ring-2 focus:ring-indigo-400 transition duration-200"
                />
                {/* Task Text (strikethrough if completed) */}
                <span
                  className={`text-lg font-medium text-black ${
                    item.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {item.text}
                </span>
              </div>
              {/* Delete button - removes the task from the list */}
              <button
                onClick={() => deleteTask(index)}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Export the ToDoApp component as the default export
export default ToDoApp;
