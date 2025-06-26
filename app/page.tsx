"use client"

import { useReducer, useState } from "react"
import tripsReducer from "@/components/trips-reducer"
import { TripList } from "@/components/trip-list"
import { Wishlist } from "@/components/wishlist"
import { CreateTripButton } from "@/components/create-trip-button"
import { SearchAndFilter } from "@/components/search-and-filter"
import { Plane, Globe, MapPin } from "lucide-react"

export interface BusinessTrip {
  id: number
  title: string
  description: string
  startTrip: string
  endTrip: string
  category: "Conference" | "Meeting" | "Training" | "Exhibition" | "Review" | "Other"
  status: "planned" | "ongoing" | "completed" | "cancelled"
  budget?: number
  employee?: string
}

export interface FilterState {
  search: string
  category: string
  status: string
}

// Initial empty wishlist
const initialWishlist: BusinessTrip[] = []

export default function App() {
  // useReducer hook - returns state and dispatch function
  const [wishlist, dispatch] = useReducer(tripsReducer, initialWishlist)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    status: "",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Plane className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">BizTrips</h1>
                  <p className="text-blue-200 text-sm">Your Business Travel Companion</p>
                </div>
              </div>
              <CreateTripButton />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 text-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
                Plan Your Next
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Business Adventure
                </span>
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Manage your business trips with style. Create, organize, and track your professional journeys with our
                modern trip management system.
              </p>
              <div className="flex items-center justify-center space-x-8 text-blue-200">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Global Destinations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Smart Planning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Plane className="w-5 h-5" />
                  <span>Seamless Travel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-6 pb-12 space-y-8">
          {/* Search and Filter */}
          <SearchAndFilter filters={filters} onFiltersChange={setFilters} />

          {/* Wishlist */}
          <Wishlist wishlist={wishlist} dispatch={dispatch} />

          {/* Trip List */}
          <TripList dispatch={dispatch} filters={filters} />
        </main>

        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-16">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-semibold">BizTrips</span>
                </div>
                <p className="text-blue-200 text-sm">
                  Modern business trip management with React and useReducer. Built for professionals who value
                  efficiency.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-blue-200 text-sm">
                  <li>• Trip Planning & Management</li>
                  <li>• Wishlist Functionality</li>
                  <li>• Advanced Search & Filters</li>
                  <li>• Real-time Updates</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Technology</h3>
                <ul className="space-y-2 text-blue-200 text-sm">
                  <li>• React with useReducer</li>
                  <li>• TypeScript</li>
                  <li>• Next.js 14</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 text-center">
              <p className="text-blue-300 text-sm">
                © 2025 BizTrips - Built with ❤️ for BBW Informatik | Version 2.0 (useReducer Edition)
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
