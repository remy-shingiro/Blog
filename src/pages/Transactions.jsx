import { useState } from 'react';
import { Search, Filter, ArrowDownRight, ArrowUpRight, User } from 'lucide-react';
import { mockTransactions } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Transactions = () => {
  const { user } = useAuth(); // Get the current user!
  
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [mechanicFilter, setMechanicFilter] = useState("ALL");

  // Step 1: Base the data entirely on who is logged in.
  // Managers see everything. Mechanics ONLY see their own records.
  const baseTransactions = user.role === 'MANAGER' 
    ? mockTransactions 
    : mockTransactions.filter(tx => tx.mechanic === user.name);

  // Get a unique list of mechanics for the Manager's filter dropdown
  const uniqueMechanics = ["ALL", ...new Set(mockTransactions.map(tx => tx.mechanic))];

  // Step 2: Apply the search and dropdown filters to the allowed data
  const filteredTransactions = baseTransactions.filter(tx => {
    const matchesSearch = tx.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "ALL" || tx.type === typeFilter;
    
    // Mechanics don't use the mechanic filter, so we only apply it for managers
    const matchesMechanic = user.role === 'MANAGER' 
      ? (mechanicFilter === "ALL" || tx.mechanic === mechanicFilter) 
      : true; 
    
    return matchesSearch && matchesType && matchesMechanic;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-RW', options);
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* ADAPTIVE HEADER: Changes based on role */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          {user.role === 'MANAGER' ? 'Garage Ledger' : 'My Usage History'}
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          {user.role === 'MANAGER' 
            ? 'A complete, unfiltered history of all parts moving in and out of the garage.' 
            : 'Track the parts you have checked out for your specific repair jobs.'}
        </p>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
        
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
            placeholder="Search by part name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative w-full sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-slate-400" />
          </div>
          <select
            className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 appearance-none"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Movements</option>
            <option value="OUT">Parts Out (Used)</option>
            <option value="IN">Parts In (Restock)</option>
          </select>
        </div>

        {/* ADAPTIVE FILTER: Only Managers get to filter by specific staff */}
        {user.role === 'MANAGER' && (
          <div className="relative w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-slate-400" />
            </div>
            <select
              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-slate-50 appearance-none"
              value={mechanicFilter}
              onChange={(e) => setMechanicFilter(e.target.value)}
            >
              {uniqueMechanics.map(name => (
                <option key={name} value={name}>{name === "ALL" ? "All Staff" : name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Part Name</th>
                <th className="px-6 py-4 font-semibold text-center">Qty</th>
                
                {/* ADAPTIVE COLUMN: Mechanics don't need to see their own name on every row */}
                {user.role === 'MANAGER' && (
                  <th className="px-6 py-4 font-semibold">User / Mechanic</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-500">{formatDate(tx.date)}</td>
                    <td className="px-6 py-4">
                      {tx.type === 'IN' ? (
                        <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 w-max">
                          <ArrowDownRight size={14} /> RESTOCK
                        </span>
                      ) : (
                        <span className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 w-max">
                          <ArrowUpRight size={14} /> USED
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">{tx.itemName}</td>
                    <td className="px-6 py-4 text-center font-bold text-slate-700">{tx.quantity}</td>
                    
                    {/* ADAPTIVE DATA: Hide the mechanic cell if the user is a mechanic */}
                    {user.role === 'MANAGER' && (
                      <td className="px-6 py-4 text-slate-600">{tx.mechanic}</td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  {/* Adjust colSpan based on role so the empty state message spans correctly */}
                  <td colSpan={user.role === 'MANAGER' ? "5" : "4"} className="px-6 py-12 text-center text-slate-500">
                    <p className="text-lg font-medium text-slate-600">No transactions found</p>
                    <p className="text-sm mt-1">
                      {user.role === 'MANAGER' ? 'Adjust your filters to see more data.' : 'You have not checked out any parts yet.'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;