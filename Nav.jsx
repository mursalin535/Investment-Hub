import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "News Feed", path: "/newsfeed" },
    { name: "Investment", path: "/investment" },
    {name:"Market",path:'/market'}
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <div className="h-[15vh] w-full flex justify-center items-center py-4 px-4 sticky top-0 z-50 backdrop-blur-sm">
          <div className="w-full max-w-7xl h-full bg-gray-900 rounded-2xl md:rounded-3xl flex flex-row items-center px-4 md:px-6 gap-2 md:gap-4 shadow-2xl border border-gray-800">
            {/* Logo and Branding */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center">
                <img src="/Logo.png" className="w-full h-full rounded-full object-cover border-2 border-amber-200" alt="Logo" />
              </div>

              <div className="flex flex-col">
                <span className="text-lg md:text-xl jost text-white leading-none">Investment</span>
                <span className="text-base md:text-lg jost text-green-400 leading-none">Hub</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-6">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path} 
                  className={({ isActive }) => `heading text-white text-lg transition-colors hover:text-amber-200 whitespace-nowrap ${isActive ? 'text-amber-400 border-b-2 border-green-600' : ''}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop Auth / Profile Links */}
            <div className="hidden lg:flex items-center gap-4">
              <NavLink to="/profile" className={({ isActive }) => `heading text-white text-lg transition-colors hover:text-amber-200 ${isActive ? 'text-amber-400 border-b-2 border-amber-400' : ''}`}>
                Profile
              </NavLink>
              <div className="h-6 w-[1px] bg-gray-700"></div>
              <NavLink to="/login" className="heading text-white text-lg hover:text-amber-200 transition-colors">
                Login
              </NavLink>
              <NavLink to="/signup" className="heading text-white text-lg bg-emerald-500 hover:bg-emerald-600 px-4 py-1 rounded-full transition-colors">
                Sign Up
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex-1 flex justify-end items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Sidebar */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-md" onClick={() => setIsOpen(false)}>
            <div 
              className="absolute right-4 top-[14vh] w-64 bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-800 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `heading text-white text-xl transition-colors ${isActive ? 'text-amber-400 border-b-2 border-green-600 w-fit' : ''}`}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="h-[1px] w-full bg-gray-800"></div>
              <NavLink 
                to="/profile" 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `heading text-white text-xl transition-colors ${isActive ? 'text-amber-400 border-b-2 border-amber-400 w-fit' : ''}`}
              >
                Profile
              </NavLink>
              <div className="flex flex-col gap-4 pt-2">
                <NavLink to="/login" onClick={() => setIsOpen(false)} className="heading text-white text-xl bg-slate-800 text-center py-2 rounded-xl border border-slate-700 transition-colors">
                  Login
                </NavLink>
                <NavLink to="/signup" onClick={() => setIsOpen(false)} className="heading text-white text-xl bg-emerald-500 text-center py-2 rounded-xl transition-colors">
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
}
