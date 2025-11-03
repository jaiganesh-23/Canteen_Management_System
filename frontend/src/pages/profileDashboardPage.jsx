import { useState, useEffect } from "react";
import { User, Store } from "lucide-react";
import ProfileTab from "../components/profile-tab";
import CanteenDashboard from "../components/canteen-dashboard";

const ProfileDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const mainTabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "canteen_dashboard", name: "Canteen Dashboard", icon: Store },
  ];

  const renderContent = () => {
    if (activeTab === "profile") {
      return <ProfileTab userData={userData} setUserData={setUserData} />;
    }

    if (activeTab === "canteen_dashboard") {
      return <CanteenDashboard userData={userData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-72 bg-white shadow-xl border-r border-slate-200 flex flex-col">
          {/* Logo/Header */}
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            {userData && (
              <p className="text-sm text-slate-600 mt-1">
                Welcome, {userData.name}
              </p>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              Canteen Management System
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboardPage;
