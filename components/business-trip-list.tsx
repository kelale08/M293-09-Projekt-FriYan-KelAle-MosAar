import type { BusinessTrip } from "@/app/page"
import { BusinessTripCard } from "./business-trip-card"

interface BusinessTripListProps {
  trips: BusinessTrip[]
  onEdit: (trip: BusinessTrip) => void
  onDelete: (id: number) => void
}

export function BusinessTripList({ trips, onEdit, onDelete }: BusinessTripListProps) {
  if (trips.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No business trips found</h3>
        <p className="text-gray-500">Get started by creating your first business trip.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <BusinessTripCard key={trip.id} trip={trip} onEdit={() => onEdit(trip)} onDelete={() => onDelete(trip.id)} />
      ))}
    </div>
  )
}
