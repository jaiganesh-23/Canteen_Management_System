import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Lock, Building2, MapPin, Edit, Plus, Save, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

const ProfileTab = ({ userData, setUserData }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingCanteen, setIsEditingCanteen] = useState(false);
  const [isAddingCanteen, setIsAddingCanteen] = useState(false);
  const [selectedCanteen, setSelectedCanteen] = useState(null);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Canteen form state
  const [canteenForm, setCanteenForm] = useState({
    name: "",
    location: "",
  });

  useEffect(() => {
    if (userData) {
      setProfileForm({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [userData]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (profileForm.password && profileForm.password !== profileForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const updateData = {
        name: profileForm.name,
        email: profileForm.email,
      };

      if (profileForm.password) {
        updateData.password = profileForm.password;
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.put(
        `${apiUrl}/api/v1/auth/profile/${userData.id}`,
        updateData
      );

      if (response.data.success) {
        toast.success("Profile updated successfully");
        setUserData(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsEditingProfile(false);
        setProfileForm({ ...profileForm, password: "", confirmPassword: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleCanteenUpdate = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.put(
        `${apiUrl}/api/v1/canteens/${selectedCanteen._id}`,
        canteenForm
      );

      if (response.data.success) {
        toast.success("Canteen updated successfully");
        // Refresh user data
        const userResponse = await axios.get(`${apiUrl}/api/v1/auth/profile/${userData.id}`);
        setUserData(userResponse.data.user);
        localStorage.setItem("user", JSON.stringify(userResponse.data.user));
        setIsEditingCanteen(false);
        setSelectedCanteen(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update canteen");
    }
  };

  const handleCanteenAdd = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/v1/canteens/register`, {
        name: canteenForm.name,
        location: canteenForm.location,
        owners: [userData.id],
      });

      if (response.data.success) {
        toast.success("Canteen added successfully");
        // Refresh user data
        const userResponse = await axios.get(`${apiUrl}/api/v1/auth/profile/${userData.id}`);
        setUserData(userResponse.data.user);
        localStorage.setItem("user", JSON.stringify(userResponse.data.user));
        setIsAddingCanteen(false);
        setCanteenForm({ name: "", location: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add canteen");
    }
  };

  const startEditCanteen = (canteen) => {
    setSelectedCanteen(canteen);
    setCanteenForm({
      name: canteen.name,
      location: canteen.location || "",
    });
    setIsEditingCanteen(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Profile Information</h2>
          {!isEditingProfile && (
            <Button
              onClick={() => setIsEditingProfile(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>

        {!isEditingProfile ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Name</p>
                <p className="font-medium text-slate-800">{userData?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="font-medium text-slate-800">{userData?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Role</p>
                <p className="font-medium text-slate-800 capitalize">
                  {userData?.role === "canteenOwner" ? "Canteen Owner" : "Staff"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">New Password (optional)</Label>
              <Input
                id="password"
                type="password"
                value={profileForm.password}
                onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                placeholder="Leave blank to keep current password"
              />
            </div>
            {profileForm.password && (
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={profileForm.confirmPassword}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditingProfile(false);
                  setProfileForm({
                    name: userData?.name || "",
                    email: userData?.email || "",
                    password: "",
                    confirmPassword: "",
                  });
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Card>

      {/* Canteen Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Canteen Information</h2>
          {userData?.role === "canteenOwner" && !isAddingCanteen && !isEditingCanteen && (
            <Button
              onClick={() => setIsAddingCanteen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Canteen
            </Button>
          )}
        </div>

        {/* Add Canteen Form */}
        {isAddingCanteen && (
          <form onSubmit={handleCanteenAdd} className="space-y-4 mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-slate-800">Add New Canteen</h3>
            <div>
              <Label htmlFor="canteen-name">Canteen Name</Label>
              <Input
                id="canteen-name"
                value={canteenForm.name}
                onChange={(e) => setCanteenForm({ ...canteenForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="canteen-location">Location</Label>
              <Input
                id="canteen-location"
                value={canteenForm.location}
                onChange={(e) => setCanteenForm({ ...canteenForm, location: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Canteen
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingCanteen(false);
                  setCanteenForm({ name: "", location: "" });
                }}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Canteen List */}
        {userData?.canteens && userData.canteens.length > 0 ? (
          <div className="space-y-4">
            {userData.canteens.map((canteen) => (
              <div
                key={canteen._id}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {isEditingCanteen && selectedCanteen?._id === canteen._id ? (
                  <form onSubmit={handleCanteenUpdate} className="space-y-4">
                    <div>
                      <Label htmlFor="edit-canteen-name">Canteen Name</Label>
                      <Input
                        id="edit-canteen-name"
                        value={canteenForm.name}
                        onChange={(e) =>
                          setCanteenForm({ ...canteenForm, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-canteen-location">Location</Label>
                      <Input
                        id="edit-canteen-location"
                        value={canteenForm.location}
                        onChange={(e) =>
                          setCanteenForm({ ...canteenForm, location: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsEditingCanteen(false);
                          setSelectedCanteen(null);
                          setCanteenForm({ name: "", location: "" });
                        }}
                        className="flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-slate-600">Canteen Name</p>
                            <p className="font-semibold text-slate-800">{canteen.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-slate-500" />
                          <div>
                            <p className="text-sm text-slate-600">Location</p>
                            <p className="font-medium text-slate-700">
                              {canteen.location || "Not specified"}
                            </p>
                          </div>
                        </div>
                      </div>
                      {userData?.role === "canteenOwner" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditCanteen(canteen)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 text-center py-8">
            {userData?.role === "canteenOwner"
              ? "No canteens added yet. Click 'Add Canteen' to get started."
              : "No canteens assigned yet."}
          </p>
        )}
      </Card>
    </div>
  );
};

export default ProfileTab;
