import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  User, 
  Briefcase, 
  Code, 
  LogOut,
  FileText
} from 'lucide-react';
import { useAuth } from '../context.tsx/authContext';

const AdminDashboard = () => {
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const sections = [
    {
      title: 'Personal & About',
      description: 'Manage your personal information and about section',
      icon: User,
      path: '/admin/about',
      color: 'cyan'
    },
    {
      title: 'Technical Skills',
      description: 'Add and manage your technical skills',
      icon: Code,
      path: '/admin/skills',
      color: 'teal'
    },
    {
      title: 'Projects',
      description: 'Showcase your featured projects',
      icon: Briefcase,
      path: '/admin/projects',
      color: 'blue'
    },
    {
      title: 'Work Experience',
      description: 'Add and edit your work experience',
      icon: FileText,
      path: '/admin/experience',
      color: 'indigo'
    },
    {
      title: 'Education',
      description: 'Add and edit your education',
      icon: FileText,
      path: '/admin/education',
      color: 'indigo'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-slate-400 text-sm mt-1">Logged in as {user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500">
                  View Portfolio
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:text-red-400 hover:border-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Manage Your Portfolio</h2>
          <p className="text-slate-400">Update your portfolio content without touching any code</p>
        </div>

        {/* Section Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link key={index} to={section.path}>
                <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer group">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-cyan-500/10 p-3 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;