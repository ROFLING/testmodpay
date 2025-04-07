import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesktopMenu({ menu }) {
  const [isHover, toggleHover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
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
      <span className="flex-center gap-1 hover:bg-gray-100 cursor-pointer px-3 py-1 rounded-xl text-black hover:text-gray-900 transition-colors text-lg font-semibold">
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className="sub-menu bg-white shadow-lg"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
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
              menu.subMenu.map((submenu, i) => (
                <div 
                  className="relative cursor-pointer group/menubox" 
                  key={i}
                  onMouseEnter={() => setHoveredItem(i)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {menu.gridCols > 1 && menu?.subMenuHeading?.[i] && (
                    <p className="text-sm mb-4 text-black font-medium">
                      {menu?.subMenuHeading?.[i]}
                    </p>
                  )}
                  <div className="flex-center gap-x-4">
                    <div className="bg-gray-100 w-fit p-2 rounded-md group-hover/menubox:bg-blue-600 group-hover/menubox:text-white duration-300">
                      {submenu.icon && <submenu.icon />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h6 className="font-bold text-black text-lg group-hover/menubox:text-blue-600">{submenu.name}</h6>
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
                      <p className="text-sm text-black font-medium">{submenu.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
