"use client"

import { useState } from "react"
import type { BusinessTrip } from "@/app/page"
import type { WishlistAction } from "@/components/trips-reducer"
import { BusinessTripForm } from "@/components/business-trip-form"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Calendar,
  User,
  DollarSign,
  Heart,
  Edit,
  Trash2,
  Sparkles,
  Eye,
  X,
  MapPin,
  Clock,
  FileText,
  Building,
} from "lucide-react"

interface TripProps {
  dispatch: (action: WishlistAction) => void
  trip: BusinessTrip
  onDelete: (id: number) => void
  onUpdate: (trip: BusinessTrip) => void
}

// Destructure props on the param line
export function Trip({ dispatch, trip, onDelete, onUpdate }: TripProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // Destructure Props trip
  const { id, title, description, startTrip, endTrip, category, status, budget, employee } = trip

  const getStatusColor = (status: BusinessTrip["status"]) => {
    switch (status) {
      case "planned":
        return "bg-blue-500/80 border-blue-400"
      case "ongoing":
        return "bg-yellow-500/80 border-yellow-400"
      case "completed":
        return "bg-green-500/80 border-green-400"
      case "cancelled":
        return "bg-red-500/80 border-red-400"
      default:
        return "bg-gray-500/80 border-gray-400"
    }
  }

  const getCategoryColor = (category: BusinessTrip["category"]) => {
    switch (category) {
      case "Conference":
        return "bg-purple-500/80 border-purple-400"
      case "Meeting":
        return "bg-blue-500/80 border-blue-400"
      case "Training":
        return "bg-green-500/80 border-green-400"
      case "Exhibition":
        return "bg-orange-500/80 border-orange-400"
      case "Review":
        return "bg-pink-500/80 border-pink-400"
      default:
        return "bg-gray-500/80 border-gray-400"
    }
  }

  const handleEditSubmit = (updatedTripData: Omit<BusinessTrip, "id">) => {
    const updatedTrip: BusinessTrip = {
      ...updatedTripData,
      id,
    }
    onUpdate(updatedTrip)
    setShowEditDialog(false)
  }

  const handleDeleteConfirm = () => {
    onDelete(id)
  }

  const isDisabled = status === "cancelled"

  return (
    <>
      <Card className="group bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-3">
            <CardTitle
              className="text-lg text-white/90 line-clamp-2 group-hover:text-blue-200 transition-colors cursor-pointer hover:underline"
              onClick={() => setShowDetailDialog(true)}
            >
              {title}
            </CardTitle>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowDetailDialog(true)}
                className="h-8 w-8 p-0 text-green-400 hover:text-green-300 hover:bg-green-500/20 backdrop-blur-sm"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowEditDialog(true)}
                className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 backdrop-blur-sm"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowDeleteDialog(true)}
                className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 backdrop-blur-sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <Badge className={`${getCategoryColor(category)} text-white text-xs border backdrop-blur-sm`}>
              {category}
            </Badge>
            <Badge className={`${getStatusColor(status)} text-white text-xs border backdrop-blur-sm`}>{status}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-blue-100 text-sm line-clamp-3 leading-relaxed">{description}</p>

          <p className="text-blue-300 text-xs italic cursor-pointer" onClick={() => setShowDetailDialog(true)}>
            Click to view details →
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center text-blue-200">
              <Calendar className="w-4 h-4 mr-3 text-blue-300" />
              <span>
                {startTrip} → {endTrip}
              </span>
            </div>

            {employee && (
              <div className="flex items-center text-blue-200">
                <User className="w-4 h-4 mr-3 text-blue-300" />
                <span>{employee}</span>
              </div>
            )}

            {budget && (
              <div className="flex items-center text-blue-200">
                <DollarSign className="w-4 h-4 mr-3 text-blue-300" />
                <span>${budget.toLocaleString()}</span>
              </div>
            )}
          </div>

          <Button
            onClick={() => dispatch({ type: "add", trip })}
            disabled={isDisabled}
            className={`w-full mt-4 transition-all duration-300 ${
              isDisabled
                ? "bg-gray-600/50 cursor-not-allowed backdrop-blur-sm"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl backdrop-blur-sm"
            }`}
          >
            {isDisabled ? (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Cancelled
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
                <Sparkles className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Detail View Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/95 border-slate-700 backdrop-blur-lg">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl text-white font-bold">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetailDialog(false)}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Status and Category Badges */}
            <div className="flex gap-3">
              <Badge
                className={`${getCategoryColor(category)} text-white px-3 py-1 text-sm border backdrop-blur-sm shadow-lg`}
              >
                <Building className="w-4 h-4 mr-2" />
                {category}
              </Badge>
              <Badge
                className={`${getStatusColor(status)} text-white px-3 py-1 text-sm border backdrop-blur-sm shadow-lg`}
              >
                <Clock className="w-4 h-4 mr-2" />
                {status}
              </Badge>
            </div>

            {/* Description */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-400" />
                Description
              </h3>
              <p className="text-white/80 leading-relaxed">{description}</p>
            </div>

            {/* Trip Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dates */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-400" />
                  Trip Dates
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-4 h-4 mr-2 text-green-300" />
                    <span className="font-medium">Start:</span>
                    <span className="ml-2">{startTrip}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-4 h-4 mr-2 text-red-300" />
                    <span className="font-medium">End:</span>
                    <span className="ml-2">{endTrip}</span>
                  </div>
                </div>
              </div>

              {/* Employee & Budget */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-400" />
                  Trip Details
                </h3>
                <div className="space-y-2">
                  {employee && (
                    <div className="flex items-center text-white/80">
                      <User className="w-4 h-4 mr-2 text-purple-300" />
                      <span className="font-medium">Employee:</span>
                      <span className="ml-2">{employee}</span>
                    </div>
                  )}
                  {budget && (
                    <div className="flex items-center text-white/80">
                      <DollarSign className="w-4 h-4 mr-2 text-yellow-300" />
                      <span className="font-medium">Budget:</span>
                      <span className="ml-2">${budget.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center text-white/80">
                    <FileText className="w-4 h-4 mr-2 text-blue-300" />
                    <span className="font-medium">Trip ID:</span>
                    <span className="ml-2">#{id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <Button
                onClick={() => {
                  setShowDetailDialog(false)
                  setShowEditDialog(true)
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Trip
              </Button>
              <Button
                onClick={() => {
                  dispatch({ type: "add", trip })
                  setShowDetailDialog(false)
                }}
                disabled={isDisabled}
                className={`flex-1 ${
                  isDisabled
                    ? "bg-gray-600/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                }`}
              >
                {isDisabled ? (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Cancelled
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Add to Wishlist
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDetailDialog(false)}
                className="px-6 border-white/20 text-white hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900/95 border-slate-700 backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Business Trip</DialogTitle>
          </DialogHeader>
          <BusinessTripForm trip={trip} onCancel={() => setShowEditDialog(false)} onSubmit={handleEditSubmit} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        itemName={title}
        itemType="trip"
      />
    </>
  )
}
