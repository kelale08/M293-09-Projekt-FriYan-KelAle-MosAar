"use client"

import { useState, useEffect } from "react"
import type { BusinessTrip, FilterState } from "@/app/page"
import type { WishlistAction } from "@/components/trips-reducer"
import { Trip } from "@/components/trip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, TrendingUp } from "lucide-react"

interface TripListProps {
  dispatch: (action: WishlistAction) => void
  filters: FilterState
}

// Functional component TripList, destructure props
export function TripList({ dispatch, filters }: TripListProps) {
  const [trips, setTrips] = useState<BusinessTrip[]>([])

  useEffect(() => {
    // Sample business trips data with categories and status
    const sampleTrips: BusinessTrip[] = [
      {
        id: 1,
        title: "Berlin Business Conference",
        description: "Annual tech conference with industry leaders and networking opportunities",
        startTrip: "2024-03-15",
        endTrip: "2024-03-18",
        category: "Conference",
        status: "planned",
        budget: 2500,
        employee: "John Doe",
      },
      {
        id: 2,
        title: "Paris Client Meeting",
        description: "Important client presentation and contract negotiation with French partners",
        startTrip: "2024-04-01",
        endTrip: "2024-04-05",
        category: "Meeting",
        status: "ongoing",
        budget: 3200,
        employee: "Jane Smith",
      },
      {
        id: 3,
        title: "London Training Workshop",
        description: "Professional development training on new technologies and methodologies",
        startTrip: "2024-04-20",
        endTrip: "2024-04-23",
        category: "Training",
        status: "completed",
        budget: 1800,
        employee: "Mike Johnson",
      },
      {
        id: 4,
        title: "Amsterdam Innovation Summit",
        description: "Innovation summit focusing on digital transformation and future technologies",
        startTrip: "2024-05-10",
        endTrip: "2024-05-12",
        category: "Exhibition",
        status: "planned",
        budget: 2200,
        employee: "Sarah Wilson",
      },
      {
        id: 5,
        title: "Zurich Financial Meeting",
        description: "Quarterly financial review and strategic planning session with stakeholders",
        startTrip: "2024-05-25",
        endTrip: "2024-05-27",
        category: "Review",
        status: "cancelled",
        budget: 2800,
        employee: "David Brown",
      },
      {
        id: 6,
        title: "Barcelona Tech Expo",
        description: "International technology exhibition and product showcase for new innovations",
        startTrip: "2024-06-08",
        endTrip: "2024-06-11",
        category: "Exhibition",
        status: "planned",
        budget: 2100,
        employee: "Lisa Garcia",
      },
    ]

    setTrips(sampleTrips)
  }, [])

  const handleCreateTrip = (newTrip: Omit<BusinessTrip, "id">) => {
    const tripWithId: BusinessTrip = {
      ...newTrip,
      id: Math.max(...trips.map((t) => t.id), 0) + 1,
    }
    setTrips((prev) => [...prev, tripWithId])
  }

  const handleUpdateTrip = (updatedTrip: BusinessTrip) => {
    setTrips((prev) => prev.map((trip) => (trip.id === updatedTrip.id ? updatedTrip : trip)))
  }

  const handleDeleteTrip = (id: number) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id))
  }

  // Filter trips based on search and filter criteria
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      !filters.search ||
      trip.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      trip.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      trip.employee?.toLowerCase().includes(filters.search.toLowerCase())

    const matchesCategory = !filters.category || trip.category === filters.category
    const matchesStatus = !filters.status || trip.status === filters.status

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Give props down to each Trip
  const tripsMapped = filteredTrips.map((trip) => (
    <Trip
      dispatch={dispatch}
      trip={trip}
      key={trip.id}
      onDelete={handleDeleteTrip}
      onUpdate={handleUpdateTrip}
      onCreate={handleCreateTrip}
    />
  ))

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          Available Business Trips
          <div className="ml-auto flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-medium">
              {filteredTrips.length}/{trips.length} trips
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {filteredTrips.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <p className="text-white text-lg mb-2">No trips found</p>
            <p className="text-blue-200 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{tripsMapped}</div>
        )}
      </CardContent>
    </Card>
  )
}
