import { motion } from 'framer-motion';

/**
 * Компонент для анимированных переходов между страницами
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @param {string} [props.direction='right'] - Направление анимации ('right', 'left', 'up', 'down')
 * @param {number} [props.duration=0.5] - Длительность анимации в секундах
 * @param {boolean} [props.skipAnimation=false] - Пропустить анимацию (например, при смене темы)
 */
const PageTransition = ({ children, direction = 'right', duration = 0.2, skipAnimation = false }) => {
  // Определяем варианты анимации в зависимости от направления
  const variants = {
    initial: {
      opacity: 0,
      x: direction === 'right' ? '120%' : direction === 'left' ? '-120%' : 0,
      y: direction === 'down' ? '120%' : direction === 'up' ? '-120%' : 0,
      filter: 'blur(12px)',
      scale: 0.85,
      rotateY: direction === 'right' ? -25 : direction === 'left' ? 25 : 0,
      transformOrigin: direction === 'right' ? 'left' : 'right',
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      rotateY: 0,
      transformOrigin: 'center',
    },
    exit: {
      opacity: 0,
      x: direction === 'right' ? '-120%' : direction === 'left' ? '120%' : 0,
      y: direction === 'down' ? '-120%' : direction === 'up' ? '120%' : 0,
      filter: 'blur(12px)',
      scale: 0.85,
      rotateY: direction === 'right' ? 25 : direction === 'left' ? -25 : 0,
      transformOrigin: direction === 'right' ? 'right' : 'left',
    },
  };

  return (
    <motion.div
      variants={skipAnimation ? {} : variants}
      initial={skipAnimation ? false : "initial"}
      animate={skipAnimation ? {} : "animate"}
      exit={skipAnimation ? false : "exit"}
      transition={{
        duration: skipAnimation ? 0 : duration,
        ease: [0.25, 0.1, 0.25, 1],
        opacity: { duration: duration * 0.4 },
        scale: { duration: duration * 0.5, ease: [0.34, 1.1, 0.64, 1] },
        rotateY: { duration: duration * 0.4, ease: [0.34, 1.1, 0.64, 1] },
        x: { type: "tween", ease: "easeInOut" },
        y: { type: "tween", ease: "easeInOut" },
        filter: { duration: duration * 0.3 }
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;