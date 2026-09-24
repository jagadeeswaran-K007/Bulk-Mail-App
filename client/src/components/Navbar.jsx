import React, { useState } from 'react';

export default function Navbar({ activeTab, setActiveTab, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      <header className="bg-[#111613] text-white px-6 py-5 flex justify-between items-center font-['Roboto',sans-serif] relative z-20">
        {/* Title & Subtitle (Increased size on small screens) */}
        <div>
          <h1 className="text-4xl sm:text-4xl font-black tracking-wide text-[#3366ff]">
            Bulk Mail
          </h1>
          <p className="text-md sm:text-base text-gray-300 font-bold mt-0.5">
            Email Management System
          </p>
        </div>

        {/* Desktop Links (> 680px) */}
        <nav className="hidden min-[681px]:flex items-center gap-8">
          <a
            href="#send"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('send');
            }}
            className={`text-lg font-bold transition-colors duration-200 cursor-pointer ${
              activeTab === 'send' ? 'text-[#3366ff]' : 'text-gray-300 hover:text-[#3366ff]'
            }`}
          >
            Send Mail
          </a>

          <a
            href="#history"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('history');
            }}
            className={`text-lg font-bold transition-colors duration-200 cursor-pointer ${
              activeTab === 'history' ? 'text-[#3366ff]' : 'text-gray-300 hover:text-[#3366ff]'
            }`}
          >
            History
          </a>

          <button
            onClick={onLogout}
            className="px-5 py-2.5 rounded-lg text-base font-bold bg-[#e63956] text-white transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md ml-4 cursor-pointer"
          >
            Logout
          </button>
        </nav>

        {/* Hamburger Icon (Small screens <= 680px) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="max-[680px]:block hidden focus:outline-none p-2 cursor-pointer"
          aria-label="Toggle Menu"
        >
          <i
            className="fa-solid fa-bars fa-flip-both fa-2xl"
            style={{ color: 'rgb(51, 102, 255)' }}
          ></i>
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 max-[680px]:block hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#111613] border-r-2 border-[#3366ff] z-40 p-6 flex flex-col justify-between transition-transform duration-300 max-[680px]:block hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header inside Menu: Title & Subtitle*/}
          <div className="flex justify-between items-start mb-8 pb-4 border-b border-gray-800">
            <div>
              <h2 className="text-2xl font-black text-[#3366ff] leading-tight">
                Bulk Mail
              </h2>
              <p className="text-sm text-gray-300 font-medium mt-1">
                Email Management System
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-[#3366ff] p-1 text-2xl cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-3">
            <a
              href="#send"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('send');
              }}
              className={`flex items-center gap-3 p-3.5 rounded-xl font-bold text-base transition ${
                activeTab === 'send'
                  ? 'bg-[#3366ff] text-white'
                  : 'text-gray-300 hover:bg-[#111613] hover:text-white'
              }`}
            >
              <i className="fa-solid fa-paper-plane"></i>
              Send Mail
            </a>

            <a
              href="#history"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('history');
              }}
              className={`flex items-center gap-3 p-3.5 rounded-xl font-bold text-base transition ${
                activeTab === 'history'
                  ? 'bg-[#3366ff] text-white'
                  : 'text-gray-300 hover:bg-[#111613] hover:text-white'
              }`}
            >
              <i className="fa-solid fa-clock-rotate-left"></i>
              History
            </a>
          </nav>
        </div>

        {/* Footer Area: Logout Button Only */}
        <div className="pt-4 border-t border-gray-800">
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="w-full py-3.5 bg-[#e63956]/10 text-[#e63956] border border-[#e63956]/30 font-bold rounded-xl transition-transform duration-200 hover:scale-105 hover:bg-[#e63956] hover:text-white flex items-center justify-center gap-2 cursor-pointer text-base"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}