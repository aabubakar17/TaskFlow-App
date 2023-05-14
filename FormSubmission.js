import React from 'react';
import TaskForm from './TaskForm';
import './App.css';

function FormSubmission(props) {
    function handleSubmit(formData) {
        const newTask = {
            id: Date.now(),
            text: formData.titleInput,
            dueDate: formData.dueDateInput,
            priority: formData.priorityInput,
            completed: false
        };
        props.setNewTask(prevTasks => [...prevTasks, newTask]);
    }

    return (
        <div>
            <TaskForm onSubmit={handleSubmit} selectedTask={props.selectedTask} isEditing={props.isEditing} handleEditSubmit={props.handleEditSubmit} />
        </div>
    );
}

export default FormSubmission;
