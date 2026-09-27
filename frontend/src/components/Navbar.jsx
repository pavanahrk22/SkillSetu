import { Bell, Search, Menu, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 h-16 px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="mr-4 md:hidden text-slate-500 hover:text-slate-700">
          <Menu size={24} />
        </button>
        <Link to="/" className="flex items-center space-x-2">
          {/* Placeholder for Ashoka Chakra / Logo */}
          <div className="w-8 h-8 rounded-full border-2 border-gov-600 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border border-gov-600"></div>
          </div>
          <span className="text-xl font-bold text-gov-800 hidden sm:block">
            कर्मयोगी<span className="text-saffron-500 ml-1">Analyzer</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search competencies, courses..." 
            className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-gov-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-slate-500 hover:text-gov-600 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-saffron-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role || 'Learner'}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gov-100 text-gov-700 flex items-center justify-center font-bold">
            {user?.name?.charAt(0) || <User size={18} />}
          </div>
          <button onClick={logout} className="text-xs text-red-500 hover:underline">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
