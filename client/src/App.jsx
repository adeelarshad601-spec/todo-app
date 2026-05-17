import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

import { Loader2 } from 'lucide-react';
import Navbar from './component/Navbar';
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/todos` 
  : 'http://localhost:3000/api/todos';

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTodos = async () => {
        try {
            const response = await axios.get(API_URL);
            setTodos(response.data.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch todos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createTodo = async (todoData) => {
        const response = await axios.post(API_URL, todoData);
        setTodos([response.data.data, ...todos]);
        return response.data;
    };

    const updateTodo = async (id, updatedData) => {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        setTodos(todos.map(todo => todo._id === id ? response.data.data : todo));
        return response.data;
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter(todo => todo._id !== id));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg">Loading your tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Toaster 
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <Navbar />
            {error && (
                <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg animate-slide-in">
                    {error}
                </div>
            )}
            <div className="space-y-6">
                <TodoForm onSubmit={createTodo} />
                <TodoList 
                    todos={todos} 
                    onUpdate={updateTodo}
                    onDelete={deleteTodo}
                />
            </div>
        </div>
    );
}

export default App;