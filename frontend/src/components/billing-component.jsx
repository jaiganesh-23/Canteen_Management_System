"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Download, Printer, Search, Clock } from "lucide-react"

// Mock menu items by period
const menuItems = {
  breakfast: [
    { id: 1, name: "Idli Sambar", price: 40, tax: 5, category: "South Indian" },
    { id: 2, name: "Poha", price: 35, tax: 5, category: "North Indian" },
    { id: 3, name: "Upma", price: 30, tax: 5, category: "South Indian" },
    { id: 4, name: "Paratha", price: 45, tax: 5, category: "North Indian" },
    { id: 5, name: "Dosa", price: 50, tax: 5, category: "South Indian" },
  ],
  lunch: [
    { id: 6, name: "Dal Rice", price: 80, tax: 5, category: "Combo" },
    { id: 7, name: "Chicken Curry", price: 120, tax: 5, category: "Non-Veg" },
    { id: 8, name: "Paneer Butter Masala", price: 100, tax: 5, category: "Veg" },
    { id: 9, name: "Biryani", price: 150, tax: 5, category: "Rice" },
    { id: 10, name: "Roti Sabzi", price: 70, tax: 5, category: "Combo" },
  ],
  evening: [
    { id: 11, name: "Samosa", price: 20, tax: 5, category: "Snacks" },
    { id: 12, name: "Tea", price: 15, tax: 5, category: "Beverages" },
    { id: 13, name: "Coffee", price: 20, tax: 5, category: "Beverages" },
    { id: 14, name: "Pakora", price: 25, tax: 5, category: "Snacks" },
  ],
  dinner: [
    { id: 15, name: "Chapati Curry", price: 90, tax: 5, category: "Combo" },
    { id: 16, name: "Fried Rice", price: 85, tax: 5, category: "Rice" },
    { id: 17, name: "Noodles", price: 80, tax: 5, category: "Chinese" },
    { id: 18, name: "Soup", price: 40, tax: 5, category: "Starter" },
  ],
}

export default function BillingComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState("lunch")
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const currentItems = menuItems[selectedPeriod] || []
  const filteredItems = currentItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) => (cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)),
      )
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId))
    }
  }

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const calculateTax = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity * item.tax) / 100, 0)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF download functionality would be implemented here")
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Billing System</h2>
          <p className="text-muted-foreground">Process orders and generate bills</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Menu Items */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-card-foreground">Menu Items</CardTitle>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="evening">Evening Snacks</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-card-foreground">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">+{item.tax}% tax</span>
                    </div>
                    <p className="text-lg font-semibold text-primary mt-1">₹{item.price}</p>
                  </div>
                  <Button onClick={() => addToCart(item)} size="sm" className="ml-3">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cart & Billing */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <ShoppingCart className="h-5 w-5" />
              Current Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No items in cart</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <h5 className="font-medium text-card-foreground text-sm">{item.name}</h5>
                        <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => removeFromCart(item.id)}
                          size="sm"
                          variant="outline"
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <Button onClick={() => addToCart(item)} size="sm" variant="outline" className="h-6 w-6 p-0">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Bill Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="text-card-foreground">₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="text-card-foreground">₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span className="text-card-foreground">Total:</span>
                    <span className="text-primary">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    Process Payment
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={handlePrint} variant="outline" size="sm" className="text-xs bg-transparent">
                      <Printer className="h-3 w-3 mr-1" />
                      Print
                    </Button>
                    <Button onClick={handleDownloadPDF} variant="outline" size="sm" className="text-xs bg-transparent">
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                  </div>
                  <Button onClick={clearCart} variant="destructive" size="sm" className="w-full text-xs">
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
