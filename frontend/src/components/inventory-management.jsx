import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, Save, X, Package, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

const InventoryManagement = ({ userData }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    unit: "kg",
    currentStock: "",
    minStockLevel: "",
    maxStockLevel: "",
    reorderPoint: "",
    unitPrice: "",
    supplier: "",
    lastRestocked: "",
    expiryDate: "",
    storageLocation: "",
  });

  useEffect(() => {
    if (userData?.canteens && userData.canteens.length > 0) {
      setSelectedCanteen(userData.canteens[0]);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedCanteen) {
      fetchInventory();
      fetchSuppliers();
    }
  }, [selectedCanteen]);

  const fetchInventory = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/inventory`, {
        params: { canteenId: selectedCanteen._id },
      });
      setInventoryItems(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch inventory");
    }
  };

  const fetchSuppliers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/suppliers`, {
        params: { canteenId: selectedCanteen._id },
      });
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.minStockLevel) > Number(formData.maxStockLevel)) {
      toast.error("Min stock level cannot be greater than max stock level");
      return;
    }

    const data = {
      ...formData,
      currentStock: Number(formData.currentStock),
      minStockLevel: Number(formData.minStockLevel),
      maxStockLevel: Number(formData.maxStockLevel),
      reorderPoint: Number(formData.reorderPoint),
      unitPrice: Number(formData.unitPrice),
      supplier: formData.supplier || undefined,
      lastRestocked: formData.lastRestocked || undefined,
      expiryDate: formData.expiryDate || undefined,
      canteen: selectedCanteen._id,
      createdBy: userData.id,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (editingId) {
        await axios.put(`${apiUrl}/api/v1/inventory/${editingId}`, data);
        toast.success("Inventory item updated successfully");
      } else {
        await axios.post(`${apiUrl}/api/v1/inventory`, data);
        toast.success("Inventory item created successfully");
      }
      fetchInventory();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      itemName: item.itemName,
      category: item.category,
      unit: item.unit,
      currentStock: item.currentStock,
      minStockLevel: item.minStockLevel,
      maxStockLevel: item.maxStockLevel,
      reorderPoint: item.reorderPoint,
      unitPrice: item.unitPrice,
      supplier: item.supplier?._id || "",
      lastRestocked: item.lastRestocked ? item.lastRestocked.split("T")[0] : "",
      expiryDate: item.expiryDate ? item.expiryDate.split("T")[0] : "",
      storageLocation: item.storageLocation || "",
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this inventory item?")) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiUrl}/api/v1/inventory/${id}`);
      toast.success("Inventory item deleted successfully");
      fetchInventory();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete inventory item");
    }
  };

  const resetForm = () => {
    setFormData({
      itemName: "",
      category: "",
      unit: "kg",
      currentStock: "",
      minStockLevel: "",
      maxStockLevel: "",
      reorderPoint: "",
      unitPrice: "",
      supplier: "",
      lastRestocked: "",
      expiryDate: "",
      storageLocation: "",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const getStockStatus = (item) => {
    if (item.currentStock <= item.minStockLevel) {
      return { status: "critical", color: "bg-red-100 text-red-800", label: "Critical" };
    } else if (item.currentStock <= item.reorderPoint) {
      return { status: "low", color: "bg-yellow-100 text-yellow-800", label: "Low Stock" };
    } else {
      return { status: "good", color: "bg-green-100 text-green-800", label: "Good" };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventory Management</h2>
          <p className="text-slate-600 mt-1">Manage your stock and inventory items</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Item
          </Button>
        )}
      </div>

      {/* Canteen Selector */}
      {userData?.canteens && userData.canteens.length > 1 && (
        <div className="flex gap-2">
          {userData.canteens.map((canteen) => (
            <Button
              key={canteen._id}
              variant={selectedCanteen?._id === canteen._id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCanteen(canteen)}
            >
              {canteen.name}
            </Button>
          ))}
        </div>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Inventory Item" : "Add New Inventory Item"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="itemName">Item Name *</Label>
                <Input
                  id="itemName"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Vegetables, Dairy, Spices"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="unit">Unit *</Label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  required
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="l">Liter (l)</option>
                  <option value="ml">Milliliter (ml)</option>
                  <option value="pcs">Pieces (pcs)</option>
                  <option value="dozen">Dozen</option>
                  <option value="box">Box</option>
                  <option value="packet">Packet</option>
                </select>
              </div>
              <div>
                <Label htmlFor="currentStock">Current Stock *</Label>
                <Input
                  id="currentStock"
                  type="number"
                  step="0.01"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="unitPrice">Unit Price (₹) *</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="minStockLevel">Min Stock Level *</Label>
                <Input
                  id="minStockLevel"
                  type="number"
                  step="0.01"
                  value={formData.minStockLevel}
                  onChange={(e) => setFormData({ ...formData, minStockLevel: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="maxStockLevel">Max Stock Level *</Label>
                <Input
                  id="maxStockLevel"
                  type="number"
                  step="0.01"
                  value={formData.maxStockLevel}
                  onChange={(e) => setFormData({ ...formData, maxStockLevel: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="reorderPoint">Reorder Point *</Label>
                <Input
                  id="reorderPoint"
                  type="number"
                  step="0.01"
                  value={formData.reorderPoint}
                  onChange={(e) => setFormData({ ...formData, reorderPoint: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <select
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier._id} value={supplier._id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="storageLocation">Storage Location</Label>
                <Input
                  id="storageLocation"
                  value={formData.storageLocation}
                  onChange={(e) => setFormData({ ...formData, storageLocation: e.target.value })}
                  placeholder="e.g., Freezer A, Shelf 2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lastRestocked">Last Restocked</Label>
                <Input
                  id="lastRestocked"
                  type="date"
                  value={formData.lastRestocked}
                  onChange={(e) => setFormData({ ...formData, lastRestocked: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {editingId ? "Update" : "Create"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Inventory List */}
      <div className="grid gap-4">
        {inventoryItems.length > 0 ? (
          inventoryItems.map((item) => {
            const stockStatus = getStockStatus(item);
            return (
              <Card key={item._id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-lg">{item.itemName}</h3>
                        <p className="text-sm text-slate-600">{item.category}</p>
                      </div>
                      {stockStatus.status !== "good" && (
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Current Stock</p>
                        <p className="font-medium">
                          {item.currentStock} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Unit Price</p>
                        <p className="font-medium">₹{item.unitPrice}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Reorder Point</p>
                        <p className="font-medium">
                          {item.reorderPoint} {item.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600">Supplier</p>
                        <p className="font-medium">{item.supplier?.name || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Status</p>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${stockStatus.color}`}
                        >
                          {stockStatus.label}
                        </span>
                      </div>
                    </div>
                    {item.storageLocation && (
                      <p className="text-sm text-slate-600 mt-2">
                        Location: {item.storageLocation}
                      </p>
                    )}
                    {item.expiryDate && (
                      <p className="text-sm text-slate-600">
                        Expires: {new Date(item.expiryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-8 text-center">
            <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No inventory items found. Click "Add Item" to create one.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;
