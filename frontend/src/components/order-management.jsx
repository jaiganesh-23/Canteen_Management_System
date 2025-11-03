import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Edit, Trash2, Save, X, ShoppingCart, Clock, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

const OrderManagement = ({ userData }) => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    orderType: "dine-in",
    paymentMethod: "cash",
    paymentStatus: "pending",
    orderStatus: "pending",
    tableNumber: "",
    items: [],
    notes: "",
  });

  const orderStatuses = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"];
  const paymentMethods = ["cash", "card", "upi", "netbanking", "wallet"];
  const orderTypes = ["dine-in", "takeaway", "delivery"];

  useEffect(() => {
    if (userData?.canteens && userData.canteens.length > 0) {
      setSelectedCanteen(userData.canteens[0]);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedCanteen) {
      fetchOrders();
      fetchMenuItems();
    }
  }, [selectedCanteen]);

  const fetchOrders = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/orders`, {
        params: { canteenId: selectedCanteen._id },
      });
      setOrders(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
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
    }
  };

  const addOrderItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          menuItem: "",
          itemName: "",
          quantity: 1,
          price: 0,
          subtotal: 0,
          specialInstructions: "",
        },
      ],
    });
  };

  const removeOrderItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateOrderItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === "menuItem") {
      const selectedItem = menuItems.find((item) => item._id === value);
      if (selectedItem) {
        newItems[index].itemName = selectedItem.itemName;
        newItems[index].price = selectedItem.price;
        newItems[index].subtotal = selectedItem.price * newItems[index].quantity;
      }
    }

    if (field === "quantity") {
      newItems[index].subtotal = newItems[index].price * Number(value);
    }

    setFormData({ ...formData, items: newItems });
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.items.length === 0) {
      toast.error("Please add at least one item to the order");
      return;
    }

    const { subtotal, tax, total } = calculateTotals();

    const data = {
      ...formData,
      subtotal,
      tax,
      totalAmount: total,
      canteen: selectedCanteen._id,
      processedBy: userData.id,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (editingId) {
        await axios.put(`${apiUrl}/api/v1/orders/${editingId}`, data);
        toast.success("Order updated successfully");
      } else {
        await axios.post(`${apiUrl}/api/v1/orders`, data);
        toast.success("Order created successfully");
      }
      fetchOrders();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (order) => {
    setEditingId(order._id);
    setFormData({
      customerName: order.customerName || "",
      customerPhone: order.customerPhone || "",
      customerEmail: order.customerEmail || "",
      orderType: order.orderType,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      tableNumber: order.tableNumber || "",
      items: order.items.map((item) => ({
        menuItem: item.menuItem?._id || item.menuItem,
        itemName: item.itemName,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        specialInstructions: item.specialInstructions || "",
      })),
      notes: order.notes || "",
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiUrl}/api/v1/orders/${id}`);
      toast.success("Order deleted successfully");
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete order");
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.put(`${apiUrl}/api/v1/orders/${orderId}`, {
        orderStatus: newStatus,
      });
      toast.success("Order status updated");
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      orderType: "dine-in",
      paymentMethod: "cash",
      paymentStatus: "pending",
      orderStatus: "pending",
      tableNumber: "",
      items: [],
      notes: "",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      preparing: "bg-purple-100 text-purple-800",
      ready: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Order Management</h2>
          <p className="text-slate-600 mt-1">Track and manage customer orders</p>
        </div>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Order
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
            {editingId ? "Edit Order" : "Create New Order"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">Phone</Label>
                <Input
                  id="customerPhone"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="orderType">Order Type *</Label>
                <select
                  id="orderType"
                  value={formData.orderType}
                  onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  required
                >
                  {orderTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="tableNumber">Table Number</Label>
                <Input
                  id="tableNumber"
                  value={formData.tableNumber}
                  onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <select
                  id="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  required
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method}>
                      {method.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="orderStatus">Order Status *</Label>
                <select
                  id="orderStatus"
                  value={formData.orderStatus}
                  onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  required
                >
                  {orderStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Order Items *</Label>
                <Button type="button" size="sm" onClick={addOrderItem}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>
              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <Card key={index} className="p-3">
                    <div className="grid grid-cols-12 gap-2 items-start">
                      <div className="col-span-4">
                        <Label>Menu Item</Label>
                        <select
                          value={item.menuItem}
                          onChange={(e) => updateOrderItem(index, "menuItem", e.target.value)}
                          className="w-full px-2 py-1.5 border border-slate-300 rounded-md text-sm"
                          required
                        >
                          <option value="">Select Item</option>
                          {menuItems.map((menuItem) => (
                            <option key={menuItem._id} value={menuItem._id}>
                              {menuItem.itemName} - ₹{menuItem.price}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateOrderItem(index, "quantity", e.target.value)}
                          className="text-sm"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          value={item.price}
                          className="text-sm"
                          readOnly
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Subtotal</Label>
                        <Input
                          type="number"
                          value={item.subtotal}
                          className="text-sm font-semibold"
                          readOnly
                        />
                      </div>
                      <div className="col-span-2 flex items-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOrderItem(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {formData.items.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No items added. Click "Add Item" to add items to the order.
                  </p>
                )}
              </div>
            </div>

            {formData.items.length > 0 && (
              <Card className="p-4 bg-slate-50">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-medium">₹{calculateTotals().subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax (5%):</span>
                    <span className="font-medium">₹{calculateTotals().tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total:</span>
                    <span>₹{calculateTotals().total.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
            )}

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

      {/* Orders List */}
      <div className="grid gap-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order._id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </div>
                  {order.customerName && (
                    <p className="text-sm text-slate-600">Customer: {order.customerName}</p>
                  )}
                  {order.customerPhone && (
                    <p className="text-sm text-slate-600">Phone: {order.customerPhone}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(order)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(order._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <p className="text-slate-600">Order Type</p>
                  <p className="font-medium capitalize">{order.orderType.replace("-", " ")}</p>
                </div>
                <div>
                  <p className="text-slate-600">Payment</p>
                  <p className="font-medium">{order.paymentMethod.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-slate-600">Total Amount</p>
                  <p className="font-medium text-lg">₹{order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-slate-600">Created</p>
                  <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm font-medium text-slate-700 mb-2">Order Items:</p>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.itemName} x {item.quantity}
                      </span>
                      <span className="font-medium">₹{item.subtotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {order.orderStatus !== "completed" && order.orderStatus !== "cancelled" && (
                <div className="flex gap-2 flex-wrap">
                  <p className="text-sm text-slate-600 w-full mb-1">Quick Actions:</p>
                  {order.orderStatus === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order._id, "confirmed")}
                    >
                      Confirm Order
                    </Button>
                  )}
                  {order.orderStatus === "confirmed" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order._id, "preparing")}
                    >
                      Start Preparing
                    </Button>
                  )}
                  {order.orderStatus === "preparing" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order._id, "ready")}
                    >
                      Mark Ready
                    </Button>
                  )}
                  {order.orderStatus === "ready" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order._id, "completed")}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Complete Order
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusUpdate(order._id, "cancelled")}
                    className="text-red-600"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No orders found. Click "New Order" to create one.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
