import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const PageDots = ({ totalPages = 3, currentPage = 1, onPageChange }) => {
  const [prevPage, setPrevPage] = useState(currentPage);

  useEffect(() => {
    // Обновляем prevPage при изменении currentPage
    setPrevPage(currentPage);
  }, [currentPage]);

  const handlePageClick = (pageNum) => {
    if (pageNum === currentPage) return; // Не делаем ничего, если нажали на текущую страницу
    
    const direction = pageNum > currentPage ? 'right' : 'left';
    onPageChange(pageNum, direction);
  };

  const getDirection = (newPage, oldPage) => {
    return newPage > oldPage ? 'right' : 'left';
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
      <div className="relative flex items-center gap-4">
        {/* Соединительная линия */}
        <div className="absolute w-full h-[2px] bg-gray-300/20 dark:bg-gray-700/20" />
        
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNum = index + 1;
          const isActive = pageNum === currentPage;
          
          return (
            <motion.button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`relative z-10 w-4 h-4 rounded-full transition-all duration-300
                ${isActive ? 'shadow-[0_0_20px_6px_rgba(37,99,235,0.4)] animate-pulse' : ''}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`w-full h-full rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-[#2563eb] dark:bg-[#581c87] shadow-[0_0_15px_3px_rgba(37,99,235,0.4)] dark:shadow-[0_0_15px_3px_rgba(88,28,135,0.4)]'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-[#2563eb] hover:shadow-[0_0_10px_2px_rgba(37,99,235,0.3)] dark:hover:bg-[#581c87] dark:hover:shadow-[0_0_10px_2px_rgba(88,28,135,0.3)]'}`}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PageDots;