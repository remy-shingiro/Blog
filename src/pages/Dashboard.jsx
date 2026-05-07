import { Package, AlertTriangle, DollarSign, Activity } from 'lucide-react';
import { mockInventory, mockTransactions } from '../data/mockData';

const Dashboard = () => {
  // Calculate Dashboard Metrics
  const totalItems = mockInventory.length;
  const lowStockItems = mockInventory.filter(item => item.stock <= item.minStock);
  const totalInventoryValue = mockInventory.reduce((total, item) => total + (item.stock * item.price), 0);

  // Format currency for readability
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>
        <p className="text-slate-500 text-sm mt-1">Here is what is happening in your garage today.</p>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Items Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Unique Parts</p>
            <p className="text-2xl font-bold text-slate-800">{totalItems}</p>
          </div>
        </div>

        {/* Low Stock Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-lg text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Low Stock Alerts</p>
            <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
          </div>
        </div>

        {/* Inventory Value Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Value</p>
            <p className="text-xl font-bold text-slate-800">{formatCurrency(totalInventoryValue)}</p>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Today's Movements</p>
            <p className="text-2xl font-bold text-slate-800">
              {mockTransactions.filter(t => new Date(t.date).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Urgent Actions: Low Stock Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-red-50/30">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <AlertTriangle size={18} className="text-red-500" />
              Items Needing Reorder
            </h3>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Part Name</th>
                  <th className="px-5 py-3 font-medium text-center">Current</th>
                  <th className="px-5 py-3 font-medium text-center">Minimum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lowStockItems.length > 0 ? (
                  lowStockItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3 font-medium text-slate-700">{item.name}</td>
                      <td className="px-5 py-3 text-center text-red-600 font-bold">{item.stock}</td>
                      <td className="px-5 py-3 text-center text-slate-500">{item.minStock}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-5 py-8 text-center text-slate-500">
                      All inventory levels are looking good!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions Snippet */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Recent Movements</h3>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Part</th>
                  <th className="px-5 py-3 font-medium text-center">Type</th>
                  <th className="px-5 py-3 font-medium">Mechanic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockTransactions.slice(0, 4).map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 truncate max-w-[150px]">{tx.itemName}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        tx.type === 'IN' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {tx.type} {tx.quantity}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{tx.mechanic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;