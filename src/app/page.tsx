'use client';

import { useState, useEffect } from 'react';
import { Todo } from "@/types/todo"; // ✅ Import Todo type properly
type Todo = {
  _id: string;
  text: string;
};

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`${API}/api/todos`)
      .then(res => res.json())
      .then(setTodos)
      .catch(console.error);
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    const res = await fetch(`${API}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const data: Todo = await res.json();
    setTodos(prev => [...prev, data]);
    setInput("");
  };

  const deleteTodo = async (id: string) => {
    await fetch(`${API}/api/todos/${id}`, { method: "DELETE" });
    setTodos(prev => prev.filter(todo => todo._id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <div className="flex mb-4">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border rounded p-2 mr-2"
            placeholder="Add a task..."
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
