import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import url from '../../url';

export default function ToDo() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);

    // Add new task to the todo list
    const add = async (event) => {
        event.preventDefault();
        if (name === "" || description === "") {
            alert("Both fields are required.");
            return;
        }
        const newTask = { name, description, id: Math.floor(Math.random() * 10000) };
        const updatedTodos = [...todos, newTask];
        setTodos(updatedTodos);
        await updateValues(updatedTodos);
        setName("");
        setDescription("");
    };

    // Update tasks on the backend
    async function updateValues(tasks) {
        const authToken = localStorage.getItem("authTokens");
        if (!authToken) {
            alert("User not authenticated");
            return;
        }

        try {
            const res = await fetch(`${url.url}/users/update`, {
                method: 'PATCH',
                body: JSON.stringify({
                    userData: { task: tasks },
                    id: authToken
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            if (data.status !== 'success') {
                alert("Error updating tasks");
            }
        } catch (error) {
            alert("An error occurred while updating tasks.");
        }
    }

    // Fetch existing tasks from the backend
    async function fetchData() {
        const authToken = localStorage.getItem("authTokens");
        if (!authToken) {
            alert("User not authenticated");
            return;
        }

        try {
            const res = await fetch(`${url.url}/users/${authToken}`);
            const user = await res.json();
            if (user && user.user.task) {
                setTodos(user.user.task);
            }
        } catch (error) {
            alert("An error occurred while fetching tasks.");
        }
    }

    // Fetch tasks when component mounts
    useEffect(() => { fetchData(); }, []);

    // Delete a task by id
    const deleteTask = async (id) => {
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos);
        await updateValues(filteredTodos);
    };

    // Render the list of todos
    const renderList = todos.map((todo) => (
        <div key={todo.id} className="d-flex justify-content-between align-items-center mt-3">
            <div>
                <ul>
                    <li><strong>Task:</strong> {todo.name}</li>
                    <small><strong>Description:</strong> {todo.description}</small>
                </ul>
            </div>
            <button 
                onClick={() => deleteTask(todo.id)} 
                className="btn btn-danger ms-3"
                style={{ borderRadius: "5px" }}>
                Delete
            </button>
        </div>
    ));

    return (
        <>
            <Navbar />
            <div className="container" style={{ backgroundColor: "#fff", maxWidth: "600px", borderRadius: "10px", marginTop: "5%", padding: "30px", border: '1px solid #ccc' }}>
                <form onSubmit={add}>
                    <h1 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '20px' }}>ToDo</h1>

                    <div className="form-group mb-3">
                        <label htmlFor="task" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Task</label>
                        <input 
                            type="text" 
                            className="form-control"
                            id="task"
                            placeholder="Enter Task ToDo" 
                            onChange={(event) => setName(event.target.value)} 
                            value={name} 
                            style={{ fontSize: '1rem', borderRadius: '8px' }} 
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="description" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Description</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="description" 
                            placeholder="Enter Description" 
                            onChange={(event) => setDescription(event.target.value)} 
                            value={description} 
                            style={{ fontSize: '1rem', borderRadius: '8px' }} 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary mt-3" style={{ width: '100%', padding: '12px', borderRadius: '8px' }}>Add</button>
                </form>

                <div className="mt-5">
                    {todos.length === 0 ? <p>No tasks available</p> : renderList}
                </div>
            </div>
        </>
    );
}
