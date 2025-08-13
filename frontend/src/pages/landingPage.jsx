"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  Users,
  TrendingUp,
  Clock,
  Shield,
  BarChart3,
  Utensils,
  Star,
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Target,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function CanteenManagementLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "how-it-works", "testimonials"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getLinkStyles = (section) => {
    const isActive = activeSection === section
    return `font-medium transition-all duration-300 ${
      isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"
    }`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                CanteenPro
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className={getLinkStyles("hero")}>
                Canteen Management System
              </a>
              <a href="#features" className={getLinkStyles("features")}>
                Features
              </a>
              <a href="#how-it-works" className={getLinkStyles("how-it-works")}>
                How It Works
              </a>
              <a href="#testimonials" className={getLinkStyles("testimonials")}>
                Testimonials
              </a>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/50">
              <div className="flex flex-col space-y-4">
                <a href="#hero" className={`${getLinkStyles("hero")} py-2`}>
                  Canteen Management System
                </a>
                <a href="#features" className={`${getLinkStyles("features")} py-2`}>
                  Features
                </a>
                <a href="#how-it-works" className={`${getLinkStyles("how-it-works")} py-2`}>
                  How It Works
                </a>
                <a href="#testimonials" className={`${getLinkStyles("testimonials")} py-2`}>
                  Testimonials
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200/50">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 justify-start">
                    Sign In
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white justify-start">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Component 1: Hero Section */}
      <section
        id="hero"
        className="px-6 py-20 max-w-7xl mx-auto relative mt-16"
        style={{
          backgroundImage: `url('/modern-canteen-kitchen.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "80vh",
        }}
      >
        <div className="absolute inset-0 bg-black/30 rounded-lg"></div>

        <div className="text-center space-y-10 relative z-10 flex flex-col justify-center min-h-[70vh]">
          <div className="flex justify-center items-center space-x-4 mb-8 group">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-white/30">
              <Utensils className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              Canteen Management System
            </h1>
          </div>

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white max-w-5xl mx-auto leading-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              Smart Canteen Management System:
              <span className="relative inline-block mx-2">
                <span className="text-blue-200">Serve Smart</span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-80"></div>
              </span>
              ,
              <span className="relative inline-block mx-2">
                <span className="text-emerald-200">Waste Less</span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-80"></div>
              </span>
              ,
              <span className="relative inline-block mx-2">
                <span className="text-purple-200">Organize Better</span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full opacity-80"></div>
              </span>
              and
              <span className="relative inline-block mx-2">
                <span className="text-amber-200">Profit More</span>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-80"></div>
              </span>
            </h2>
          </div>

          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-2xl [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)]">
            Transform your canteen operations with our intelligent management system. Generate bills instantly, predict
            food quantities with AI, optimize discounts for maximum profit, and streamline your entire workflow.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white/95 text-blue-600 hover:bg-white px-10 py-4 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm"
            >
              <Play className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              Get Started Free
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-10 py-4 text-lg rounded-xl border-2 border-white/80 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group bg-transparent shadow-2xl"
            >
              <span className="group-hover:text-blue-100 transition-colors">Watch Demo</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Component 2: User Stats & Benefits */}
      <section className="px-6 py-20 bg-white/80 backdrop-blur-sm" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Trusted by Canteens Worldwide</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of canteen operators who have transformed their business with measurable results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="text-5xl font-bold mb-2">2,500+</div>
                <div className="text-blue-100 text-lg">Active Canteens</div>
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="text-5xl font-bold mb-2">40%</div>
                <div className="text-green-100 text-lg">Average Waste Reduction</div>
              </div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                <div className="text-5xl font-bold mb-2">25%</div>
                <div className="text-purple-100 text-lg">Profit Increase</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-green-50">
              <CardHeader>
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Boost Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Smart pricing and discount strategies increase your daily profits by up to 25%
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Reduce Waste</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered demand prediction helps you prepare the right quantities, cutting waste by 40%
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-purple-50">
              <CardHeader>
                <div className="bg-gradient-to-br from-purple-400 to-violet-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Save Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Automated billing and inventory management saves 3+ hours daily for your staff
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-orange-50">
              <CardHeader>
                <div className="bg-gradient-to-br from-orange-400 to-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Happy Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Faster service and consistent quality lead to 95% customer satisfaction rates
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Component 3: Features */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Powerful Features for Modern Canteens</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a successful canteen operation, powered by cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm group">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  Smart Billing System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Generate bills instantly with barcode scanning, split payments, and digital receipts
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm group">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  AI Demand Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Predict food quantities needed based on historical data, weather, and events
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm group">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-gradient-to-br from-purple-400 to-violet-500 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  Dynamic Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Optimize discounts and pricing strategies to maximize profit and reduce waste
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm group">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  Inventory Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Track ingredients, monitor stock levels, and automate reorder notifications
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm group">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-gradient-to-br from-red-400 to-pink-500 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Real-time insights on sales, popular items, peak hours, and profit margins
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm group">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <div className="bg-gradient-to-br from-teal-400 to-cyan-500 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  Staff Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Manage shifts, track performance, and streamline communication
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Component 4: How It Works */}
      <section className="px-6 py-20 bg-white/80 backdrop-blur-sm" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h3>
            <p className="text-xl text-gray-600">Get started in just 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">Sign Up</h4>
              <p className="text-gray-600 leading-relaxed">
                Create your account and choose your plan. No credit card required for trial.
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-green-600 transition-colors">Setup Menu</h4>
              <p className="text-gray-600 leading-relaxed">
                Add your menu items, set prices, and configure your canteen preferences.
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500 to-violet-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-purple-600 transition-colors">Train Staff</h4>
              <p className="text-gray-600 leading-relaxed">
                Our team provides comprehensive training to get your staff up to speed quickly.
              </p>
            </div>

            <div className="text-center group cursor-pointer">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                <span className="text-3xl font-bold text-white">4</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-orange-600 transition-colors">Go Live</h4>
              <p className="text-gray-600 leading-relaxed">
                Start serving customers with your new smart canteen management system!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Component 5: Additional Characteristics */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our System?</h3>
            <p className="text-xl text-gray-600">Built for reliability, security, and growth</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  Bank-Grade Security
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Your data is protected with enterprise-level encryption and security protocols.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-green-600 transition-colors">99.9% Uptime</h4>
                <p className="text-gray-600 leading-relaxed">
                  Reliable cloud infrastructure ensures your canteen never stops running.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-purple-400 to-violet-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">24/7 Support</h4>
                <p className="text-gray-600 leading-relaxed">
                  Our dedicated support team is always ready to help you succeed.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                  Scalable Solution
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Grows with your business from single canteen to multi-location chains.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-red-400 to-pink-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                  Real-time Analytics
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Make data-driven decisions with comprehensive reporting and insights.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
              <div className="bg-gradient-to-br from-teal-400 to-cyan-500 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-teal-600 transition-colors">Easy Integration</h4>
                <p className="text-gray-600 leading-relaxed">
                  Seamlessly integrates with existing POS systems and payment processors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component 6: Customer Testimonials */}
      <section className="px-6 py-20 bg-white/80 backdrop-blur-sm" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">What Our Customers Say</h3>
            <p className="text-xl text-gray-600">Real stories from canteen operators who transformed their business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-yellow-50 group">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <CardTitle className="text-xl">Sarah Johnson</CardTitle>
                <CardDescription className="text-gray-500">University Canteen Manager</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed italic">
                  "This system revolutionized our operations! We reduced food waste by 45% and increased profits by 30%.
                  The AI predictions are incredibly accurate."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-blue-50 group">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <CardTitle className="text-xl">Mike Chen</CardTitle>
                <CardDescription className="text-gray-500">Corporate Cafeteria Director</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed italic">
                  "The billing system is lightning fast and the analytics help us make better decisions daily. Our
                  customers love the improved service speed."
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-green-50 group">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <CardTitle className="text-xl">Priya Patel</CardTitle>
                <CardDescription className="text-gray-500">School Canteen Owner</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed italic">
                  "Setup was incredibly easy and the support team was amazing. We're now serving 500+ students
                  efficiently with minimal waste."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Component 7: Footer with CTA */}
      <section className="px-6 py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Canteen?</h3>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of successful canteen operators and start your journey to smarter operations today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
            >
              <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              Start Free Trial
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-lg rounded-xl bg-transparent transition-all duration-300 transform hover:scale-105"
            >
              Book a Demo
            </Button>
          </div>

          <div className="text-blue-100 text-lg">
            <p>No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-4 mb-6 group">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Utensils className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold">Canteen Management System</span>
          </div>
          <p className="text-gray-400 text-lg">© 2024 Canteen Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
