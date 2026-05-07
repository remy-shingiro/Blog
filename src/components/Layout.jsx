import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Wrench, ArrowLeftRight } from 'lucide-react';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to style active links
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 flex items-center justify-between px-4 z-20">
        <h1 className="text-xl font-bold text-white">
          Garage<span className="text-blue-500">Flow</span>
        </h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-slate-900 w-64 p-4 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0 mt-16 md:mt-0' : '-translate-x-full'
        }`}
      >
        <div className="hidden md:block mb-10 px-2 mt-4">
          <h1 className="text-2xl font-bold text-white">
            Garage<span className="text-blue-500">Flow</span>
          </h1>
        </div>

        <nav className="space-y-2 flex flex-col">
          <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </NavLink>
          <NavLink to="/inventory" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>
            <Wrench size={20} />
            <span className="font-medium">Inventory</span>
          </NavLink>
          <NavLink to="/transactions" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>
            <ArrowLeftRight size={20} />
            <span className="font-medium">Transactions</span>
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto mt-16 md:mt-0 p-4 md:p-8">
        {/* <Outlet /> is where the current routed page will render */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;