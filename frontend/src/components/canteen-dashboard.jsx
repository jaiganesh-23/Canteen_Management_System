import { useState } from "react";
import { TrendingUp, Package, Menu, ShoppingCart, Users, Truck } from "lucide-react";
import DiscountManagement from "./discount-management";
import InventoryManagement from "./inventory-management";
import MenuManagement from "./menu-management";
import OrderManagement from "./order-management";
import StaffManagement from "./staff-management";
import SupplierManagement from "./supplier-management";

const CanteenDashboard = ({ userData }) => {
  const [activeSection, setActiveSection] = useState("discounts");

  const sections = [
    { id: "discounts", name: "Discounts", icon: TrendingUp },
    { id: "inventory", name: "Inventory", icon: Package },
    { id: "menu", name: "Menu", icon: Menu },
    { id: "orders", name: "Orders", icon: ShoppingCart },
    { id: "staff", name: "Staff", icon: Users },
    { id: "suppliers", name: "Suppliers", icon: Truck },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "discounts":
        return <DiscountManagement userData={userData} />;
      case "inventory":
        return <InventoryManagement userData={userData} />;
      case "menu":
        return <MenuManagement userData={userData} />;
      case "orders":
        return <OrderManagement userData={userData} />;
      case "staff":
        return <StaffManagement userData={userData} />;
      case "suppliers":
        return <SupplierManagement userData={userData} />;
      default:
        return <DiscountManagement userData={userData} />;
    }
  };

  // Check if user has canteens
  if (!userData?.canteens || userData.canteens.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-slate-600 text-lg">
            {userData?.role === "canteenOwner"
              ? "Please add a canteen in your profile to access the dashboard."
              : "You are not assigned to any canteen yet."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 h-full">
      {/* Left Sub-Navigation */}
      <div className="w-64 space-y-2">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Sections</h3>
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100 bg-white border border-slate-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.name}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1">{renderSection()}</div>
    </div>
  );
};

export default CanteenDashboard;
