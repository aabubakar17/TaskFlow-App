import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './App.css';

function TaskForm(props) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            titleInput: props.selectedTask ? props.selectedTask.text : '',
            dueDateInput: props.selectedTask ? props.selectedTask.dueDate : '',
            priorityInput: props.selectedTask ? props.selectedTask.priority : 'low',
        });
    }, [props.selectedTask]);

    function handleChange(event) {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    }

    function handleClick(event) {
        event.preventDefault();
        props.onSubmit(formData);
    }

    function handleUpdateClick(event) {
        event.preventDefault();
        const updatedTaskData = {
            id: props.selectedTask.id,
            text: formData.titleInput,
            dueDate: formData.dueDateInput,
            priority: formData.priorityInput,
        };
        props.handleEditSubmit(updatedTaskData);
    }

    return (
        <div>
            <form>
                <TextField
                    label="Task Title"
                    id="titleInput"
                    value={formData.titleInput}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Due Date"
                    type="date"
                    id="dueDateInput"
                    value={formData.dueDateInput}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                        labelId="priority-label"
                        id="priorityInput"
                        value={formData.priorityInput}
                        onChange={handleChange}
                    >
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </Select>
                </FormControl>

                <Button type="submit" onClick={handleClick} variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>

            {props.isEditing && (
                <Button type="button" onClick={handleUpdateClick} variant="contained" color="secondary" fullWidth>
                    Update Task
                </Button>
            )}
        </div>
    );
}

export default TaskForm;
