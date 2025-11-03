import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, Save, X, Truck, Star, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

const SupplierManagement = ({ userData }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    gstNumber: "",
    panNumber: "",
    suppliedItems: "",
    paymentTerms: "",
    creditPeriod: "",
    rating: "",
    isActive: true,
    bankDetails: {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branch: "",
    },
    notes: "",
  });

  useEffect(() => {
    if (userData?.canteens && userData.canteens.length > 0) {
      setSelectedCanteen(userData.canteens[0]);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedCanteen) {
      fetchSuppliers();
    }
  }, [selectedCanteen]);

  const fetchSuppliers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/suppliers`, {
        params: { canteenId: selectedCanteen._id },
      });
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch suppliers");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      suppliedItems: formData.suppliedItems
        ? formData.suppliedItems.split(",").map((item) => item.trim())
        : [],
      creditPeriod: formData.creditPeriod ? Number(formData.creditPeriod) : 0,
      rating: formData.rating ? Number(formData.rating) : 0,
      canteen: selectedCanteen._id,
      createdBy: userData.id,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (editingId) {
        await axios.put(`${apiUrl}/api/v1/suppliers/${editingId}`, data);
        toast.success("Supplier updated successfully");
      } else {
        await axios.post(`${apiUrl}/api/v1/suppliers`, data);
        toast.success("Supplier created successfully");
      }
      fetchSuppliers();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier._id);
    setFormData({
      name: supplier.name,
      businessName: supplier.businessName || "",
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      alternatePhone: supplier.alternatePhone || "",
      address: supplier.address || {
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      },
      gstNumber: supplier.gstNumber || "",
      panNumber: supplier.panNumber || "",
      suppliedItems: supplier.suppliedItems?.join(", ") || "",
      paymentTerms: supplier.paymentTerms || "",
      creditPeriod: supplier.creditPeriod || "",
      rating: supplier.rating || "",
      isActive: supplier.isActive,
      bankDetails: supplier.bankDetails || {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        branch: "",
      },
      notes: supplier.notes || "",
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this supplier?")) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiUrl}/api/v1/suppliers/${id}`);
      toast.success("Supplier deleted successfully");
      fetchSuppliers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete supplier");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      businessName: "",
      contactPerson: "",
      email: "",
      phone: "",
      alternatePhone: "",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      },
      gstNumber: "",
      panNumber: "",
      suppliedItems: "",
      paymentTerms: "",
      creditPeriod: "",
      rating: "",
      isActive: true,
      bankDetails: {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        branch: "",
      },
      notes: "",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Supplier Management</h2>
          <p className="text-slate-600 mt-1">Manage your suppliers and vendors</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Supplier
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
            {editingId ? "Edit Supplier" : "Add New Supplier"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Supplier Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="alternatePhone">Alternate Phone</Label>
                <Input
                  id="alternatePhone"
                  type="tel"
                  value={formData.alternatePhone}
                  onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-slate-700">Address</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={formData.address.street}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, street: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.address.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, state: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={formData.address.pincode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, pincode: e.target.value },
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.address.country}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, country: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input
                  id="gstNumber"
                  value={formData.gstNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })
                  }
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>
              <div>
                <Label htmlFor="panNumber">PAN Number</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })
                  }
                  placeholder="ABCDE1234F"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="suppliedItems">Supplied Items (comma-separated)</Label>
              <Input
                id="suppliedItems"
                value={formData.suppliedItems}
                onChange={(e) => setFormData({ ...formData, suppliedItems: e.target.value })}
                placeholder="e.g., Rice, Vegetables, Spices"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Input
                  id="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                  placeholder="e.g., Net 30, COD"
                />
              </div>
              <div>
                <Label htmlFor="creditPeriod">Credit Period (days)</Label>
                <Input
                  id="creditPeriod"
                  type="number"
                  value={formData.creditPeriod}
                  onChange={(e) => setFormData({ ...formData, creditPeriod: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-slate-700">Bank Details (Optional)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountHolderName">Account Holder Name</Label>
                  <Input
                    id="accountHolderName"
                    value={formData.bankDetails.accountHolderName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: {
                          ...formData.bankDetails,
                          accountHolderName: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, accountNumber: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    value={formData.bankDetails.ifscCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: {
                          ...formData.bankDetails,
                          ifscCode: e.target.value.toUpperCase(),
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    value={formData.bankDetails.bankName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, bankName: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Input
                    id="branch"
                    value={formData.bankDetails.branch}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankDetails: { ...formData.bankDetails, branch: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                rows="2"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                id="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Active Supplier
              </Label>
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

      {/* Suppliers List */}
      <div className="grid gap-4">
        {suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <Card key={supplier._id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{supplier.name}</h3>
                      {supplier.businessName && (
                        <p className="text-sm text-slate-600">{supplier.businessName}</p>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        supplier.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {supplier.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-slate-600">Contact Person</p>
                      <p className="font-medium">{supplier.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Phone</p>
                      <p className="font-medium">{supplier.phone}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Email</p>
                      <p className="font-medium">{supplier.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{supplier.rating || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm mb-2">
                    <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                    <p className="text-slate-600">
                      {supplier.address.street}, {supplier.address.city},{" "}
                      {supplier.address.state} - {supplier.address.pincode}
                    </p>
                  </div>

                  {supplier.suppliedItems && supplier.suppliedItems.length > 0 && (
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-medium">Supplies:</span>{" "}
                      {supplier.suppliedItems.join(", ")}
                    </p>
                  )}

                  {supplier.paymentTerms && (
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Payment Terms:</span> {supplier.paymentTerms}
                      {supplier.creditPeriod > 0 && ` (${supplier.creditPeriod} days credit)`}
                    </p>
                  )}

                  {supplier.gstNumber && (
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">GST:</span> {supplier.gstNumber}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(supplier)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(supplier._id)}
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
            <Truck className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No suppliers found. Click "Add Supplier" to create one.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SupplierManagement;
