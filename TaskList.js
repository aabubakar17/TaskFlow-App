import React from 'react';
import './App.css';

function TaskList(props) {
    const taskList = props.tasks.map(task => {
        return (
            <li key={task.id}> {task.text}
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => props.handleTaskCompletion(task.id)}
                />
                <button type="button" onClick={() => props.handleEditClick(task.id)}>
                    Edit
                </button>

                <button type="button" onClick={() => props.handleTaskDeletion(task.id)}>
                    Delete
                </button>
                
            </li>
        );
    });

    return (
        <div>
            <h2>Task List</h2>
            <div>
                <input
                    type="radio"
                    id="allTasks"
                    name="taskFilter"
                    onChange={() => props.handleFilterChange('all')}
                />
                <label htmlFor="allTasks">All tasks</label>

                <input
                    type="radio"
                    id="completedTasks"
                    name="taskFilter"
                    onChange={() => props.handleFilterChange('completed')}
                />
                <label htmlFor="completedTasks">Completed tasks</label>

                <input
                    type="radio"
                    id="incompleteTasks"
                    name="taskFilter"
                    onChange={() => props.handleFilterChange('incomplete')}
                />
                <label htmlFor="incompleteTasks">Incomplete tasks</label>
            </div>

            {/* Sorting dropdown */}
            <div>
                <label htmlFor="sortOption">Sort tasks by:</label>
                <select
                    id="sortOption"
                    onChange={(event) => props.handleSortChange(event.target.value)}
                >
                    <option value="none">None</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                </select>
            </div>

       

            <ul>{taskList}</ul>
        </div>     
       

    );
}

export default TaskList;