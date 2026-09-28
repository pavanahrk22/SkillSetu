import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Target, BookOpen, FileQuestion, Users } from 'lucide-react';
import Navbar from './Navbar';
import { useState } from 'react';

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const learnerLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: Users },
    { name: 'Gap Analysis', path: '/gaps', icon: Target },
    { name: 'Learning Paths', path: '/courses', icon: BookOpen },
    { name: 'Assessments', path: '/assessment', icon: FileQuestion },
  ];

  const adminLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Workforce Gaps', path: '/admin/gaps', icon: Target },
    { name: 'Training Programs', path: '/admin/training', icon: BookOpen },
  ];

  const links = user?.role === 'admin' ? adminLinks : learnerLinks;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-white border-r border-slate-200 p-4 transition-all`}>
          <nav className="space-y-2 mt-4">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gov-50 text-gov-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-gov-600'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-gov-600' : 'text-slate-400'} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;