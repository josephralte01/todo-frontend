import { create } from "zustand";
import { Todo } from "@/types/todo";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  fetchTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${API}/api/todos`);
      const data = await res.json();
      set({ todos: data, loading: false });
    } catch (error) {
      console.error("Failed to fetch todos", error);
      set({ loading: false });
    }
  },

  addTodo: async (text: string) => {
    const res = await fetch(`${API}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    set((state) => ({ todos: [...state.todos, data] }));
  },

  deleteTodo: async (id: string) => {
    await fetch(`${API}/api/todos/${id}`, { method: "DELETE" });
    set((state) => ({
      todos: state.todos.filter((todo) => todo._id !== id),
    }));
  },

  toggleTodo: async (id: string, completed: boolean) => {
    const res = await fetch(`${API}/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    const updated = await res.json();
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo._id === id ? updated : todo
      ),
    }));
  },
}));
