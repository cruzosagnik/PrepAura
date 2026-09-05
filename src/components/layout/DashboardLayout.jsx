import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, Bell, Search } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#050505]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-4 sm:px-8">
          
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-2 text-gray-400 rounded-lg hover:bg-white/10 hover:text-orange-500 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-white/10 rounded-xl w-72 text-gray-400">
            <Search className="w-4 h-4" />

            <input
              type="text"
              placeholder="Search interview topics..."
              className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            
            {/* Notification */}
            <button className="relative p-2 text-gray-400 hover:text-orange-500 hover:bg-white/10 rounded-lg transition">
              <Bell className="w-4 h-4" />

              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
            </button>

            {/* User */}
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full border border-orange-500/30 object-cover"
              />
            </div>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto bg-[#050505]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};