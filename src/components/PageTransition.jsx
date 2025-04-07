import { motion } from 'framer-motion';

/**
 * Компонент для анимированных переходов между страницами
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @param {string} [props.direction='right'] - Направление анимации ('right', 'left', 'up', 'down')
 * @param {number} [props.duration=0.5] - Длительность анимации в секундах
 * @param {boolean} [props.skipAnimation=false] - Пропустить анимацию (например, при смене темы)
 */
const PageTransition = ({ children, direction = 'right', duration = 0.5, skipAnimation = false }) => {
  // Определяем варианты анимации в зависимости от направления
  const variants = {
    initial: {
      opacity: 0,
      x: direction === 'right' ? 100 : direction === 'left' ? -100 : 0,
      y: direction === 'down' ? 100 : direction === 'up' ? -100 : 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: direction === 'right' ? -100 : direction === 'left' ? 100 : 0,
      y: direction === 'down' ? -100 : direction === 'up' ? 100 : 0,
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
        ease: 'easeInOut',
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;