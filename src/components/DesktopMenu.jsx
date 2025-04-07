import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function DesktopMenu({ menu }) {
  const { isDarkMode } = useTheme();
  const [isHover, toggleHover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoverMenuItem, setHoverMenuItem] = useState(false);
  
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.2,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.2,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const arrowAnimate = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  const hasSubMenu = menu?.subMenu?.length;

  // Стили для ховера - гарантируем правильный цвет в зависимости от темы
  const menuItemStyle = {
    color: isDarkMode ? 'white' : 'black',
    backgroundColor: hoverMenuItem 
      ? (isDarkMode ? '#1f2937' /* gray-800 */ : '#f3f4f6' /* gray-100 */) 
      : 'transparent',
    transition: 'background-color 0.2s ease'
  };

  return (
    <motion.li
      className="group/link"
      onHoverStart={() => {
        toggleHoverMenu();
      }}
      onHoverEnd={() => {
        toggleHoverMenu();
        setHoveredItem(null);
      }}
      key={menu.name}
    >
      <span 
        className="flex-center gap-1 cursor-pointer px-3 py-1 rounded-xl text-lg font-semibold"
        style={menuItemStyle}
        onMouseEnter={() => setHoverMenuItem(true)}
        onMouseLeave={() => setHoverMenuItem(false)}
      >
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className={`mt-[0.6px] group-hover/link:rotate-180 duration-200`} style={{color: isDarkMode ? 'white' : 'black'}} />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className="sub-menu shadow-lg transition-colors duration-300"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
          style={{ 
            backgroundColor: isDarkMode ? '#0a0016' : 'white',
          }}
        >
          <div
            className={`grid gap-7 ${
              menu.gridCols === 3
                ? "grid-cols-3"
                : menu.gridCols === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {hasSubMenu &&
              menu.subMenu.map((submenu, i) => {
                const [isItemHovered, setIsItemHovered] = useState(false);
                
                return (
                <div 
                  className="relative cursor-pointer group/menubox p-2 rounded-md" 
                  key={i}
                  onMouseEnter={() => {
                    setHoveredItem(i);
                    setIsItemHovered(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    setIsItemHovered(false);
                  }}
                  style={{
                    backgroundColor: isItemHovered 
                      ? (isDarkMode ? '#1f2937' /* gray-800 */ : '#f3f4f6' /* gray-100 */) 
                      : 'transparent',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {menu.gridCols > 1 && menu?.subMenuHeading?.[i] && (
                    <p 
                      className="text-sm mb-4 font-medium transition-colors duration-300"
                      style={{ color: isDarkMode ? 'white' : 'black' }}
                    >
                      {menu?.subMenuHeading?.[i]}
                    </p>
                  )}
                  <div className="flex-center gap-x-4">
                    <div 
                      className="w-fit p-2 rounded-md group-hover/menubox:bg-blue-600 group-hover/menubox:text-white duration-300 transition-colors"
                      style={{ 
                        backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6',
                      }}
                    >
                      {submenu.icon && <submenu.icon className="group-hover/menubox:text-white" style={{ color: isDarkMode ? 'white' : 'black' }} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h6 
                          className="font-bold text-lg group-hover/menubox:text-blue-600 transition-colors duration-300"
                          style={{ 
                            color: isDarkMode ? 'white' : 'black',
                          }}
                        >
                          {submenu.name}
                        </h6>
                        <AnimatePresence>
                          {hoveredItem === i && (
                            <motion.span
                              variants={arrowAnimate}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              transition={{ duration: 0.2 }}
                              className="text-blue-600 font-bold"
                            >
                              &gt;
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <p 
                        className="text-sm font-medium transition-colors duration-300"
                        style={{ 
                          color: isDarkMode ? '#d1d5db' : 'black',
                        }}
                      >
                        {submenu.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )})}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
