import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:shadow-lg shadow-md
        ${isDarkMode ? 'bg-[#581c87]' : 'bg-blue-600'}`}
      aria-label="Переключить тему"
      aria-pressed={isDarkMode}
      role="switch"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDarkMode ? 0 : 180,
          scale: isDarkMode ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        {isDarkMode ? (
          <Moon className="w-5 h-5 text-white" />
        ) : (
          <Sun className="w-5 h-5 text-white" />
        )}
      </motion.div>
    </button>
  );
}