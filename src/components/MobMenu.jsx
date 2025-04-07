import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function MobMenu({ Menus }) {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [hoveredItems, setHoveredItems] = useState({});
  
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  const handleMouseEnter = (id) => {
    setHoveredItems(prev => ({...prev, [id]: true}));
  };

  const handleMouseLeave = (id) => {
    setHoveredItems(prev => ({...prev, [id]: false}));
  };

  return (
    <div>
      <button 
        className="lg:hidden z-[999] relative text-black dark:text-white" 
        onClick={toggleDrawer}
        style={{ color: isDarkMode ? 'white' : 'black' }}
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        className="fixed left-0 right-0 top-16 overflow-y-auto max-h-[calc(100vh-4rem)] backdrop-blur text-black dark:text-white px-3 sm:px-6 pb-20 z-[9998] transition-colors duration-300"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        style={{ 
          backgroundColor: isDarkMode ? '#0a0016' : 'white',
          color: isDarkMode ? 'white' : 'black'
        }}
      >
        <div className="max-w-lg mx-auto">
          {/* Кнопки для маленьких экранов */}
          <div className="mobile-buttons py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Toggle theme</span>
              <ThemeToggle />
            </div>
            <button
              className="w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ 
                backgroundColor: isDarkMode ? '#301c7c' : '#2563eb'
              }}
            >
              Sign In
            </button>
            <button
              className="w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ 
                backgroundColor: isDarkMode ? '#301c7c' : '#2563eb'
              }}
            >
              Open Account
            </button>
          </div>

          {/* Разделитель */}
          <div className="mobile-divider h-[1px] bg-gray-200 dark:bg-gray-800 my-2"></div>

          {/* Основное меню */}
          <ul>
            {Menus.map(({ name, subMenu }, i) => {
              const isClicked = clicked === i;
              const hasSubMenu = subMenu?.length;
              const itemId = `menu-${i}`;
              const isHovered = hoveredItems[itemId] || false;
              
              return (
                <li key={name}>
                  <span
                    className="flex-center-between py-3 px-2 sm:px-4 rounded-md cursor-pointer relative text-base sm:text-lg font-medium"
                    onClick={() => setClicked(isClicked ? null : i)}
                    onMouseEnter={() => handleMouseEnter(itemId)}
                    onMouseLeave={() => handleMouseLeave(itemId)}
                    style={{ 
                      color: isDarkMode ? '#d1d5db' : 'black',
                      backgroundColor: isHovered 
                        ? (isDarkMode ? '#1f2937' /* gray-800 */ : '#f3f4f6' /* gray-100 */) 
                        : 'transparent',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    {name}
                    {hasSubMenu && (
                      <ChevronDown
                        className={`ml-auto ${isClicked && "rotate-180"} transition-transform duration-300`}
                        style={{ 
                          color: isDarkMode ? '#d1d5db' : 'black'
                        }}
                      />
                    )}
                  </span>
                  {hasSubMenu && (
                    <motion.ul
                      initial="exit"
                      animate={isClicked ? "enter" : "exit"}
                      variants={subMenuDrawer}
                      className="ml-2 sm:ml-4"
                    >
                      {subMenu.map(({ name, icon: Icon, desc }, subIndex) => {
                        const subItemId = `submenu-${i}-${subIndex}`;
                        const isSubHovered = hoveredItems[subItemId] || false;
                        
                        return (
                        <li
                          key={name}
                          className="py-2 px-2 sm:px-3 flex items-start sm:items-center rounded-md gap-x-3 cursor-pointer"
                          onMouseEnter={() => handleMouseEnter(subItemId)}
                          onMouseLeave={() => handleMouseLeave(subItemId)}
                          style={{ 
                            color: isDarkMode ? '#9ca3af' : 'black',
                            backgroundColor: isSubHovered 
                              ? (isDarkMode ? '#1f2937' /* gray-800 */ : '#f3f4f6' /* gray-100 */) 
                              : 'transparent',
                            transition: 'background-color 0.2s ease'
                          }}
                        >
                          <div 
                            className="p-1.5 rounded-md mt-0.5"
                            style={{ 
                              backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6',
                            }}
                          >
                            <Icon 
                              size={16} 
                              style={{ 
                                color: isDarkMode ? '#9ca3af' : 'black'
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <span className="block text-sm sm:text-base font-semibold mb-0.5">
                              {name}
                            </span>
                            <span className="block text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              {desc}
                            </span>
                          </div>
                        </li>
                      )})}
                    </motion.ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
