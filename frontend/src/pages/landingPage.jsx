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
  const [activeHovers, setActiveHovers] = useState({})

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
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTouchStart = (id) => {
    setActiveHovers((prev) => ({ ...prev, [id]: true }))
  }

  const handleTouchEnd = (id) => {
    setTimeout(() => {
      setActiveHovers((prev) => ({ ...prev, [id]: false }))
    }, 300) // Keep effect for 300ms after touch ends
  }

  const getLinkStyles = (section) => {
    const isActive = activeSection === section
    return `font-medium transition-all duration-300 ${
      isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700 hover:text-blue-600"
    }`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center space-x-3 group cursor-pointer"
              onTouchStart={() => handleTouchStart("nav-logo")}
              onTouchEnd={() => handleTouchEnd("nav-logo")}
            >
              <div
                className={`bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 ${
                  activeHovers["nav-logo"] ? "shadow-xl shadow-blue-500/50 scale-105 rotate-3" : ""
                }`}
              >
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <span
                className={`text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors ${
                  activeHovers["nav-logo"] ? "text-blue-600" : ""
                }`}
              >
                CanteenPro
              </span>
            </div>

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

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className={`text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 ${
                  activeHovers["nav-signin"] ? "text-blue-600 bg-blue-50 scale-105 shadow-lg shadow-blue-500/30" : ""
                }`}
                onTouchStart={() => handleTouchStart("nav-signin")}
                onTouchEnd={() => handleTouchEnd("nav-signin")}
              >
                Sign In
              </Button>
              <Button
                className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                  activeHovers["nav-getstarted"] ? "shadow-xl shadow-blue-500/50 scale-105 -translate-y-0.5" : ""
                }`}
                onTouchStart={() => handleTouchStart("nav-getstarted")}
                onTouchEnd={() => handleTouchEnd("nav-getstarted")}
              >
                Get Started
              </Button>
            </div>

            <button
              className={`md:hidden p-2 rounded-lg hover:bg-gray-100 hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300 ${
                activeHovers["nav-menu"] ? "bg-gray-100 shadow-lg shadow-gray-500/30" : ""
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onTouchStart={() => handleTouchStart("nav-menu")}
              onTouchEnd={() => handleTouchEnd("nav-menu")}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/50 animate-in slide-in-from-top duration-300">
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
                  <Button
                    variant="ghost"
                    className={`text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/30 justify-start ${
                      activeHovers["mobile-signin"] ? "text-blue-600 bg-blue-50 shadow-lg shadow-blue-500/30" : ""
                    }`}
                    onTouchStart={() => handleTouchStart("mobile-signin")}
                    onTouchEnd={() => handleTouchEnd("mobile-signin")}
                  >
                    Sign In
                  </Button>
                  <Button
                    className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/50 text-white justify-start ${
                      activeHovers["mobile-getstarted"] ? "shadow-xl shadow-blue-500/50" : ""
                    }`}
                    onTouchStart={() => handleTouchStart("mobile-getstarted")}
                    onTouchEnd={() => handleTouchEnd("mobile-getstarted")}
                  >
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
          <div
            className="flex justify-center items-center space-x-4 mb-8 group"
            onTouchStart={() => handleTouchStart("hero-logo")}
            onTouchEnd={() => handleTouchEnd("hero-logo")}
          >
            <div
              className={`bg-white/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:shadow-white/50 transition-all duration-500 group-hover:scale-105 group-hover:rotate-6 border border-white/30 ${
                activeHovers["hero-logo"] ? "shadow-xl shadow-white/50 scale-105 rotate-6" : ""
              }`}
            >
              <Utensils
                className={`h-10 w-10 text-white animate-pulse ${activeHovers["hero-logo"] ? "animate-spin" : ""}`}
              />
            </div>
            <h1 className="text-5xl font-bold text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              Canteen Management System
            </h1>
          </div>

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white max-w-5xl mx-auto leading-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              Smart Canteen Management System:
              <span
                className="relative inline-block mx-2 group"
                onTouchStart={() => handleTouchStart("hero-serve")}
                onTouchEnd={() => handleTouchEnd("hero-serve")}
              >
                <span
                  className={`text-blue-200 group-hover:text-blue-100 transition-colors ${
                    activeHovers["hero-serve"] ? "text-blue-100" : ""
                  }`}
                >
                  Serve Smart
                </span>
                <div
                  className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity animate-pulse ${
                    activeHovers["hero-serve"] ? "opacity-100" : ""
                  }`}
                ></div>
              </span>
              ,
              <span
                className="relative inline-block mx-2 group"
                onTouchStart={() => handleTouchStart("hero-waste")}
                onTouchEnd={() => handleTouchEnd("hero-waste")}
              >
                <span
                  className={`text-emerald-200 group-hover:text-emerald-100 transition-colors ${
                    activeHovers["hero-waste"] ? "text-emerald-100" : ""
                  }`}
                >
                  Waste Less
                </span>
                <div
                  className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity animate-pulse delay-100 ${
                    activeHovers["hero-waste"] ? "opacity-100" : ""
                  }`}
                ></div>
              </span>
              ,
              <span
                className="relative inline-block mx-2 group"
                onTouchStart={() => handleTouchStart("hero-organize")}
                onTouchEnd={() => handleTouchEnd("hero-organize")}
              >
                <span
                  className={`text-purple-200 group-hover:text-purple-100 transition-colors ${
                    activeHovers["hero-organize"] ? "text-purple-100" : ""
                  }`}
                >
                  Organize Better
                </span>
                <div
                  className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity animate-pulse delay-200 ${
                    activeHovers["hero-organize"] ? "opacity-100" : ""
                  }`}
                ></div>
              </span>
              and
              <span
                className="relative inline-block mx-2 group"
                onTouchStart={() => handleTouchStart("hero-profit")}
                onTouchEnd={() => handleTouchEnd("hero-profit")}
              >
                <span
                  className={`text-amber-200 group-hover:text-amber-100 transition-colors ${
                    activeHovers["hero-profit"] ? "text-amber-100" : ""
                  }`}
                >
                  Profit More
                </span>
                <div
                  className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity animate-pulse delay-300 ${
                    activeHovers["hero-profit"] ? "opacity-100" : ""
                  }`}
                ></div>
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
              className={`bg-white/95 text-blue-600 hover:bg-white hover:shadow-3xl hover:shadow-blue-500/30 px-10 py-4 text-lg rounded-xl shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 group backdrop-blur-sm ${
                activeHovers["hero-getstarted"] ? "shadow-3xl shadow-blue-500/30 scale-110 -translate-y-1" : ""
              }`}
              onTouchStart={() => handleTouchStart("hero-getstarted")}
              onTouchEnd={() => handleTouchEnd("hero-getstarted")}
            >
              <Play
                className={`mr-3 h-6 w-6 group-hover:animate-spin ${
                  activeHovers["hero-getstarted"] ? "animate-spin" : ""
                }`}
              />
              Get Started Free
              <Sparkles
                className={`ml-2 h-5 w-5 group-hover:animate-pulse ${
                  activeHovers["hero-getstarted"] ? "animate-pulse" : ""
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`px-10 py-4 text-lg rounded-xl border-2 border-white/80 text-white hover:bg-white/20 hover:shadow-2xl hover:shadow-white/30 backdrop-blur-sm transition-all duration-500 group bg-transparent shadow-2xl hover:scale-110 hover:-translate-y-1 ${
                activeHovers["hero-demo"] ? "bg-white/20 shadow-2xl shadow-white/30 scale-110 -translate-y-1" : ""
              }`}
              onTouchStart={() => handleTouchStart("hero-demo")}
              onTouchEnd={() => handleTouchEnd("hero-demo")}
            >
              <span
                className={`group-hover:text-blue-100 transition-colors ${
                  activeHovers["hero-demo"] ? "text-blue-100" : ""
                }`}
              >
                Watch Demo
              </span>
              <ArrowRight
                className={`ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300 ${
                  activeHovers["hero-demo"] ? "translate-x-2" : ""
                }`}
              />
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
            {[
              {
                number: "2,500+",
                label: "Active Canteens",
                gradient: "from-blue-500 to-indigo-600",
                glow: "shadow-blue-500/50",
              },
              {
                number: "40%",
                label: "Average Waste Reduction",
                gradient: "from-emerald-500 to-green-600",
                glow: "shadow-emerald-500/50",
              },
              {
                number: "25%",
                label: "Profit Increase",
                gradient: "from-purple-500 to-violet-600",
                glow: "shadow-purple-500/50",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                onTouchStart={() => handleTouchStart(`stat-${index}`)}
                onTouchEnd={() => handleTouchEnd(`stat-${index}`)}
              >
                <div
                  className={`bg-gradient-to-br ${stat.gradient} text-white p-8 rounded-2xl shadow-lg group-hover:shadow-2xl ${stat.glow} group-hover:${stat.glow} transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2 ${
                    activeHovers[`stat-${index}`] ? `shadow-2xl ${stat.glow} scale-110 -translate-y-2` : ""
                  }`}
                >
                  <div
                    className={`text-5xl font-bold mb-2 group-hover:animate-pulse ${
                      activeHovers[`stat-${index}`] ? "animate-pulse" : ""
                    }`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-blue-100 text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Boost Revenue",
                desc: "Smart pricing and discount strategies increase your daily profits by up to 25%",
                gradient: "from-green-400 to-emerald-500",
                glow: "shadow-green-500/30",
                bgGradient: "from-white to-green-50",
                hoverGlow: "hover:shadow-green-500/40",
              },
              {
                icon: BarChart3,
                title: "Reduce Waste",
                desc: "AI-powered demand prediction helps you prepare the right quantities, cutting waste by 40%",
                gradient: "from-blue-400 to-indigo-500",
                glow: "shadow-blue-500/30",
                bgGradient: "from-white to-blue-50",
                hoverGlow: "hover:shadow-blue-500/40",
              },
              {
                icon: Clock,
                title: "Save Time",
                desc: "Automated billing and inventory management saves 3+ hours daily for your staff",
                gradient: "from-purple-400 to-violet-500",
                glow: "shadow-purple-500/30",
                bgGradient: "from-white to-purple-50",
                hoverGlow: "hover:shadow-purple-500/40",
              },
              {
                icon: Users,
                title: "Happy Customers",
                desc: "Faster service and consistent quality lead to 95% customer satisfaction rates",
                gradient: "from-orange-400 to-amber-500",
                glow: "shadow-orange-500/30",
                bgGradient: "from-white to-orange-50",
                hoverGlow: "hover:shadow-orange-500/40",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className={`text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br ${benefit.bgGradient} group ${benefit.hoverGlow} ${
                  activeHovers[`benefit-${index}`]
                    ? `shadow-2xl scale-105 -translate-y-2 ${benefit.hoverGlow.replace("hover:", "")}`
                    : ""
                }`}
                onTouchStart={() => handleTouchStart(`benefit-${index}`)}
                onTouchEnd={() => handleTouchEnd(`benefit-${index}`)}
              >
                <CardHeader>
                  <div
                    className={`bg-gradient-to-br ${benefit.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg ${benefit.glow} group-hover:shadow-xl group-hover:${benefit.glow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${
                      activeHovers[`benefit-${index}`] ? `shadow-xl ${benefit.glow} scale-110 rotate-6` : ""
                    }`}
                  >
                    <benefit.icon
                      className={`h-8 w-8 text-white group-hover:animate-bounce ${
                        activeHovers[`benefit-${index}`] ? "animate-bounce" : ""
                      }`}
                    />
                  </div>
                  <CardTitle
                    className={`text-xl group-hover:text-green-600 transition-colors ${
                      activeHovers[`benefit-${index}`] ? "text-green-600" : ""
                    }`}
                  >
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
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
            {[
              {
                icon: CheckCircle,
                title: "Smart Billing System",
                desc: "Generate bills instantly with barcode scanning, split payments, and digital receipts",
                gradient: "from-green-400 to-emerald-500",
                glow: "shadow-green-500/40",
                hoverGlow: "hover:shadow-green-500/60",
                boxGlow: "shadow-green-500/30", // Added box glow for mobile
              },
              {
                icon: Zap,
                title: "AI Demand Prediction",
                desc: "Predict food quantities needed based on historical data, weather, and events",
                gradient: "from-blue-400 to-indigo-500",
                glow: "shadow-blue-500/40",
                hoverGlow: "hover:shadow-blue-500/60",
                boxGlow: "shadow-blue-500/30", // Added box glow for mobile
              },
              {
                icon: Target,
                title: "Dynamic Pricing",
                desc: "Optimize discounts and pricing strategies to maximize profit and reduce waste",
                gradient: "from-purple-400 to-violet-500",
                glow: "shadow-purple-500/40",
                hoverGlow: "hover:shadow-purple-500/60",
                boxGlow: "shadow-purple-500/30", // Added box glow for mobile
              },
              {
                icon: CheckCircle,
                title: "Inventory Management",
                desc: "Track ingredients, monitor stock levels, and automate reorder notifications",
                gradient: "from-orange-400 to-amber-500",
                glow: "shadow-orange-500/40",
                hoverGlow: "hover:shadow-orange-500/60",
                boxGlow: "shadow-orange-500/30", // Added box glow for mobile
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                desc: "Real-time insights on sales, popular items, peak hours, and profit margins",
                gradient: "from-red-400 to-pink-500",
                glow: "shadow-red-500/40",
                hoverGlow: "hover:shadow-red-500/60",
                boxGlow: "shadow-red-500/30", // Added box glow for mobile
              },
              {
                icon: Users,
                title: "Staff Management",
                desc: "Manage shifts, track performance, and streamline communication",
                gradient: "from-teal-400 to-cyan-500",
                glow: "shadow-teal-500/40",
                hoverGlow: "hover:shadow-teal-500/60",
                boxGlow: "shadow-teal-500/30", // Added box glow for mobile
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 bg-white/90 backdrop-blur-sm group ${feature.hoverGlow} ${
                  activeHovers[`feature-${index}`]
                    ? `shadow-2xl scale-105 -translate-y-2 ${feature.boxGlow}` // Added box glow for mobile touch
                    : ""
                }`}
                onTouchStart={() => handleTouchStart(`feature-${index}`)}
                onTouchEnd={() => handleTouchEnd(`feature-${index}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div
                      className={`bg-gradient-to-br ${feature.gradient} p-2 rounded-lg mr-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg ${feature.glow} group-hover:shadow-xl group-hover:${feature.glow} ${
                        activeHovers[`feature-${index}`] ? `scale-110 rotate-6 shadow-xl ${feature.glow}` : ""
                      }`}
                    >
                      <feature.icon
                        className={`h-6 w-6 text-white group-hover:animate-pulse ${
                          activeHovers[`feature-${index}`] ? "animate-pulse" : ""
                        }`}
                      />
                    </div>
                    <span
                      className={`group-hover:text-gray-800 transition-colors ${
                        activeHovers[`feature-${index}`] ? "text-gray-800" : ""
                      }`}
                    >
                      {feature.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
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
            {[
              {
                step: "1",
                title: "Sign Up",
                desc: "Create your account and choose your plan. No credit card required for trial.",
                gradient: "from-blue-500 to-indigo-600",
                glow: "shadow-blue-500/50",
                hoverColor: "text-blue-600",
                hoverScale: "scale-110",
              },
              {
                step: "2",
                title: "Setup Menu",
                desc: "Add your menu items, set prices, and configure your canteen preferences.",
                gradient: "from-emerald-500 to-green-600",
                glow: "shadow-emerald-500/50",
                hoverColor: "text-green-600",
                hoverScale: "scale-110",
              },
              {
                step: "3",
                title: "Train Staff",
                desc: "Our team provides comprehensive training to get your staff up to speed quickly.",
                gradient: "from-purple-500 to-violet-600",
                glow: "shadow-purple-500/50",
                hoverColor: "text-purple-600",
                hoverScale: "scale-110",
              },
              {
                step: "4",
                title: "Go Live",
                desc: "Start serving customers with your new smart canteen management system!",
                gradient: "from-orange-500 to-amber-600",
                glow: "shadow-orange-500/50",
                hoverColor: "text-orange-600",
                hoverScale: "scale-110",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                onTouchStart={() => handleTouchStart(`how-it-works-${index}`)}
                onTouchEnd={() => handleTouchEnd(`how-it-works-${index}`)}
              >
                <div
                  className={`bg-gradient-to-br ${item.gradient} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg ${item.glow} group-hover:shadow-2xl group-hover:${item.glow} transition-all duration-700 transform group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-6 ${
                    activeHovers[`how-it-works-${index}`]
                      ? `shadow-2xl ${item.glow} scale-125 -translate-y-2 rotate-6`
                      : ""
                  }`}
                >
                  <span
                    className={`text-3xl font-bold text-white group-hover:animate-pulse ${
                      activeHovers[`how-it-works-${index}`] ? "animate-pulse" : ""
                    }`}
                  >
                    {item.step}
                  </span>
                </div>
                <h4
                  className={`text-2xl font-bold mb-4 transition-all duration-500 group-hover:${item.hoverColor} group-hover:${item.hoverScale} ${
                    activeHovers[`how-it-works-${index}`] ? `${item.hoverColor} ${item.hoverScale}` : ""
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component 5: Additional Characteristics - Why Choose Our System */}
      <section className="px-6 py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our System?</h3>
            <p className="text-xl text-gray-600">Built for reliability, security, and growth</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Bank-Grade Security",
                desc: "Your data is protected with enterprise-level encryption and security protocols.",
                gradient: "from-blue-400 to-indigo-500",
                glow: "shadow-blue-500/40",
                hoverColor: "hover:text-blue-600",
                hoverGlow: "hover:shadow-blue-500/60",
                boxGlow: "shadow-blue-500/30", // Added box glow for mobile
              },
              {
                icon: Clock,
                title: "99.9% Uptime",
                desc: "Reliable cloud infrastructure ensures your canteen never stops running.",
                gradient: "from-green-400 to-emerald-500",
                glow: "shadow-green-500/40",
                hoverColor: "hover:text-green-600",
                hoverGlow: "hover:shadow-green-500/60",
                boxGlow: "shadow-green-500/30", // Added box glow for mobile
              },
              {
                icon: Users,
                title: "24/7 Support",
                desc: "Our dedicated support team is always ready to help you succeed.",
                gradient: "from-purple-400 to-violet-500",
                glow: "shadow-purple-500/40",
                hoverColor: "hover:text-purple-600",
                hoverGlow: "hover:shadow-purple-500/60",
                boxGlow: "shadow-purple-500/30", // Added box glow for mobile
              },
              {
                icon: TrendingUp,
                title: "Scalable Solution",
                desc: "Grows with your business from single canteen to multi-location chains.",
                gradient: "from-orange-400 to-amber-500",
                glow: "shadow-orange-500/40",
                hoverColor: "hover:text-orange-600",
                hoverGlow: "hover:shadow-orange-500/60",
                boxGlow: "shadow-orange-500/30", // Added box glow for mobile
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                desc: "Make data-driven decisions with comprehensive reporting and insights.",
                gradient: "from-red-400 to-pink-500",
                glow: "shadow-red-500/40",
                hoverColor: "hover:text-red-600",
                hoverGlow: "hover:shadow-red-500/60",
                boxGlow: "shadow-red-500/30", // Added box glow for mobile
              },
              {
                icon: CheckCircle,
                title: "Easy Integration",
                desc: "Seamlessly integrates with existing POS systems and payment processors.",
                gradient: "from-teal-400 to-cyan-500",
                glow: "shadow-teal-500/40",
                hoverColor: "hover:text-teal-600",
                hoverGlow: "hover:shadow-teal-500/60",
                boxGlow: "shadow-teal-500/30", // Added box glow for mobile
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-start space-x-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 group ${item.hoverGlow} ${
                  activeHovers[`why-choose-${index}`]
                    ? `shadow-2xl scale-105 -translate-y-2 ${item.boxGlow}` // Added box glow for mobile touch
                    : ""
                }`}
                onTouchStart={() => handleTouchStart(`why-choose-${index}`)}
                onTouchEnd={() => handleTouchEnd(`why-choose-${index}`)}
              >
                <div
                  className={`bg-gradient-to-br ${item.gradient} p-3 rounded-2xl shadow-lg ${item.glow} group-hover:shadow-xl group-hover:${item.glow} group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 ${
                    activeHovers[`why-choose-${index}`] ? `shadow-xl ${item.glow} scale-125 rotate-12` : ""
                  }`}
                >
                  <item.icon
                    className={`h-8 w-8 text-white group-hover:animate-pulse ${
                      activeHovers[`why-choose-${index}`] ? "animate-pulse" : ""
                    }`}
                  />
                </div>
                <div>
                  <h4
                    className={`text-xl font-bold mb-3 ${item.hoverColor} transition-colors duration-300 ${
                      activeHovers[`why-choose-${index}`] ? item.hoverColor.replace("hover:", "") : ""
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
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
            {[
              {
                name: "Sarah Johnson",
                role: "University Canteen Manager",
                testimonial:
                  "This system revolutionized our operations! We reduced food waste by 45% and increased profits by 30%. The AI predictions are incredibly accurate.",
                bgGradient: "from-white to-yellow-50",
              },
              {
                name: "Mike Chen",
                role: "Corporate Cafeteria Director",
                testimonial:
                  "The billing system is lightning fast and the analytics help us make better decisions daily. Our customers love the improved service speed.",
                bgGradient: "from-white to-blue-50",
              },
              {
                name: "Priya Patel",
                role: "School Canteen Owner",
                testimonial:
                  "Setup was incredibly easy and the support team was amazing. We're now serving 500+ students efficiently with minimal waste.",
                bgGradient: "from-white to-green-50",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br ${testimonial.bgGradient} group ${
                  activeHovers[`testimonial-${index}`] ? "shadow-2xl scale-105 -translate-y-2" : ""
                }`}
                onTouchStart={() => handleTouchStart(`testimonial-${index}`)}
                onTouchEnd={() => handleTouchEnd(`testimonial-${index}`)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 fill-yellow-400 text-yellow-400 group-hover:scale-125 transition-all duration-500 group-hover:animate-pulse ${
                          activeHovers[`testimonial-${index}`] ? "scale-125 animate-pulse" : ""
                        }`}
                        style={{ transitionDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                  <CardTitle
                    className={`text-xl group-hover:text-gray-800 transition-colors ${
                      activeHovers[`testimonial-${index}`] ? "text-gray-800" : ""
                    }`}
                  >
                    {testimonial.name}
                  </CardTitle>
                  <CardDescription className="text-gray-500">{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed italic">"{testimonial.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
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
              className={`bg-white text-blue-600 hover:bg-gray-100 hover:shadow-2xl hover:shadow-white/50 px-10 py-4 text-lg rounded-xl shadow-lg transition-all duration-700 transform hover:scale-110 hover:-translate-y-2 group ${
                activeHovers["footer-trial"] ? "bg-gray-100 shadow-2xl shadow-white/50 scale-110 -translate-y-2" : ""
              }`}
              onTouchStart={() => handleTouchStart("footer-trial")}
              onTouchEnd={() => handleTouchEnd("footer-trial")}
            >
              <ArrowRight
                className={`mr-3 h-6 w-6 group-hover:translate-x-2 group-hover:animate-pulse transition-all duration-300 ${
                  activeHovers["footer-trial"] ? "translate-x-2 animate-pulse" : ""
                }`}
              />
              Start Free Trial
              <Sparkles
                className={`ml-2 h-5 w-5 group-hover:animate-spin ${
                  activeHovers["footer-trial"] ? "animate-spin" : ""
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`border-2 border-white text-white hover:bg-white hover:text-blue-600 hover:shadow-2xl hover:shadow-white/50 px-10 py-4 text-lg rounded-xl bg-transparent transition-all duration-700 transform hover:scale-110 hover:-translate-y-2 ${
                activeHovers["footer-demo"]
                  ? "bg-white text-blue-600 shadow-2xl shadow-white/50 scale-110 -translate-y-2"
                  : ""
              }`}
              onTouchStart={() => handleTouchStart("footer-demo")}
              onTouchEnd={() => handleTouchEnd("footer-demo")}
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
          <div
            className="flex justify-center items-center space-x-4 mb-6 group"
            onTouchStart={() => handleTouchStart("footer-logo")}
            onTouchEnd={() => handleTouchEnd("footer-logo")}
          >
            <div
              className={`bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                activeHovers["footer-logo"] ? "shadow-xl shadow-blue-500/50 scale-110 rotate-6" : ""
              }`}
            >
              <Utensils
                className={`h-8 w-8 text-white group-hover:animate-pulse ${
                  activeHovers["footer-logo"] ? "animate-pulse" : ""
                }`}
              />
            </div>
            <span
              className={`text-2xl font-bold group-hover:text-blue-400 transition-colors ${
                activeHovers["footer-logo"] ? "text-blue-400" : ""
              }`}
            >
              Canteen Management System
            </span>
          </div>
          <p className="text-gray-400 text-lg">© 2024 Canteen Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
