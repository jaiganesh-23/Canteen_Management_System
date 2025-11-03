import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, Save, X, Menu, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

const MenuManagement = ({ userData }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "snacks",
    subcategory: "",
    price: "",
    preparationTime: "",
    isAvailable: true,
    isVegetarian: false,
    isVegan: false,
    allergens: "",
    imageUrl: "",
    availableDays: [],
    availableTimeSlots: { start: "", end: "" },
  });

  const categories = ["breakfast", "lunch", "dinner", "snacks", "beverages", "desserts"];
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  useEffect(() => {
    if (userData?.canteens && userData.canteens.length > 0) {
      setSelectedCanteen(userData.canteens[0]);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedCanteen) {
      fetchMenuItems();
      fetchInventoryItems();
    }
  }, [selectedCanteen]);

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

  const fetchInventoryItems = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/inventory`, {
        params: { canteenId: selectedCanteen._id },
      });
      setInventoryItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      price: Number(formData.price),
      preparationTime: formData.preparationTime ? Number(formData.preparationTime) : undefined,
      allergens: formData.allergens ? formData.allergens.split(",").map((a) => a.trim()) : [],
      availableTimeSlots:
        formData.availableTimeSlots.start && formData.availableTimeSlots.end
          ? formData.availableTimeSlots
          : undefined,
      canteen: selectedCanteen._id,
      createdBy: userData.id,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (editingId) {
        await axios.put(`${apiUrl}/api/v1/menu/${editingId}`, data);
        toast.success("Menu item updated successfully");
      } else {
        await axios.post(`${apiUrl}/api/v1/menu`, data);
        toast.success("Menu item created successfully");
      }
      fetchMenuItems();
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
      description: item.description || "",
      category: item.category,
      subcategory: item.subcategory || "",
      price: item.price,
      preparationTime: item.preparationTime || "",
      isAvailable: item.isAvailable,
      isVegetarian: item.isVegetarian,
      isVegan: item.isVegan,
      allergens: item.allergens?.join(", ") || "",
      imageUrl: item.imageUrl || "",
      availableDays: item.availableDays || [],
      availableTimeSlots: item.availableTimeSlots || { start: "", end: "" },
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiUrl}/api/v1/menu/${id}`);
      toast.success("Menu item deleted successfully");
      fetchMenuItems();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete menu item");
    }
  };

  const resetForm = () => {
    setFormData({
      itemName: "",
      description: "",
      category: "snacks",
      subcategory: "",
      price: "",
      preparationTime: "",
      isAvailable: true,
      isVegetarian: false,
      isVegan: false,
      allergens: "",
      imageUrl: "",
      availableDays: [],
      availableTimeSlots: { start: "", end: "" },
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Menu Management</h2>
          <p className="text-slate-600 mt-1">Manage your menu items and pricing</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Menu Item
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
            {editingId ? "Edit Menu Item" : "Add New Menu Item"}
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
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                rows="2"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="e.g., South Indian, Chinese"
                />
              </div>
              <div>
                <Label htmlFor="preparationTime">Prep Time (mins)</Label>
                <Input
                  id="preparationTime"
                  type="number"
                  value={formData.preparationTime}
                  onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="allergens">Allergens (comma-separated)</Label>
              <Input
                id="allergens"
                value={formData.allergens}
                onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                placeholder="e.g., Nuts, Dairy, Gluten"
              />
            </div>

            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Available Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.availableTimeSlots.start}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availableTimeSlots: { ...formData.availableTimeSlots, start: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="endTime">Available End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.availableTimeSlots.end}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availableTimeSlots: { ...formData.availableTimeSlots, end: e.target.value },
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Available Days</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {daysOfWeek.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      formData.availableDays.includes(day)
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1).substring(0, 2)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <input
                  id="isAvailable"
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="isAvailable" className="cursor-pointer">
                  Available
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="isVegetarian"
                  type="checkbox"
                  checked={formData.isVegetarian}
                  onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="isVegetarian" className="cursor-pointer">
                  Vegetarian
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="isVegan"
                  type="checkbox"
                  checked={formData.isVegan}
                  onChange={(e) => setFormData({ ...formData, isVegan: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="isVegan" className="cursor-pointer">
                  Vegan
                </Label>
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

      {/* Menu Items List */}
      <div className="grid gap-4">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <Card key={item._id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{item.itemName}</h3>
                      {item.isVegetarian && (
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded">
                          Veg
                        </span>
                      )}
                      {item.isVegan && (
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded">
                          Vegan
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          item.isAvailable
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-slate-600 text-sm mb-2">{item.description}</p>
                    )}
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Category</p>
                        <p className="font-medium capitalize">{item.category}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Price</p>
                        <p className="font-medium">₹{item.price}</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Prep Time</p>
                        <p className="font-medium">{item.preparationTime || "N/A"} mins</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Popularity</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{item.popularityScore || 0}</span>
                        </div>
                      </div>
                    </div>
                    {item.allergens && item.allergens.length > 0 && (
                      <p className="text-sm text-slate-600 mt-2">
                        Allergens: {item.allergens.join(", ")}
                      </p>
                    )}
                    {item.availableDays && item.availableDays.length > 0 && (
                      <p className="text-sm text-slate-600">
                        Available: {item.availableDays.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(", ")}
                      </p>
                    )}
                  </div>
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
          ))
        ) : (
          <Card className="p-8 text-center">
            <Menu className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No menu items found. Click "Add Menu Item" to create one.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;
