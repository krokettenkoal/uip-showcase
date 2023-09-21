import React, { useState } from "react";

function TodoApp() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    function handleAddTodo() {
        setTodos([...todos, todo]);
        setTodo("");
    }

    return (
        <div>
            <input value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map((t) => (
                    <li key={t}>{t}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;