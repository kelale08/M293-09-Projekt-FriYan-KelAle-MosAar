"use client"

import { useMemo } from "react"
import { useBusinessTrip } from "../context/BusinessTripContext"
import LoadingSpinner from "./LoadingSpinner"
import ErrorMessage from "./ErrorMessage"
import BusinessTripCard from "./BusinessTripCard"
import FilterBar from "./FilterBar"

function BusinessTripList({ onEdit, onManageMeetings, onCreateNew }) {
  const { trips, loading, error, filters } = useBusinessTrip()

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const tripDate = new Date(trip.startTrip)
      const matchesMonth = !filters.month || tripDate.getMonth() + 1 === Number.parseInt(filters.month)
      const matchesYear = !filters.year || tripDate.getFullYear() === Number.parseInt(filters.year)
      const matchesSearch =
        !filters.search ||
        trip.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        trip.description.toLowerCase().includes(filters.search.toLowerCase())

      return matchesMonth && matchesYear && matchesSearch
    })
  }, [trips, filters])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="business-trip-list">
      <div className="list-header">
        <h1>🧳 Business Trips Management</h1>
        <button className="btn btn-primary" onClick={onCreateNew}>
          ➕ New Business Trip
        </button>
      </div>

      <FilterBar />

      <div className="trip-stats">
        <div className="stat-card">
          <h3>{trips.length}</h3>
          <p>Total Trips</p>
        </div>
        <div className="stat-card">
          <h3>{filteredTrips.length}</h3>
          <p>Filtered Results</p>
        </div>
        <div className="stat-card">
          <h3>{trips.filter((t) => new Date(t.endTrip) > new Date()).length}</h3>
          <p>Upcoming Trips</p>
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <div className="empty-state">
          <h3>No business trips found</h3>
          <p>Create your first business trip to get started!</p>
        </div>
      ) : (
        <div className="trips-grid">
          {filteredTrips.map((trip) => (
            <BusinessTripCard
              key={trip.id}
              trip={trip}
              onEdit={() => onEdit(trip)}
              onManageMeetings={() => onManageMeetings(trip)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BusinessTripList
