import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function MobMenu({ Menus, onOpenAuth }) {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [hoveredItems, setHoveredItems] = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
        setClicked(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  const toggleDrawer = useCallback(() => {
    setIsOpen(prev => !prev);
    setClicked(null);
  }, []);

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

  const handleMouseEnter = useCallback((id) => {
    setHoveredItems(prev => ({...prev, [id]: true}));
  }, []);

  const handleMouseLeave = useCallback((id) => {
    setHoveredItems(prev => ({...prev, [id]: false}));
  }, []);

  const handleMenuClick = useCallback((index) => {
    setClicked(prev => prev === index ? null : index);
  }, []);

  return (
    <div role="navigation" aria-label="Mobile Menu">
      <button 
        className={`lg:hidden z-[999] relative ${isDarkMode ? 'text-white' : 'text-black'}`}
        onClick={toggleDrawer}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <motion.div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed left-0 right-0 top-16 overflow-y-auto max-h-[calc(100vh-4rem)] backdrop-blur px-3 sm:px-6 pb-20 z-[9998] transition-colors duration-300
          ${isDarkMode ? 'bg-[#0a0016] text-white' : 'bg-white text-black'}`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ 
          type: "tween",
          duration: 0.3,
          ease: "easeInOut"
        }}
        role="menu"
      >
        <div className="max-w-lg mx-auto">
          {/* Кнопки для маленьких экранов */}
          <div className="mobile-buttons py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Toggle theme</span>
              <ThemeToggle />
            </div>
            <button
              className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 hover:bg-opacity-90 hover:brightness-110
                ${isDarkMode ? 'bg-purple-900' : 'bg-blue-600'}`}
              onClick={() => {
                onOpenAuth('login');
                setIsOpen(false);
              }}
            >
              Sign In
            </button>
            <button
              className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 hover:bg-opacity-90 hover:brightness-110
                ${isDarkMode ? 'bg-purple-900' : 'bg-blue-600'}`}
              onClick={() => {
                onOpenAuth('register');
                setIsOpen(false);
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
                  <button
                    className={`flex w-full justify-between py-3 px-2 sm:px-4 rounded-md relative text-base sm:text-lg font-medium transition-colors duration-200
                      ${isDarkMode ? 'text-gray-300' : 'text-black'}
                      ${isHovered ? (isDarkMode ? 'bg-gray-800' : 'bg-gray-100') : 'bg-transparent'}`}
                    onClick={() => handleMenuClick(i)}
                    onMouseEnter={() => handleMouseEnter(itemId)}
                    onMouseLeave={() => handleMouseLeave(itemId)}
                    aria-expanded={isClicked}
                    aria-controls={hasSubMenu ? `submenu-${i}` : undefined}
                    role="menuitem"
                  >
                    {name}
                    {hasSubMenu && (
                      <ChevronDown
                        className={`ml-auto ${isClicked ? 'rotate-180' : ''} transition-transform duration-300
                          ${isDarkMode ? 'text-gray-300' : 'text-black'}`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                  {hasSubMenu && (
                    <motion.ul
                      id={`submenu-${i}`}
                      initial="exit"
                      animate={isClicked ? "enter" : "exit"}
                      variants={subMenuDrawer}
                      className="ml-2 sm:ml-4"
                      role="menu"
                    >
                      {subMenu.map(({ name, icon: Icon, desc }, subIndex) => {
                        const subItemId = `submenu-${i}-${subIndex}`;
                        const isSubHovered = hoveredItems[subItemId] || false;
                        
                        return (
                          <button
                            key={name}
                            className={`w-full py-2 px-2 sm:px-3 flex items-start sm:items-center rounded-md gap-x-3 transition-colors duration-200
                              ${isDarkMode ? 'text-gray-400' : 'text-black'}
                              ${isSubHovered ? (isDarkMode ? 'bg-[#581c87] hover:bg-opacity-90 hover:brightness-110' : 'bg-blue-600 hover:bg-opacity-90 hover:brightness-110') : 'bg-transparent'}`}
                            onMouseEnter={() => handleMouseEnter(subItemId)}
                            onMouseLeave={() => handleMouseLeave(subItemId)}
                            role="menuitem"
                            tabIndex={0}
                          >
                            <div 
                              className={`p-1.5 rounded-md mt-0.5 transition-colors duration-300
                                ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-black'}
                                ${isSubHovered ? (isDarkMode ? 'bg-[#581c87] text-white' : 'bg-blue-600 text-white') : ''}`}
                              aria-hidden="true"
                            >
                              <Icon 
                                size={16} 
                                className={`transition-colors duration-300 ${isDarkMode ? (isSubHovered ? 'text-white' : 'text-gray-400') : (isSubHovered ? 'text-gray-800' : 'text-black')}`}
                              />
                            </div>
                            <div className="flex-1">
                              <span className={`block text-sm sm:text-base font-semibold mb-0.5 transition-colors duration-300 ${isSubHovered ? 'text-white' : (isDarkMode ? 'text-white' : 'text-black')}`}>
                                {name}
                              </span>
                              <span className={`block text-xs sm:text-sm transition-colors duration-300
                                ${isSubHovered ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                {desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
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
