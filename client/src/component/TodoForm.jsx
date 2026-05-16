import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const TodoForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Please enter a title');
            return;
        }
        
        setLoading(true);
        try {
            await onSubmit({ title, description });
            setTitle('');
            setDescription('');
            toast.success('Todo added successfully!');
        } catch (error) {
            toast.error('Failed to add todo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card animate-slide-in">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                    </label>
                    <textarea
                        placeholder="Add some details..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        className="input-field resize-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Plus className="w-5 h-5" />
                    )}
                    {loading ? 'Adding...' : 'Add Todo'}
                </button>
            </div>
        </form>
    );
};

export default TodoForm;