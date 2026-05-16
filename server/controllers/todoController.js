const Todo = require('../model/Todo');

// @desc    Get all todos
// @route   GET /api/todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Create a todo
// @route   POST /api/todos
exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json({
            success: true,
            data: todo
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!todo) {
            return res.status(404).json({ success: false, error: 'Todo not found' });
        }
        
        res.status(200).json({ success: true, data: todo });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        
        if (!todo) {
            return res.status(404).json({ success: false, error: 'Todo not found' });
        }
        
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};