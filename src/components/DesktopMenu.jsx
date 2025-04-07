import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function DesktopMenu({ menu }) {
  const { isDarkMode } = useTheme();
  const [isHover, toggleHover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoverMenuItem, setHoverMenuItem] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const menuButtonRef = useRef(null);
  const submenuRefs = useRef([]);

  // Закрыть подменю при клике вне элемента
  useEffect(() => {
    if (!isHover) return;
    
    const handleClickOutside = (event) => {
      if (
        menuButtonRef.current && 
        !menuButtonRef.current.contains(event.target) &&
        !submenuRefs.current.some(ref => ref && ref.contains(event.target))
      ) {
        toggleHover(false);
        setHoveredItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHover]);
  
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };
  
  // Обработка навигации с клавиатуры
  const handleKeyDown = (e, itemIndex) => {
    // Предотвращаем прокрутку страницы при нажатии стрелок
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    
    // Если нажата клавиша в главном меню
    if (itemIndex === undefined) {
      switch (e.key) {
        case 'Enter':
        case ' ':
        case 'ArrowDown':
          if (menu.subMenu?.length) {
            e.preventDefault();
            toggleHover(true);
            // Фокус на первый элемент подменю
            if (submenuRefs.current[0]) {
              setTimeout(() => submenuRefs.current[0].focus(), 50);
            }
          }
          break;
        case 'Escape':
          if (isHover) {
            e.preventDefault();
            toggleHover(false);
            setHoveredItem(null);
            menuButtonRef.current.focus();
          }
          break;
        case 'Tab':
          // Закрываем подменю при переходе на другой элемент с Tab
          if (isHover && !e.shiftKey) {
            toggleHover(false);
            setHoveredItem(null);
          }
          break;
      }
    } 
    // Если нажата клавиша в подменю
    else {
      const subMenuLength = menu.subMenu.length;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          // Переход к следующему элементу подменю
          if (itemIndex < subMenuLength - 1) {
            const nextIndex = itemIndex + 1;
            setHoveredItem(nextIndex);
            submenuRefs.current[nextIndex]?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          // Переход к предыдущему элементу подменю
          if (itemIndex > 0) {
            const prevIndex = itemIndex - 1;
            setHoveredItem(prevIndex);
            submenuRefs.current[prevIndex]?.focus();
          } else {
            // Возврат к кнопке меню, если мы на первом элементе
            menuButtonRef.current.focus();
            setHoveredItem(null);
          }
          break;
        case 'Escape':
          e.preventDefault();
          // Закрытие подменю и фокус на кнопку меню
          toggleHover(false);
          setHoveredItem(null);
          menuButtonRef.current.focus();
          break;
        case 'Tab':
          // Закрываем подменю при выходе из последнего элемента
          if (itemIndex === subMenuLength - 1 && !e.shiftKey) {
            toggleHover(false);
            setHoveredItem(null);
          } else if (itemIndex === 0 && e.shiftKey) {
            // Закрываем подменю при выходе из первого элемента с Shift+Tab
            toggleHover(false);
            setHoveredItem(null);
          }
          break;
      }
    }
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
      <button 
        ref={menuButtonRef}
        className={`flex-center gap-1 px-3 py-1 rounded-xl text-lg font-semibold transition-colors duration-200
          ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}
          ${(hoverMenuItem || isFocused) ? (isDarkMode ? 'bg-gray-800' : 'bg-gray-100') : 'bg-transparent'}`}
        onMouseEnter={() => setHoverMenuItem(true)}
        onMouseLeave={() => setHoverMenuItem(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={() => toggleHover(!isHover)}
        onKeyDown={(e) => handleKeyDown(e)}
        aria-expanded={isHover}
        aria-haspopup="true"
        aria-controls={hasSubMenu ? `submenu-${menu.name}` : undefined}
      >
        {menu.name}
        {hasSubMenu && (
          <ChevronDown 
            className={`mt-[0.6px] group-hover/link:rotate-180 duration-200 ${isDarkMode ? 'text-white' : 'text-black'}`}
            aria-hidden="true"
          />
        )}
      </button>
      {hasSubMenu && (
        <motion.div
          id={`submenu-${menu.name}`}
          className={`sub-menu shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-[#0a0016]' : 'bg-white'}`}
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
          role="menu"
          aria-orientation="vertical"
        >
          <div
            className={`grid gap-7 ${menu.gridCols === 3 ? "grid-cols-3" : menu.gridCols === 2 ? "grid-cols-2" : "grid-cols-1"}`}
            role="menu"
          >
            {hasSubMenu &&
              menu.subMenu.map((submenu, i) => {
                const [isItemHovered, setIsItemHovered] = useState(false);
                
                return (
                <button 
                  ref={(el) => submenuRefs.current[i] = el}
                  className={`relative group/menubox p-2 rounded-md w-full text-left transition-colors duration-200
                    ${isItemHovered ? (isDarkMode ? 'bg-gray-800' : 'bg-gray-100') : 'bg-transparent'}
                    focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-purple-500' : 'focus:ring-blue-500'}`}
                  key={i}
                  onMouseEnter={() => {
                    setHoveredItem(i);
                    setIsItemHovered(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null);
                    setIsItemHovered(false);
                  }}
                  onFocus={() => setHoveredItem(i)}
                  onBlur={() => setHoveredItem(null)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  role="menuitem"
                  tabIndex={isHover ? 0 : -1}
                >
                  {menu.gridCols > 1 && menu?.subMenuHeading?.[i] && (
                    <p 
                      className={`text-sm mb-4 font-medium transition-colors duration-300
                        ${isDarkMode ? 'text-white' : 'text-black'}`}
                    >
                      {menu?.subMenuHeading?.[i]}
                    </p>
                  )}
                  <div className="flex-center gap-x-4">
                    <div 
                      className={`w-fit p-2 rounded-md transition-colors duration-300
                        ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
                        ${isDarkMode ? 'group-hover/menubox:bg-[#581c87]' : 'group-hover/menubox:bg-blue-600'} group-hover/menubox:text-white`}
                      aria-hidden="true"
                    >
                      {submenu.icon && (
                        <submenu.icon 
                          className={`group-hover/menubox:text-white
                            ${isDarkMode ? 'text-white' : 'text-black'}`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h6 
                          className={`font-bold text-lg transition-colors duration-300
                            ${isDarkMode ? 'text-white' : 'text-black'}
                            group-hover/menubox:${isDarkMode ? 'text-white' : 'text-blue-600'}`}
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
                              className={`transition-colors duration-300 font-bold
                                ${isDarkMode ? 'text-purple-500' : 'text-blue-600'}`}
                              aria-hidden="true"
                            >
                              &gt;
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <p 
                        className={`text-sm font-medium transition-colors duration-300
                          ${isDarkMode ? 'text-gray-300' : 'text-black'}`}
                      >
                        {submenu.desc}
                      </p>
                    </div>
                  </div>
                </button>
              )})}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
