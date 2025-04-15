import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { X, Mail, Lock, User, Building2, Eye, EyeOff } from 'lucide-react';

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { isDarkMode } = useTheme();
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // Password visibility and fields state
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  const [accountType, setAccountType] = useState('personal');
  const [companyName, setCompanyName] = useState('');

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  const switchMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`relative w-full max-w-md rounded-2xl p-6 shadow-xl transition-colors duration-300
              ${isDarkMode ? 'bg-[#0a0016] text-white' : 'bg-white text-black'}`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute right-4 top-4 p-1 rounded-full transition-colors duration-200
                ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {mode === 'login' 
                  ? 'Sign in to access the platform'
                  : 'Fill in the form to create a new account'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {mode === 'register' && (
                <div className="flex gap-3 p-1 mb-6 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <button
                    type="button"
                    onClick={() => setAccountType('personal')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors duration-200
                      ${accountType === 'personal' 
                        ? (isDarkMode ? 'bg-[#581c87] text-white' : 'bg-blue-600 text-white')
                        : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    <User size={18} />
                    <span>Personal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('business')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-colors duration-200
                      ${accountType === 'business' 
                        ? (isDarkMode ? 'bg-[#581c87] text-white' : 'bg-blue-600 text-white')
                        : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    <Building2 size={18} />
                    <span>Business</span>
                  </button>
                </div>
              )}
              
              {accountType === 'business' && mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">Company Name</label>
                  <div className={`flex items-center gap-2 p-2 rounded-lg border transition-colors duration-200
                    ${isDarkMode 
                      ? 'border-gray-800 focus-within:border-[#581c87] bg-gray-900/50' 
                      : 'border-gray-300 focus-within:border-blue-600'}`}
                  >
                    <Building2 size={18} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={`flex-1 bg-transparent outline-none text-sm placeholder:${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <div className={`flex items-center gap-2 p-2 rounded-lg border transition-colors duration-200
                    ${isDarkMode 
                      ? `border-${emailError ? 'red-500' : 'gray-800'} focus-within:border-${emailError ? 'red-500' : '[#581c87]'} bg-gray-900/50` 
                      : `border-${emailError ? 'red-500' : 'gray-300'} focus-within:border-${emailError ? 'red-500' : 'blue-600'}`}`}
                  >
                    <Mail size={18} className={`${emailError ? 'text-red-500' : (isDarkMode ? 'text-gray-300' : 'text-gray-400')}`} />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value === '') {
                          setEmailError('');
                        } else if (!validateEmail(e.target.value)) {
                          setEmailError('Invalid email format');
                        } else {
                          setEmailError('');
                        }
                      }}
                      className={`flex-1 bg-transparent outline-none text-sm placeholder:${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                  </div>
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Password</label>
                  <div className={`flex items-center gap-2 p-2 rounded-lg border transition-colors duration-200
                    ${isDarkMode 
                      ? 'border-gray-800 focus-within:border-[#581c87] bg-gray-900/50' 
                      : 'border-gray-300 focus-within:border-blue-600'}`}
                  >
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`} />
                      ) : (
                        <Eye size={18} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`} />
                      )}
                    </button>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`flex-1 bg-transparent outline-none text-sm placeholder:${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                

                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
                    <div className={`flex items-center gap-2 p-2 rounded-lg border transition-colors duration-200
                      ${isDarkMode 
                        ? 'border-gray-800 focus-within:border-[#581c87] bg-gray-900/50' 
                        : 'border-gray-300 focus-within:border-blue-600'}`}
                    >
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`} />
                        ) : (
                          <Eye size={18} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`} />
                        )}
                      </button>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setPasswordError(password !== e.target.value ? 'Passwords do not match' : '');
                        }}
                        className={`flex-1 bg-transparent outline-none text-sm placeholder:${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        autoComplete="new-password"
                      />
                    </div>
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                    )}
                  </div>
                )}

                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">PIN Code</label>
                    <div className={`flex items-center gap-2 p-2 rounded-lg border transition-colors duration-200
                      ${isDarkMode 
                        ? 'border-gray-800 focus-within:border-[#581c87] bg-gray-900/50' 
                        : 'border-gray-300 focus-within:border-blue-600'}`}
                    >
                      <Lock size={18} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-400'}`} />
                      <input
                        type="password"
                        placeholder="••••"
                        maxLength={4}
                        className={`flex-1 bg-transparent outline-none text-sm placeholder:${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-all duration-200
                  ${isDarkMode 
                    ? 'bg-[#581c87] hover:bg-opacity-90 hover:brightness-110' 
                    : 'bg-blue-600 hover:bg-opacity-90 hover:brightness-110'}`}
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>

              <div className="text-center mt-4">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  <button
                    type="button"
                    onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
                    className={`ml-1 font-medium transition-colors duration-200
                      ${isDarkMode ? 'text-[#581c87] hover:text-[#6d28d9]' : 'text-blue-600 hover:text-blue-700'}`}
                  >
                    {mode === 'login' ? 'Register' : 'Sign In'}
                  </button>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}