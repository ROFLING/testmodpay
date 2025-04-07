/**
 * Функция для принудительного применения темы
 * @param {boolean} isDark - флаг темной темы
 */
export function applyThemeDirectly(isDark) {
  const elements = [
    document.documentElement,
    document.body,
    document.getElementById('root')
  ];
  
  if (isDark) {
    // Применяем темную тему
    document.documentElement.classList.add('dark');
    elements.forEach(el => {
      if (el) {
        el.style.backgroundColor = '#0a0016';
        el.style.color = 'white';
      }
    });
  } else {
    // Применяем светлую тему
    document.documentElement.classList.remove('dark');
    elements.forEach(el => {
      if (el) {
        el.style.backgroundColor = 'white';
        el.style.color = 'black';
      }
    });
  }
} 