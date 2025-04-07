import { createContext, useContext, useState, useEffect } from 'react';
import { applyThemeDirectly } from '../theme-fix';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Проверяем, есть ли сохраненная тема
  const getSavedTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return false; // По умолчанию светлая тема
    }
    return false;
  };

  const [isDarkMode, setIsDarkMode] = useState(getSavedTheme);

  // Применяем тему при монтировании компонента и при ее изменении
  useEffect(() => {
    // Применяем тему напрямую через стили
    applyThemeDirectly(isDarkMode);
    
    // Сохраняем выбор в localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Используем MutationObserver для отслеживания изменений класса 'dark'
  useEffect(() => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' && 
          mutation.attributeName === 'class'
        ) {
          const hasDarkClass = document.documentElement.classList.contains('dark');
          if (hasDarkClass !== isDarkMode) {
            applyThemeDirectly(hasDarkClass);
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [isDarkMode]);

  // Функция для переключения темы
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      applyThemeDirectly(newValue);
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 