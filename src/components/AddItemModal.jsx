import { useState } from 'react';
import { X } from 'lucide-react';

const AddItemModal = ({ isOpen, onClose, onAdd }) => {
  // State to hold form inputs
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Engine', // Default category
    stock: '',
    minStock: '',
    price: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the new item data up to the parent component
    onAdd({
      ...formData,
      id: Date.now().toString(), // Simple unique ID for mock data
      stock: parseInt(formData.stock),
      minStock: parseInt(formData.minStock),
      price: parseInt(formData.price)
    });
    
    // Reset form and close modal
    setFormData({ name: '', sku: '', category: 'Engine', stock: '', minStock: '', price: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-slate-800">Add New Part</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Part Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Toyota Brake Pads"
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
              <input required type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="e.g., BP-001"
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 outline-none">
                <option value="Engine">Engine</option>
                <option value="Brakes">Brakes</option>
                <option value="Filters">Filters</option>
                <option value="Fluids">Fluids</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Initial Stock</label>
              <input required type="number" min="0" name="stock" value={formData.stock} onChange={handleChange} placeholder="0"
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Min. Alert Level</label>
              <input required type="number" min="0" name="minStock" value={formData.minStock} onChange={handleChange} placeholder="5"
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cost Price (RWF)</label>
            <input required type="number" min="0" name="price" value={formData.price} onChange={handleChange} placeholder="15000"
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 outline-none" />
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
              Save Part
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;