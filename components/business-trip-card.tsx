"use client"

import type { BusinessTrip } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, DollarSign, Edit, Trash2 } from "lucide-react"

interface BusinessTripCardProps {
  trip: BusinessTrip
  onEdit: () => void
  onDelete: () => void
}

export function BusinessTripCard({ trip, onEdit, onDelete }: BusinessTripCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{trip.destination}</CardTitle>
          <Badge className={getStatusColor(trip.status)}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          {trip.employee}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {trip.purpose}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />${trip.budget.toLocaleString()}
        </div>

        {trip.description && <p className="text-sm text-gray-500 line-clamp-2">{trip.description}</p>}

        {trip.meetings && trip.meetings.length > 0 && (
          <div className="text-sm text-blue-600">
            {trip.meetings.length} meeting{trip.meetings.length !== 1 ? "s" : ""} scheduled
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={onDelete} className="text-red-600 hover:text-red-700">
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
