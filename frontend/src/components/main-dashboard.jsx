"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Trash2,
  Coffee,
  Utensils,
  Moon,
  Sun,
  Calendar,
} from "lucide-react"
import { format, isToday, isYesterday, differenceInDays } from "date-fns"

export default function MainDashboard({ selectedDate = new Date() }) {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const getDateDisplayText = () => {
    if (isToday(selectedDate)) return "Today's"
    if (isYesterday(selectedDate)) return "Yesterday's"
    const daysDiff = differenceInDays(new Date(), selectedDate)
    if (daysDiff > 0) return `${daysDiff} days ago`
    return format(selectedDate, "MMM dd")
  }

  const generateDataForDate = (baseData, date) => {
    const seed = date.getDate() + date.getMonth() * 31
    return baseData.map((item) => ({
      ...item,
      sales: Math.floor(item.sales * (0.8 + (seed % 100) / 250)), // Vary sales by ±20%
      wastage: Math.floor(item.wastage * (0.7 + (seed % 50) / 100)), // Vary wastage
      items: Math.floor(item.items * (0.8 + (seed % 80) / 200)), // Vary items
    }))
  }

  // Base data templates
  const baseDailySalesData = [
    { period: "Breakfast", sales: 2400, wastage: 120, items: 45 },
    { period: "Lunch", sales: 4800, wastage: 200, items: 89 },
    { period: "Evening", sales: 1600, wastage: 80, items: 32 },
    { period: "Dinner", sales: 3200, wastage: 150, items: 67 },
  ]

  const baseWeeklySalesData = [
    { day: "Mon", sales: 12000 },
    { day: "Tue", sales: 15000 },
    { day: "Wed", sales: 11000 },
    { day: "Thu", sales: 16000 },
    { day: "Fri", sales: 18000 },
    { day: "Sat", sales: 14000 },
    { day: "Sun", sales: 13000 },
  ]

  const dailySalesData = generateDataForDate(baseDailySalesData, selectedDate)
  const weeklySalesData = generateDataForDate(baseWeeklySalesData, selectedDate)

  const wastageData = dailySalesData.map((item, index) => ({
    name: item.period,
    value: item.wastage,
    color: ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b"][index],
  }))

  const totalDailySales = dailySalesData.reduce((sum, item) => sum + item.sales, 0)
  const totalWastage = dailySalesData.reduce((sum, item) => sum + item.wastage, 0)
  const totalWeeklySales = weeklySalesData.reduce((sum, item) => sum + item.sales, 0)
  const totalMonthlySales = totalWeeklySales * 4.3 // Approximate monthly

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">
            {isToday(selectedDate)
              ? "Real-time canteen analytics and reports"
              : `Analytics for ${format(selectedDate, "EEEE, MMMM dd, yyyy")}`}
          </p>
        </div>
        {!isToday(selectedDate) && (
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
            <Calendar className="h-4 w-4" />
            {format(selectedDate, "MMM dd, yyyy")}
          </div>
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">{getDateDisplayText()} Sales</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹{totalDailySales.toLocaleString()}</div>
            <div className="flex items-center text-xs text-gray-600">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              {isToday(selectedDate) ? "+12.5% from yesterday" : "Historical data"}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-teal-50 border-2 border-teal-200 hover:border-teal-300 transition-all shadow-sm hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Weekly Sales</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-teal-100 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">₹{totalWeeklySales.toLocaleString()}</div>
            <div className="flex items-center text-xs text-gray-600">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              +8.2% from last week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-green-50 border-2 border-green-200 hover:border-green-300 transition-all shadow-sm hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Monthly Sales</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{Math.round(totalMonthlySales).toLocaleString()}</div>
            <div className="flex items-center text-xs text-gray-600">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-orange-50 border-2 border-orange-200 hover:border-orange-300 transition-all shadow-sm hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Food Wastage</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Trash2 className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalWastage}kg</div>
            <div className="flex items-center text-xs text-gray-600">
              <TrendingDown className="mr-1 h-3 w-3 text-green-600" />
              -5.1% from yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Sales by Period */}
        <Card className="bg-white border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-600"></div>
              {getDateDisplayText()} Sales by Period
            </CardTitle>
            <p className="text-sm text-gray-600">Revenue breakdown for each meal period</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                <XAxis dataKey="period" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "2px solid #ddd6fe",
                    borderRadius: "8px",
                    color: "#1f2937",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} stroke="#2563eb" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Sales Trend */}
        <Card className="bg-white border-2 border-teal-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-teal-600"></div>
              Weekly Sales Trend
            </CardTitle>
            <p className="text-sm text-gray-600">Sales performance over the week</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "2px solid #a7f3d0",
                    borderRadius: "8px",
                    color: "#1f2937",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#06b6d4"
                  strokeWidth={4}
                  dot={{
                    fill: "#06b6d4",
                    strokeWidth: 3,
                    r: 6,
                    stroke: "white",
                  }}
                  activeDot={{
                    r: 8,
                    fill: "#06b6d4",
                    stroke: "white",
                    strokeWidth: 3,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Period Details and Wastage */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Period Performance */}
        <Card className="lg:col-span-2 bg-white border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Period Performance</CardTitle>
            <p className="text-sm text-gray-600">Detailed breakdown by meal periods</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailySalesData.map((period, index) => {
                const icons = [Coffee, Utensils, Sun, Moon]
                const Icon = icons[index]
                const colors = ["#3b82f6", "#06b6d4", "#10b981", "#f59e0b"] // Blue, Teal, Green, Orange
                const bgColors = ["bg-blue-50", "bg-teal-50", "bg-green-50", "bg-orange-50"]
                const borderColors = ["border-blue-200", "border-teal-200", "border-green-200", "border-orange-200"]

                return (
                  <div
                    key={period.period}
                    className={`flex items-center justify-between p-4 rounded-lg ${bgColors[index]} border-2 ${borderColors[index]} hover:border-opacity-60 transition-all`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl border-2"
                        style={{
                          backgroundColor: `${colors[index]}15`,
                          borderColor: colors[index],
                        }}
                      >
                        <Icon className="h-6 w-6" style={{ color: colors[index] }} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{period.period}</p>
                        <p className="text-sm text-gray-600">{period.items} items sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg" style={{ color: colors[index] }}>
                        ₹{period.sales.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">{period.wastage}kg waste</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Wastage Distribution */}
        <Card className="bg-white border-2 border-orange-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Wastage Distribution</CardTitle>
            <p className="text-sm text-gray-600">Food waste by period</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={wastageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="white"
                  strokeWidth={3}
                >
                  {wastageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "2px solid #fed7aa",
                    borderRadius: "8px",
                    color: "#1f2937",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {wastageData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm p-2 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full border-2 border-white"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{item.value}kg</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
