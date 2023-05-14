import './App.css';
import React, { useState } from 'react';
import TaskList from './TaskList';
import FormSubmission from './FormSubmission';

function App() {
    const [NewTask, setNewTask] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setisEditing] = useState(false);
    const [FilterStatus, setFilterStatus] = useState('all');
    const [sortOption, setSortOption] = useState(null);

    console.log("New task value:", NewTask);

    function handleTaskCompletion(taskId) {
        setNewTask(prevTasks =>
            prevTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, completed: !task.completed };
                } else {
                    return task;
                }
            })
        );
    }


    function handleEditClick(taskId) {
        const taskToEdit = NewTask.find(task => task.id === taskId);
        setSelectedTask(taskToEdit);
        setisEditing(true);
    }

    function handleEditSubmit(updatedTaskData) {
        setNewTask(
            prevTasks =>
                prevTasks.map(task => {
                    if (task.id === updatedTaskData.id) {
                        return { ...task, ...updatedTaskData };
                    } else {
                        return task;
                    }
                })
        );
        setSelectedTask(null);
        setisEditing(false);
    }
    function handleTaskDeletion(taskId) {
        setNewTask(prevTasks => prevTasks.filter(task => task.id !== taskId));  
        //filter method creating a newTask array taht does not contain the delete task
    }

    function handleFilterChange(filterOption) {
        setFilterStatus(filterOption);
        /*'filterOption' is passed through TaskList Component to indicate the 
        filter option and then used to set filter status */
      
    }
    /* Based on the status from the Button in TaskList. Filter current Array  */
    const filteredTasks = NewTask.filter(task => {
        if (FilterStatus === 'all') {
            return true
        } else if (FilterStatus === 'completed') {
            return task.completed;
        } else {
            return !task.completed;
        }
    });

    function handleSortChange(option) {
        setSortOption(option);
    }

    function handleSortChange(option) {
        setSortOption(option);
    }
   
    function getSortedTasks(tasks) {
        const priorities = { low: 1, medium: 2, high: 3 };
        const sortedTasks = [...tasks];

        if (sortOption === 'dueDate') {
            sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (sortOption === 'priority') {
            sortedTasks.sort((a, b) => priorities[b.priority] - priorities[a.priority]);
        }

        return sortedTasks;
    }

    return (
        <div className="App">
            <TaskList tasks={getSortedTasks(filteredTasks)} /* Always passing the filter Task to the Tasklist, filterTask initiliazed to 'all' */
                handleTaskCompletion={handleTaskCompletion}
                handleEditClick={handleEditClick}
                handleTaskDeletion={handleTaskDeletion}
                handleFilterChange={handleFilterChange}
                filterStatus={FilterStatus}
                handleSortChange={handleSortChange} />

            <FormSubmission setNewTask={setNewTask}
                selectedTask={selectedTask}
                isEditing={isEditing}
                handleEditSubmit={handleEditSubmit} />
        </div>
    );
}


export default App;

