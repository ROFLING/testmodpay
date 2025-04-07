import { Menus } from "./utils";
import DesktopMenu from "./components/DesktopMenu";
import MobMenu from "./components/MobMenu";
import { useEffect, useState } from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-white lg:select-none">
      <header className="h-16 text-[15px] fixed inset-0 flex-center bg-white z-[9999]">
        <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto">
          <div className="flex-center gap-x-3 z-[999] relative">
            <svg width="32" height="32" viewBox="0 0 258 258" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="258" height="258" rx="54.3158" fill="#1C58F7"/>
              <path d="M47.7195 196.895H88.4563V129L129.193 169.737L169.93 129V196.895H210.667V47.5263L129.193 129L47.7195 47.5263V196.895Z" fill="#F4F4F2"/>
            </svg>
            <span className="font-bold text-gray-800 text-2xl">MODPayment</span>
          </div>

          <ul className="gap-x-1 lg:flex-center hidden z-[9999]">
            {Menus.map((menu) => (
              <DesktopMenu menu={menu} key={menu.name} />
            ))}
          </ul>
          <div className="flex-center gap-x-5 z-[999]">
            <button
              aria-label="sign-in"
              className="bg-blue-600 text-white z-[999] relative px-3 py-1.5 shadow rounded-md flex-center hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0 font-semibold"
            >
              Sign In
            </button>
            <button
              aria-label="open-account"
              className="bg-blue-600 text-white z-[999] relative px-3 py-1.5 shadow rounded-md flex-center hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-0 font-semibold"
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
      <section className="pt-40 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
            {/* Left Content */}
            <div className="w-full lg:w-5/12 pt-10 mb-10 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                The Future of<br />Digital<br />Payments
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Global payment solutions for businesses of all sizes.<br />
                Send, spend, and receive payments with ease.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start hidden lg:flex">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold w-full sm:w-auto">
                  Get started
                </button>
              </div>
            </div>
            
            {/* Right Content with Phone */}
            <div className="w-full lg:w-7/12 relative">
              <div className="relative flex justify-center">
                <img 
                  src="/phone.png" 
                  alt="Mobile App" 
                  className="h-auto rounded-xl w-full max-w-[550px] md:max-w-[550px] lg:max-w-[650px]"
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
