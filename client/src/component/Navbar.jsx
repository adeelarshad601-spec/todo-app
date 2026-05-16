import { CheckSquare, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.body.classList.toggle('dark');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-lg mb-8 rounded-2xl">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                            <CheckSquare className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                TaskMaster
                            </h1>
                            <p className="text-xs text-gray-500">Organize your day</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;