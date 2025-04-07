import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
        className="fixed left-0 right-0 top-16 overflow-y-auto h-full backdrop-blur text-black dark:text-white p-6 pb-20 z-[9998] transition-colors duration-300"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        style={{ 
          backgroundColor: isDarkMode ? '#0a0016' : 'white',
          color: isDarkMode ? 'white' : 'black'
        }}
      >

        <ul>
          {Menus.map(({ name, subMenu }, i) => {
            const isClicked = clicked === i;
            const hasSubMenu = subMenu?.length;
            const itemId = `menu-${i}`;
            const isHovered = hoveredItems[itemId] || false;
            
            return (
              <li key={name} className="">
                <span
                  className="flex-center-between p-4 rounded-md cursor-pointer relative text-lg font-medium"
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
                    className="ml-5"
                  >
                    {subMenu.map(({ name, icon: Icon }, subIndex) => {
                      const subItemId = `submenu-${i}-${subIndex}`;
                      const isSubHovered = hoveredItems[subItemId] || false;
                      
                      return (
                      <li
                        key={name}
                        className="p-2 flex-center rounded-md gap-x-2 cursor-pointer"
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
                          className="p-1 rounded-md"
                          style={{ 
                            backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6',
                          }}
                        >
                          <Icon 
                            size={17} 
                            style={{ 
                              color: isDarkMode ? '#9ca3af' : 'black'
                            }}
                          />
                        </div>
                        <span>
                          {name}
                        </span>
                      </li>
                    )})}
                  </motion.ul>
                )}
              </li>
            );
          })}
        </ul>

      </motion.div>
    </div>
  );
}
