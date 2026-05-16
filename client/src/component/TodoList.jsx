import { ClipboardList, Filter, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete }) => {
    const [filter, setFilter] = useState('all');

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'pending') return !todo.completed;
        return true;
    });

    const stats = {
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        pending: todos.filter(t => !t.completed).length
    };

    if (todos.length === 0) {
        return (
            <div className="card text-center py-12 animate-fade-in">
                <ClipboardList className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks yet!</h3>
                <p className="text-gray-500">Add your first todo above 🚀</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Stats and Filter */}
            <div className="card">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
                            <div className="text-xs text-gray-500">Total</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                            <div className="text-xs text-gray-500">Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
                            <div className="text-xs text-gray-500">Pending</div>
                        </div>
                    </div>
                    
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all
                                     ${filter === 'all' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-1
                                     ${filter === 'pending' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                        >
                            <Circle className="w-3 h-3" />
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-1
                                     ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                        >
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                        </button>
                    </div>
                </div>
            </div>

            {/* Todo List */}
            <div className="space-y-3">
                {filteredTodos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;