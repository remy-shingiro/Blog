import { useAuth } from '../context/AuthContext';
import { UserCircle, Shield, Building } from 'lucide-react';

const Settings = () => {
  const { user, switchRole } = useAuth();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">System Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Manage garage preferences and user access.</p>
      </div>

      {/* User Profile & Role Switcher (For Testing) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <UserCircle size={32} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800">{user.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Shield size={14} className={user.role === 'MANAGER' ? 'text-purple-500' : 'text-slate-400'} />
            <span className="text-sm font-medium text-slate-500">Current Role: {user.role}</span>
          </div>
          
          {/* Development Testing Tools */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs text-slate-500 font-bold uppercase mb-3">Developer Test: Switch Role</p>
            <div className="flex gap-3">
              <button 
                onClick={() => switchRole('MANAGER')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${user.role === 'MANAGER' ? 'bg-purple-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              >
                Log in as Manager
              </button>
              <button 
                onClick={() => switchRole('MECHANIC')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${user.role === 'MECHANIC' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
              >
                Log in as Mechanic
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Garage Information Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center gap-2">
          <Building size={20} className="text-slate-400" />
          <h3 className="font-semibold text-slate-800">Garage Details</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Garage Name</label>
            <input type="text" disabled defaultValue="Kigali Auto Masters" className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
            <input type="text" disabled defaultValue="RWF (Rwandan Franc)" className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500" />
          </div>
          <p className="text-xs text-slate-400">Settings are locked in this demo version.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;