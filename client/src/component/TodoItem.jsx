import { useState } from 'react';
import { Edit2, Trash2, CheckCircle, Circle, Save, X, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description || '');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!editTitle.trim()) {
            toast.error('Title cannot be empty');
            return;
        }
        
        setLoading(true);
        try {
            await onUpdate(todo._id, {
                title: editTitle,
                description: editDescription,
                completed: todo.completed
            });
            setIsEditing(false);
            toast.success('Todo updated!');
        } catch (error) {
            toast.error('Failed to update');
        } finally {
            setLoading(false);
        }
    };

    const toggleComplete = async () => {
        setLoading(true);
        try {
            await onUpdate(todo._id, {
                ...todo,
                completed: !todo.completed
            });
            toast.success(todo.completed ? 'Task marked as incomplete' : 'Task completed! 🎉');
        } catch (error) {
            toast.error('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            setLoading(true);
            try {
                await onDelete(todo._id);
                toast.success('Todo deleted!');
            } catch (error) {
                toast.error('Failed to delete');
            } finally {
                setLoading(false);
            }
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isEditing) {
        return (
            <div className="card animate-slide-in">
                <div className="space-y-3">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="input-field"
                        placeholder="Title"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows="2"
                        className="input-field resize-none"
                        placeholder="Description"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg 
                                     hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg 
                                     hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`card animate-slide-in transition-all duration-300 
                        ${todo.completed ? 'bg-green-50/90 border-l-4 border-green-500' : 'hover:shadow-xl'}`}>
            <div className="flex items-start gap-4">
                <button
                    onClick={toggleComplete}
                    disabled={loading}
                    className="mt-1 focus:outline-none"
                >
                    {todo.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500 hover:scale-110 transition-transform" />
                    ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-purple-500 hover:scale-110 transition-all" />
                    )}
                </button>
                
                <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {todo.title}
                    </h3>
                    {todo.description && (
                        <p className={`text-gray-600 mt-1 ${todo.completed ? 'line-through' : ''}`}>
                            {todo.description}
                        </p>
                    )}
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(todo.createdAt)}</span>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        disabled={loading}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all
                                 hover:scale-110 disabled:opacity-50"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all
                                 hover:scale-110 disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;