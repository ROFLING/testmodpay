import { Menus } from "./utils";
import DesktopMenu from "./components/DesktopMenu";
import MobMenu from "./components/MobMenu";
import ThemeToggle from "./components/ThemeToggle";
import AuthModal from "./components/AuthModal";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTransition from "./components/PageTransition";
import PageDots from "./components/PageDots";
import { useTheme } from "./context/ThemeContext";
import { useEffect, useState, useRef, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { applyThemeDirectly } from "./theme-fix";
import { AnimatePresence } from "framer-motion";
import "./App.css";

function MainApp() {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({ light: false, dark: false });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState('right');
  const lightImageRef = useRef(null);
  const darkImageRef = useRef(null);

  const preloadImages = useCallback(() => {
    const lightImage = new Image();
    const darkImage = new Image();
    
    lightImage.onload = () => setImagesLoaded(prev => ({ ...prev, light: true }));
    darkImage.onload = () => setImagesLoaded(prev => ({ ...prev, dark: true }));
    
    lightImage.src = "/phone.png";
    darkImage.src = "/phone2.png";
    
    return () => {
      lightImage.onload = null;
      darkImage.onload = null;
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    applyThemeDirectly(isDarkMode);
    preloadImages();
  }, [isDarkMode, preloadImages]);

  if (!mounted) {
    return null;
  }

  return (
    <div 
      className="min-h-screen w-full lg:select-none bg-white dark:bg-[#0a0016] transition-colors duration-300"
    >
      <header 
        className="h-16 text-[15px] fixed inset-0 flex-center bg-white dark:bg-[#0a0016] z-[9999] transition-colors duration-300 w-full"
      >
        <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto">
          <div className="flex-center gap-x-3 z-[999] relative">
            <svg width="32" height="32" viewBox="0 0 258 258" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect 
                width="258" 
                height="258" 
                rx="54.3158" 
                className="transition-colors duration-300 fill-[#1C58F7] dark:fill-[#581c87]"
              />
              <path 
                d="M47.7195 196.895H88.4563V129L129.193 169.737L169.93 129V196.895H210.667V47.5263L129.193 129L47.7195 47.5263V196.895Z" 
                fill="#F4F4F2"
              />
            </svg>
            <span 
              className="font-bold text-black dark:text-white text-2xl transition-colors duration-300"
            >
              MODPayment
            </span>
          </div>

          <ul className="hidden lg:flex lg:items-center gap-x-1 z-[9999]">
            {Menus.map((menu) => (
              <DesktopMenu menu={menu} key={menu.name} />
            ))}
          </ul>
          <div className="flex-center gap-x-5 z-[999]">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <button
              aria-label="sign-in"
              className="hidden lg:flex theme-button px-3 py-1.5 z-[999] bg-[#2563eb] dark:bg-[#581c87] transition-colors duration-300 hover:bg-opacity-90 hover:brightness-110"
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
            >
              Sign In
            </button>
            <button
              aria-label="open-account"
              className="hidden lg:flex theme-button px-3 py-1.5 z-[999] bg-[#2563eb] dark:bg-[#581c87] transition-colors duration-300 hover:bg-opacity-90 hover:brightness-110"
              onClick={() => {
                setAuthModalMode('register');
                setIsAuthModalOpen(true);
              }}
            >
              Open Account
            </button>
            <div className="lg:hidden">
              <MobMenu 
                Menus={Menus} 
                onOpenAuth={(mode) => {
                  setAuthModalMode(mode);
                  setIsAuthModalOpen(true);
                }}
              />
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <PageTransition key={currentPage} direction={direction} duration={0.6}>
          <section 
            className="pt-40 pb-16 bg-white dark:bg-[#0a0016] transition-colors duration-300"
          >
          {currentPage === 1 && (
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
                <div className="w-full lg:w-5/12 pt-10 mb-10 lg:mb-0 text-center lg:text-left">
                  <h1 
                    className="text-4xl md:text-5xl lg:text-7xl font-bold text-black dark:text-white mb-6 leading-tight transition-colors duration-300"
                  >
                    The Future of<br />Digital<br />Payments
                  </h1>
                  <p 
                    className="text-lg text-black dark:text-gray-300 mb-8 transition-colors duration-300"
                  >
                    Global payment solutions for businesses of all sizes.<br />
                    Send, spend, and receive payments with ease.
                  </p>
                  <div className="hidden lg:flex flex-wrap gap-4 justify-center lg:justify-start">
                    <button 
                      className="theme-button px-8 py-4 text-xl w-full sm:w-auto bg-[#2563eb] dark:bg-[#581c87] transition-colors duration-300 hover:bg-opacity-90 hover:brightness-110"
                    >
                      Get started
                    </button>
                  </div>
                </div>
                
                <div className="w-full lg:w-7/12 relative">
                  <div className="relative flex justify-center">
                    <div className="phone-container">
                      <img 
                        ref={lightImageRef}
                        src="/phone.png" 
                        alt="Mobile App Light" 
                        className={`phone-image light-phone transition-opacity duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                      />
                      <img 
                        ref={darkImageRef}
                        src="/phone2.png" 
                        alt="Mobile App Dark" 
                        className={`phone-image dark-phone transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentPage === 2 && (
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                  Secure Transactions
                </h2>
                <p className="text-lg text-black dark:text-gray-300 mb-8">
                  Top-level protection for your payments
                </p>
              </div>
            </div>
          )}
          {currentPage === 3 && (
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                  Global Capabilities
                </h2>
                <p className="text-lg text-black dark:text-gray-300 mb-8">
                  Send and receive payments worldwide
                </p>
              </div>
            </div>
          )}
          {currentPage === 4 && (
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
                  Innovative Solutions
                </h2>
                <p className="text-lg text-black dark:text-gray-300 mb-8">
                  Use cutting-edge technologies to grow your business
                </p>
              </div>
            </div>
          )}
          </section>
        </PageTransition>
      </AnimatePresence>
      <PageDots
        totalPages={4}
        currentPage={currentPage}
        onPageChange={(page, direction) => {
          setDirection(direction);
          setCurrentPage(page);
        }}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
