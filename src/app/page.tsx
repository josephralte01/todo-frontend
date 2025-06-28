'use client';

import { useEffect, useState } from "react";
import { useTodoStore } from "@/stores/todoStore";

export default function Home() {
  const { todos, fetchTodos, addTodo, deleteTodo, toggleTodo, loading } = useTodoStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAdd = async () => {
    if (!input.trim()) return;
    await addTodo(input);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

        <div className="flex mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded p-2 mr-2"
            placeholder="Add a task..."
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className={`flex justify-between items-center border p-2 rounded ${
                  todo.completed ? "bg-gray-100 line-through text-gray-500" : ""
                }`}
              >
                <label className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo._id, !todo.completed)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
