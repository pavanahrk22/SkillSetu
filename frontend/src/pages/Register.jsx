import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'learner',
    department: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      // handled
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gov-50 via-white to-gov-100 p-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-6 text-center bg-gov-600 text-white">
          <h1 className="text-2xl font-bold mb-1">Create Account</h1>
          <p className="text-gov-100 text-sm">Join the Competency Building Platform</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" name="password" required value={formData.password} onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <select 
                name="role" value={formData.role} onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gov-500 outline-none"
              >
                <option value="learner">Learner / Employee</option>
                <option value="trainer">Trainer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button 
              type="submit" disabled={isLoading}
              className="w-full bg-gov-600 text-white font-semibold py-2.5 rounded-lg hover:bg-gov-700 transition-colors mt-6"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account? <Link to="/login" className="text-gov-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
