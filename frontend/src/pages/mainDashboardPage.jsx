"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Utensils, BarChart3, CreditCard, Menu, Settings, HelpCircle, User, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import MainDashboard from "@/components/main-dashboard"
import BillingComponent from "@/components/billing-component"
import MenuManagement from "@/components/menu-management"

export default function CanteenProDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date()) // Added state for selected date

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.altKey) {
        switch (e.key) {
          case "1":
            e.preventDefault()
            setActiveTab("dashboard")
            break
          case "2":
            e.preventDefault()
            setActiveTab("billing")
            break
          case "3":
            e.preventDefault()
            setActiveTab("menu")
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  const getCurrentPeriod = () => {
    const hour = currentTime.getHours()
    if (hour >= 6 && hour < 11) return "Breakfast"
    if (hour >= 11 && hour < 16) return "Lunch"
    if (hour >= 16 && hour < 19) return "Evening Snacks"
    return "Dinner"
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-blue-200 bg-white/95 backdrop-blur shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
              <Utensils className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">CanteenPro</h1>
              <p className='text-sm'>Main Dashboard</p>
            </div>
          </div>

          <div>
              <h1 className='text-xl font-semibold text-gray-900'>Canteen Name</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <Badge className="text-xs border-blue-300 text-blue-700 bg-blue-100">{getCurrentPeriod()}</Badge>
              <Badge className="text-xs bg-green-100 text-green-700 border-green-300">Live System</Badge>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-start text-left font-normal border-blue-200 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-blue-200" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                  className="border-0"
                />
              </PopoverContent>
            </Popover>

            <div className="text-right hidden md:block">
              <div className="text-sm font-medium text-gray-900">
                {currentTime.toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <div className="text-xs text-gray-600">
                {currentTime.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="sticky top-16 z-40 border-b border-blue-200 bg-white/95 backdrop-blur shadow-sm">
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-blue-50 h-12 border border-blue-200 gap-4 p-2">
              <TabsTrigger
                value="dashboard"
                className="text-sm flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-blue-100 hover:text-blue-700 transition-all rounded-md"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Stats</span>
                <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-white/50 px-1.5 font-mono text-[10px] font-medium text-gray-600 ml-auto">
                  Alt+1
                </kbd>
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="text-sm flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-blue-100 hover:text-blue-700 transition-all rounded-md"
              >
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Billing</span>
                <span className="sm:hidden">Bill</span>
                <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-white/50 px-1.5 font-mono text-[10px] font-medium text-gray-600 ml-auto">
                  Alt+2
                </kbd>
              </TabsTrigger>
              <TabsTrigger
                value="menu"
                className="text-sm flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm hover:bg-blue-100 hover:text-blue-700 transition-all rounded-md"
              >
                <Menu className="h-4 w-4" />
                <span className="hidden sm:inline">Menu</span>
                <span className="sm:hidden">Items</span>
                <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-white/50 px-1.5 font-mono text-[10px] font-medium text-gray-600 ml-auto">
                  Alt+3
                </kbd>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="space-y-6 mt-0">
            <MainDashboard selectedDate={selectedDate} />
          </TabsContent>

          <TabsContent value="billing" className="space-y-6 mt-0">
            <BillingComponent />
          </TabsContent>

          <TabsContent value="menu" className="space-y-6 mt-0">
            <MenuManagement />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-200 bg-white/50 mt-12 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>© 2025 CanteenPro</span>
              <span>•</span>
              <span>Version 1.0</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                Current Period: <span className="text-blue-700 font-medium">{getCurrentPeriod()}</span>
              </span>
              <span>•</span>
              <span>
                System Status: <span className="text-green-700 font-medium">Online</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
