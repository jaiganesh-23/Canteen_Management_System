"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar,
  Clock,
  DollarSign,
  Percent,
  ChefHat,
  Coffee,
  Utensils,
  Sun,
  Moon,
} from "lucide-react"

// Mock menu data with day-wise organization
const initialMenuData = {
  monday: {
    breakfast: [
      {
        id: 1,
        name: "Idli Sambar",
        price: 40,
        tax: 5,
        category: "South Indian",
        description: "Steamed rice cakes with lentil curry",
      },
      {
        id: 2,
        name: "Poha",
        price: 35,
        tax: 5,
        category: "North Indian",
        description: "Flattened rice with vegetables",
      },
    ],
    lunch: [
      { id: 3, name: "Dal Rice", price: 80, tax: 5, category: "Combo", description: "Lentil curry with steamed rice" },
      {
        id: 4,
        name: "Chicken Curry",
        price: 120,
        tax: 5,
        category: "Non-Veg",
        description: "Spicy chicken curry with rice",
      },
    ],
    evening: [
      {
        id: 5,
        name: "Samosa",
        price: 20,
        tax: 5,
        category: "Snacks",
        description: "Crispy pastry with potato filling",
      },
      { id: 6, name: "Tea", price: 15, tax: 5, category: "Beverages", description: "Hot masala tea" },
    ],
    dinner: [
      {
        id: 7,
        name: "Chapati Curry",
        price: 90,
        tax: 5,
        category: "Combo",
        description: "Indian bread with vegetable curry",
      },
      {
        id: 8,
        name: "Fried Rice",
        price: 85,
        tax: 5,
        category: "Rice",
        description: "Stir-fried rice with vegetables",
      },
    ],
  },
  tuesday: {
    breakfast: [
      {
        id: 9,
        name: "Dosa",
        price: 50,
        tax: 5,
        category: "South Indian",
        description: "Crispy crepe with coconut chutney",
      },
      {
        id: 10,
        name: "Upma",
        price: 30,
        tax: 5,
        category: "South Indian",
        description: "Semolina porridge with vegetables",
      },
    ],
    lunch: [
      {
        id: 11,
        name: "Biryani",
        price: 150,
        tax: 5,
        category: "Rice",
        description: "Aromatic rice with spices and meat",
      },
      {
        id: 12,
        name: "Paneer Butter Masala",
        price: 100,
        tax: 5,
        category: "Veg",
        description: "Cottage cheese in rich tomato gravy",
      },
    ],
    evening: [
      { id: 13, name: "Pakora", price: 25, tax: 5, category: "Snacks", description: "Deep-fried vegetable fritters" },
      { id: 14, name: "Coffee", price: 20, tax: 5, category: "Beverages", description: "Hot filter coffee" },
    ],
    dinner: [
      {
        id: 15,
        name: "Noodles",
        price: 80,
        tax: 5,
        category: "Chinese",
        description: "Stir-fried noodles with vegetables",
      },
      { id: 16, name: "Soup", price: 40, tax: 5, category: "Starter", description: "Hot vegetable soup" },
    ],
  },
  // Add more days as needed
}

const daysOfWeek = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
]

const periods = [
  { value: "breakfast", label: "Breakfast", icon: Coffee },
  { value: "lunch", label: "Lunch", icon: Utensils },
  { value: "evening", label: "Evening Snacks", icon: Sun },
  { value: "dinner", label: "Dinner", icon: Moon },
]

export default function MenuManagement() {
  const [menuData, setMenuData] = useState(initialMenuData)
  const [selectedDay, setSelectedDay] = useState("monday")
  const [selectedPeriod, setSelectedPeriod] = useState("breakfast")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    tax: "5",
    category: "",
    description: "",
  })

  const currentItems = menuData[selectedDay]?.[selectedPeriod] || []
  const filteredItems = currentItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.category) return

    const item = {
      id: Date.now(),
      name: newItem.name,
      price: Number.parseFloat(newItem.price),
      tax: Number.parseFloat(newItem.tax),
      category: newItem.category,
      description: newItem.description,
    }

    setMenuData((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedPeriod]: [...(prev[selectedDay]?.[selectedPeriod] || []), item],
      },
    }))

    setNewItem({ name: "", price: "", tax: "5", category: "", description: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setNewItem({
      name: item.name,
      price: item.price.toString(),
      tax: item.tax.toString(),
      category: item.category,
      description: item.description,
    })
    setIsAddDialogOpen(true)
  }

  const handleUpdateItem = () => {
    if (!newItem.name || !newItem.price || !newItem.category) return

    const updatedItem = {
      ...editingItem,
      name: newItem.name,
      price: Number.parseFloat(newItem.price),
      tax: Number.parseFloat(newItem.tax),
      category: newItem.category,
      description: newItem.description,
    }

    setMenuData((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedPeriod]: prev[selectedDay][selectedPeriod].map((item) =>
          item.id === editingItem.id ? updatedItem : item,
        ),
      },
    }))

    setNewItem({ name: "", price: "", tax: "5", category: "", description: "" })
    setEditingItem(null)
    setIsAddDialogOpen(false)
  }

  const handleDeleteItem = (itemId) => {
    setMenuData((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedPeriod]: prev[selectedDay][selectedPeriod].filter((item) => item.id !== itemId),
      },
    }))
  }

  const resetForm = () => {
    setNewItem({ name: "", price: "", tax: "5", category: "", description: "" })
    setEditingItem(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Menu Management</h2>
          <p className="text-muted-foreground">Manage menu items across different days and periods</p>
        </div>
        <Dialog
          open={isAddDialogOpen}
          onOpenChange={(open) => {
            setIsAddDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {editingItem ? "Update the menu item details" : "Add a new item to the menu"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="day" className="text-card-foreground">
                    Day
                  </Label>
                  <Select value={selectedDay} onValueChange={setSelectedDay}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period" className="text-card-foreground">
                    Period
                  </Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-card-foreground">
                  Item Name
                </Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Enter item name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-card-foreground">
                    Price (₹)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax" className="text-card-foreground">
                    Tax (%)
                  </Label>
                  <Input
                    id="tax"
                    type="number"
                    value={newItem.tax}
                    onChange={(e) => setNewItem({ ...newItem, tax: e.target.value })}
                    placeholder="5"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-card-foreground">
                  Category
                </Label>
                <Input
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  placeholder="e.g., South Indian, Beverages"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-card-foreground">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Brief description of the item"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button type="button" onClick={editingItem ? handleUpdateItem : handleAddItem}>
                {editingItem ? "Update Item" : "Add Item"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length === 0 ? (
          <Card className="md:col-span-2 lg:col-span-3 bg-card border-border">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ChefHat className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-card-foreground mb-2">No menu items found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm
                  ? "No items match your search criteria"
                  : `No items available for ${periods.find((p) => p.value === selectedPeriod)?.label} on ${
                      daysOfWeek.find((d) => d.value === selectedDay)?.label
                    }`}
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add First Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item) => (
            <Card key={item.id} className="bg-card border-border hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-card-foreground">{item.name}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button onClick={() => handleEditItem(item)} size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-card border-border">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-card-foreground">Delete Menu Item</AlertDialogTitle>
                          <AlertDialogDescription className="text-muted-foreground">
                            Are you sure you want to delete "{item.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteItem(item.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-primary">₹{item.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Percent className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{item.tax}% tax</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total with tax</p>
                    <p className="font-medium text-card-foreground">
                      ₹{(item.price + (item.price * item.tax) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {filteredItems.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              {periods.find((p) => p.value === selectedPeriod)?.label} Summary -{" "}
              {daysOfWeek.find((d) => d.value === selectedDay)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{filteredItems.length}</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  ₹{Math.min(...filteredItems.map((item) => item.price))}
                </p>
                <p className="text-sm text-muted-foreground">Lowest Price</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  ₹{Math.max(...filteredItems.map((item) => item.price))}
                </p>
                <p className="text-sm text-muted-foreground">Highest Price</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  ₹{(filteredItems.reduce((sum, item) => sum + item.price, 0) / filteredItems.length).toFixed(0)}
                </p>
                <p className="text-sm text-muted-foreground">Average Price</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
