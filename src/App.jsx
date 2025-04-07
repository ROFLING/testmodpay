import { Menus } from "./utils";
import DesktopMenu from "./components/DesktopMenu";
import MobMenu from "./components/MobMenu";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";
import { useEffect, useState } from "react";
import { applyThemeDirectly } from "./theme-fix";
import "./App.css";

export default function App() {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Предотвращаем мерцание при загрузке страницы
  useEffect(() => {
    setMounted(true);
    // Принудительно применяем тему при загрузке компонента
    applyThemeDirectly(isDarkMode);
  }, []);

  // Следим за изменениями темы
  useEffect(() => {
    if (mounted) {
      applyThemeDirectly(isDarkMode);
    }
  }, [isDarkMode, mounted]);

  if (!mounted) {
    return null;
  }

  // Выводим значение темы в консоль для отладки
  console.log('Current theme isDarkMode:', isDarkMode);

  return (
    <div 
      className="min-h-screen w-full bg-white dark:bg-[#0a0016] lg:select-none transition-colors duration-300"
      style={{ backgroundColor: isDarkMode ? '#0a0016' : 'white' }}
    >
      <header 
        className="h-16 text-[15px] fixed inset-0 flex-center bg-white dark:bg-[#0a0016] z-[9999] transition-colors duration-300 w-full"
        style={{ backgroundColor: isDarkMode ? '#0a0016' : 'white' }}
      >
        <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto">
          <div className="flex-center gap-x-3 z-[999] relative">
            <svg width="32" height="32" viewBox="0 0 258 258" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect 
                width="258" 
                height="258" 
                rx="54.3158" 
                fill={isDarkMode ? '#301c7c' : '#1C58F7'}
                className="transition-colors duration-300"
              />
              <path 
                d="M47.7195 196.895H88.4563V129L129.193 169.737L169.93 129V196.895H210.667V47.5263L129.193 129L47.7195 47.5263V196.895Z" 
                fill="#F4F4F2"
              />
            </svg>
            <span 
              className="font-bold text-black dark:text-white text-2xl transition-colors duration-300"
              style={{ color: isDarkMode ? 'white' : 'black' }}
            >
              MODPayment
            </span>
          </div>

          <ul className="gap-x-1 lg:flex-center hidden z-[9999]">
            {Menus.map((menu) => (
              <DesktopMenu menu={menu} key={menu.name} />
            ))}
          </ul>
          <div className="flex-center gap-x-5 z-[999]">
            <ThemeToggle />
            <button
              aria-label="sign-in"
              className="text-white z-[999] relative px-3 py-1.5 shadow rounded-md flex-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0 font-semibold"
              style={{ 
                backgroundColor: isDarkMode ? '#301c7c' : '#2563eb',
                hover: {
                  backgroundColor: isDarkMode ? '#3f2699' : '#1d4ed8'
                }
              }}
            >
              Sign In
            </button>
            <button
              aria-label="open-account"
              className="text-white z-[999] relative px-3 py-1.5 shadow rounded-md flex-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0 font-semibold"
              style={{ 
                backgroundColor: isDarkMode ? '#301c7c' : '#2563eb',
                hover: {
                  backgroundColor: isDarkMode ? '#3f2699' : '#1d4ed8'
                }
              }}
            >
              Open Account
            </button>
            <div className="lg:hidden">
              <MobMenu Menus={Menus} />
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section 
        className="pt-40 pb-16 bg-white dark:bg-[#0a0016] transition-colors duration-300"
        style={{ backgroundColor: isDarkMode ? '#0a0016' : 'white' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            {/* Left Content */}
            <div className="w-full lg:w-5/12 pt-10 mb-10 lg:mb-0 text-center lg:text-left">
              <h1 
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-black dark:text-white mb-6 leading-tight transition-colors duration-300"
                style={{ color: isDarkMode ? 'white' : 'black' }}
              >
                The Future of<br />Digital<br />Payments
              </h1>
              <p 
                className="text-lg text-black dark:text-gray-300 mb-8 transition-colors duration-300"
                style={{ color: isDarkMode ? '#d1d5db' : 'black' }}
              >
                Global payment solutions for businesses of all sizes.<br />
                Send, spend, and receive payments with ease.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start hidden lg:flex">
                <button 
                  className="text-white px-8 py-4 rounded-lg text-xl font-semibold w-full sm:w-auto transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0"
                  style={{ 
                    backgroundColor: isDarkMode ? '#301c7c' : '#2563eb',
                    hover: {
                      backgroundColor: isDarkMode ? '#3f2699' : '#1d4ed8'
                    }
                  }}
                >
                  Get started
                </button>
              </div>
            </div>
            
            {/* Right Content with Phone */}
            <div className="w-full lg:w-7/12 relative">
              <div className="relative flex justify-center">
                <img 
                  src={isDarkMode ? "/phone2.png" : "/phone.png"} 
                  alt="Mobile App" 
                  className="h-auto rounded-xl w-full max-w-[550px] md:max-w-[550px] lg:max-w-[650px] transition-all duration-500"
                  style={{ 
                    transform: "rotate(6deg)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
