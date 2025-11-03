import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, Save, X, Tag } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

const DiscountManagement = ({ userData }) => {
  const [discounts, setDiscounts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    type: "percentage",
    value: "",
    minOrderValue: "",
    maxDiscountAmount: "",
    startDate: "",
    endDate: "",
    usageLimit: "",
    isActive: true,
    applicableToItems: [],
  });

  useEffect(() => {
    if (userData?.canteens && userData.canteens.length > 0) {
      setSelectedCanteen(userData.canteens[0]);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedCanteen) {
      fetchDiscounts();
      fetchMenuItems();
    }
  }, [selectedCanteen]);

  const fetchDiscounts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/discounts`, {
        params: { canteenId: selectedCanteen._id },
      });
      setDiscounts(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch discounts");
    }
  };

  const fetchMenuItems = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/menu`, {
        params: { canteenId: selectedCanteen._id },
      });
      setMenuItems(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch menu items");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      value: Number(formData.value),
      minOrderValue: Number(formData.minOrderValue) || 0,
      maxDiscountAmount: formData.maxDiscountAmount
        ? Number(formData.maxDiscountAmount)
        : undefined,
      usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
      canteen: selectedCanteen._id,
      createdBy: userData.id,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (editingId) {
        await axios.put(`${apiUrl}/api/v1/discounts/${editingId}`, data);
        toast.success("Discount updated successfully");
      } else {
        await axios.post(`${apiUrl}/api/v1/discounts`, data);
        toast.success("Discount created successfully");
      }
      fetchDiscounts();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (discount) => {
    setEditingId(discount._id);
    setFormData({
      name: discount.name,
      code: discount.code,
      description: discount.description || "",
      type: discount.type,
      value: discount.value,
      minOrderValue: discount.minOrderValue || "",
      maxDiscountAmount: discount.maxDiscountAmount || "",
      startDate: discount.startDate ? discount.startDate.split("T")[0] : "",
      endDate: discount.endDate ? discount.endDate.split("T")[0] : "",
      usageLimit: discount.usageLimit || "",
      isActive: discount.isActive,
      applicableToItems: discount.applicableToItems?.map((item) => item._id || item) || [],
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this discount?")) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiUrl}/api/v1/discounts/${id}`);
      toast.success("Discount deleted successfully");
      fetchDiscounts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete discount");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      type: "percentage",
      value: "",
      minOrderValue: "",
      maxDiscountAmount: "",
      startDate: "",
      endDate: "",
      usageLimit: "",
      isActive: true,
      applicableToItems: [],
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const toggleItemSelection = (itemId) => {
    setFormData((prev) => ({
      ...prev,
      applicableToItems: prev.applicableToItems.includes(itemId)
        ? prev.applicableToItems.filter((id) => id !== itemId)
        : [...prev.applicableToItems, itemId],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Discount Management</h2>
          <p className="text-slate-600 mt-1">Manage promotional discounts and offers</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Discount
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
            {editingId ? "Edit Discount" : "Add New Discount"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Discount Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="code">Discount Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Type *</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  required
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div>
                <Label htmlFor="value">
                  Value * {formData.type === "percentage" ? "(%)" : "(₹)"}
                </Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="minOrderValue">Min Order Value (₹)</Label>
                <Input
                  id="minOrderValue"
                  type="number"
                  value={formData.minOrderValue}
                  onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="maxDiscountAmount">Max Discount Amount (₹)</Label>
                <Input
                  id="maxDiscountAmount"
                  type="number"
                  value={formData.maxDiscountAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, maxDiscountAmount: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="usageLimit">Usage Limit (optional)</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  placeholder="Leave empty for unlimited"
                />
              </div>
              <div className="flex items-center gap-2 pt-8">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  Active
                </Label>
              </div>
            </div>

            <div>
              <Label>Applicable Menu Items (optional)</Label>
              <p className="text-sm text-slate-600 mb-2">
                Leave empty to apply to all items
              </p>
              <div className="border border-slate-300 rounded-md p-4 max-h-60 overflow-y-auto">
                {menuItems.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {menuItems.map((item) => (
                      <div key={item._id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`item-${item._id}`}
                          checked={formData.applicableToItems.includes(item._id)}
                          onChange={() => toggleItemSelection(item._id)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor={`item-${item._id}`} className="cursor-pointer text-sm">
                          {item.itemName} - ₹{item.price}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No menu items available</p>
                )}
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

      {/* Discounts List */}
      <div className="grid gap-4">
        {discounts.length > 0 ? (
          discounts.map((discount) => (
            <Card key={discount._id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Tag className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{discount.name}</h3>
                      <p className="text-sm text-slate-600">Code: {discount.code}</p>
                    </div>
                  </div>
                  {discount.description && (
                    <p className="text-slate-600 mb-2">{discount.description}</p>
                  )}
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Type</p>
                      <p className="font-medium capitalize">{discount.type}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Value</p>
                      <p className="font-medium">
                        {discount.type === "percentage" ? `${discount.value}%` : `₹${discount.value}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">Usage</p>
                      <p className="font-medium">
                        {discount.usageCount}/{discount.usageLimit || "∞"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">Status</p>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          discount.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {discount.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(discount)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(discount._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-slate-600">No discounts found. Click "Add Discount" to create one.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DiscountManagement;
