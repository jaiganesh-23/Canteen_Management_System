import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, Save, X, Users, Mail, Phone, UserCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

const StaffManagement = ({ userData }) => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
    phone: "",
    address: "",
    designation: "",
    department: "",
    dateOfJoining: "",
    salary: "",
    shiftTiming: "",
    emergencyContact: "",
    isActive: true,
    canteens: [],
  });

  useEffect(() => {
    if (userData?.canteens && userData.canteens.length > 0) {
      setSelectedCanteen(userData.canteens[0]);
      // Auto-select the current canteen for new staff
      setFormData((prev) => ({ ...prev, canteens: [userData.canteens[0]._id] }));
    }
  }, [userData]);

  useEffect(() => {
    if (selectedCanteen) {
      fetchStaff();
    }
  }, [selectedCanteen]);

  const fetchStaff = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/auth/staff`, {
        params: { canteenId: selectedCanteen._id },
      });
      console.log("Fetched staff members:", response.data);
      setStaffMembers(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch staff members");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      canteens: formData.canteens,
      // Additional staff details (can be stored in metadata or separate staff profile model)
      metadata: {
        phone: formData.phone,
        address: formData.address,
        designation: formData.designation,
        department: formData.department,
        dateOfJoining: formData.dateOfJoining,
        salary: formData.salary ? Number(formData.salary) : undefined,
        shiftTiming: formData.shiftTiming,
        emergencyContact: formData.emergencyContact,
        isActive: formData.isActive,
      },
    };

    // Include password only when creating new staff
    if (!editingId && formData.password) {
      data.password = formData.password;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (editingId) {
        await axios.put(`${apiUrl}/api/v1/auth/staff/${editingId}`, data);
        toast.success("Staff member updated successfully");
      } else {
        await axios.post(`${apiUrl}/api/v1/auth/staff`, data);
        toast.success("Staff member created successfully");
      }
      fetchStaff();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff._id);
    setFormData({
      name: staff.name,
      email: staff.email,
      password: "",
      role: staff.role,
      phone: staff.metadata?.phone || "",
      address: staff.metadata?.address || "",
      designation: staff.metadata?.designation || "",
      department: staff.metadata?.department || "",
      dateOfJoining: staff.metadata?.dateOfJoining
        ? staff.metadata.dateOfJoining.split("T")[0]
        : "",
      salary: staff.metadata?.salary || "",
      shiftTiming: staff.metadata?.shiftTiming || "",
      emergencyContact: staff.metadata?.emergencyContact || "",
      isActive: staff.metadata?.isActive !== undefined ? staff.metadata.isActive : true,
      canteens: staff.canteens?.map((c) => c._id || c) || [],
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiUrl}/api/v1/auth/staff/${id}`);
      toast.success("Staff member deleted successfully");
      fetchStaff();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete staff member");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "staff",
      phone: "",
      address: "",
      designation: "",
      department: "",
      dateOfJoining: "",
      salary: "",
      shiftTiming: "",
      emergencyContact: "",
      isActive: true,
      canteens: userData?.canteens ? [userData.canteens[0]._id] : [],
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const toggleCanteenSelection = (canteenId) => {
    setFormData((prev) => ({
      ...prev,
      canteens: prev.canteens.includes(canteenId)
        ? prev.canteens.filter((id) => id !== canteenId)
        : [...prev.canteens, canteenId],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Staff Management</h2>
          <p className="text-slate-600 mt-1">Manage your staff members and assignments</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Staff
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
            {editingId ? "Edit Staff Member" : "Add New Staff Member"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
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
            </div>

            {!editingId && (
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingId}
                  placeholder="Enter initial password"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g., Chef, Server, Cashier"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <select
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                >
                  <option value="">Select Department</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="service">Service</option>
                  <option value="management">Management</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md"
                rows="2"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="dateOfJoining">Date of Joining</Label>
                <Input
                  id="dateOfJoining"
                  type="date"
                  value={formData.dateOfJoining}
                  onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="salary">Monthly Salary (₹)</Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="shiftTiming">Shift Timing</Label>
                <Input
                  id="shiftTiming"
                  value={formData.shiftTiming}
                  onChange={(e) => setFormData({ ...formData, shiftTiming: e.target.value })}
                  placeholder="e.g., 9 AM - 5 PM"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                placeholder="Name and phone number"
              />
            </div>

            {userData?.canteens && userData.canteens.length > 0 && (
              <div>
                <Label>Assigned Canteens *</Label>
                <p className="text-sm text-slate-600 mb-2">
                  Select the canteens this staff member will work at
                </p>
                <div className="space-y-2">
                  {userData.canteens.map((canteen) => (
                    <div key={canteen._id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`canteen-${canteen._id}`}
                        checked={formData.canteens.includes(canteen._id)}
                        onChange={() => toggleCanteenSelection(canteen._id)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor={`canteen-${canteen._id}`} className="cursor-pointer">
                        {canteen.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                id="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Active Employee
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

      {/* Staff List */}
      <div className="grid gap-4">
        {staffMembers.length > 0 ? (
          staffMembers.map((staff) => (
            <Card key={staff._id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-lg">{staff.name}</h3>
                      {staff.metadata?.designation && (
                        <p className="text-sm text-slate-600">{staff.metadata.designation}</p>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        staff.metadata?.isActive !== false
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {staff.metadata?.isActive !== false ? "Active" : "Inactive"}
                    </span>
                    <span className="text-xs px-2 py-1 rounded font-medium bg-blue-100 text-blue-800 capitalize">
                      {staff.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-slate-600 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        Email
                      </p>
                      <p className="font-medium">{staff.email}</p>
                    </div>
                    {staff.metadata?.phone && (
                      <div>
                        <p className="text-slate-600 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          Phone
                        </p>
                        <p className="font-medium">{staff.metadata.phone}</p>
                      </div>
                    )}
                    {staff.metadata?.department && (
                      <div>
                        <p className="text-slate-600">Department</p>
                        <p className="font-medium capitalize">{staff.metadata.department}</p>
                      </div>
                    )}
                    {staff.metadata?.shiftTiming && (
                      <div>
                        <p className="text-slate-600">Shift</p>
                        <p className="font-medium">{staff.metadata.shiftTiming}</p>
                      </div>
                    )}
                  </div>

                  {staff.canteens && staff.canteens.length > 0 && (
                    <p className="text-sm text-slate-600 mb-2">
                      <span className="font-medium">Assigned Canteens:</span>{" "}
                      {staff.canteens.map((c) => c.name || c).join(", ")}
                    </p>
                  )}

                  {staff.metadata?.dateOfJoining && (
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Joined:</span>{" "}
                      {new Date(staff.metadata.dateOfJoining).toLocaleDateString()}
                    </p>
                  )}

                  {staff.metadata?.emergencyContact && (
                    <p className="text-sm text-slate-600">
                      <span className="font-medium">Emergency Contact:</span>{" "}
                      {staff.metadata.emergencyContact}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(staff)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(staff._id)}
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
            <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No staff members found. Click "Add Staff" to create one.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;
