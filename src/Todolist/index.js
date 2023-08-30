import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask,  deleteTask, setEditingTaskId, editTask, clearTasks } from '../store/reducers/list';
import './style.css'; 

const TodoList = () => {
  const tasks = useSelector(state => state.list.tasks);
  const editingTaskId = useSelector(state => state.list.editingTaskId);
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      dispatch(addTask(taskInput));
      setTaskInput('');
      console.log('Task added:', taskInput);
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    console.log('Task deleted');
  };

  const handleStartEdit = (taskId, description) => {
    setEditDescription(description);
    setIsEditing(true);
    dispatch(setEditingTaskId(taskId));
  };

  const handleEditTask = (taskId, newDescription) => {
    dispatch(editTask({ taskId,newDescription }));
    setIsEditing(false);
    setEditDescription('');
    console.log('Task edited');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditDescription('');
    dispatch(setEditingTaskId(null));
  };

  const handleClearTasks = () => {
    dispatch(clearTasks());
    setTaskInput('');
    setEditDescription('');
    setIsEditing(false);
    dispatch(setEditingTaskId(null));
    alert('Are you sure you want to clear your data?');
  };

  return (
    <div className="todo-list">
      <h2 className="list-title">Todo List</h2>
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button className="add-button" onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {editingTaskId === task.id && isEditing ? (
              <>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button className="save-button" onClick={() => handleEditTask(task.id, editDescription)}>Save</button>
                <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task.description}</span>
                <div className="task-actions">
                  <button className="edit-button" onClick={() => handleStartEdit(task.id, task.description)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <p className="total-tasks">Total tasks: {tasks.length}</p>
      <button className="clear-button" onClick={handleClearTasks}>Clear</button>
    </div>
  );
};

export default TodoList;
