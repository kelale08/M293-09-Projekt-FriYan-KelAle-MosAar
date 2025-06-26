"use client"

import type React from "react"

import { useState } from "react"
import type { BusinessTrip } from "@/app/page"
import type { WishlistAction } from "@/components/trips-reducer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Calendar,
  User,
  DollarSign,
  Trash2,
  Star,
  Heart,
  AlertTriangle,
  Eye,
  MapPin,
  Clock,
  FileText,
  Building,
  X,
} from "lucide-react"

interface WishProps {
  dispatch: (action: WishlistAction) => void
  trip: BusinessTrip
}

// Destructure props on the param line
export function Wish({ dispatch, trip }: WishProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // Destructure Props trip - ALLE Eigenschaften
  const { id, title, description, startTrip, endTrip, category, status, budget, employee } = trip

  const getStatusColor = (status: BusinessTrip["status"]) => {
    switch (status) {
      case "planned":
        return "bg-blue-500 border-blue-400 text-white"
      case "ongoing":
        return "bg-yellow-500 border-yellow-400 text-white"
      case "completed":
        return "bg-green-500 border-green-400 text-white"
      case "cancelled":
        return "bg-red-500 border-red-400 text-white"
      default:
        return "bg-gray-500 border-gray-400 text-white"
    }
  }

  const getCategoryColor = (category: BusinessTrip["category"]) => {
    switch (category) {
      case "Conference":
        return "bg-purple-500 border-purple-400 text-white"
      case "Meeting":
        return "bg-blue-500 border-blue-400 text-white"
      case "Training":
        return "bg-green-500 border-green-400 text-white"
      case "Exhibition":
        return "bg-orange-500 border-orange-400 text-white"
      case "Review":
        return "bg-pink-500 border-pink-400 text-white"
      default:
        return "bg-gray-500 border-gray-400 text-white"
    }
  }

  const handleDeleteConfirm = () => {
    dispatch({ type: "deleteItem", id })
    setShowDeleteDialog(false)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open detail if clicking on buttons
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    setShowDetailDialog(true)
  }

  return (
    <>
      <Card
        className="group bg-white/15 backdrop-blur-lg border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-3 h-3 text-white fill-white" />
              </div>
              <CardTitle className="text-lg text-white line-clamp-2 group-hover:text-yellow-200 transition-colors font-semibold">
                {title}
              </CardTitle>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDetailDialog(true)
                }}
                className="h-8 w-8 p-0 text-blue-300 hover:text-blue-200 hover:bg-blue-500/20 backdrop-blur-sm"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDeleteDialog(true)
                }}
                className="h-8 w-8 p-0 text-red-300 hover:text-red-200 hover:bg-red-500/20 backdrop-blur-sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <Badge className={`${getCategoryColor(category)} text-xs border backdrop-blur-sm font-medium shadow-sm`}>
              {category}
            </Badge>
            <Badge className={`${getStatusColor(status)} text-xs border backdrop-blur-sm font-medium shadow-sm`}>
              {status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-white/90 text-sm line-clamp-3 leading-relaxed font-medium">{description}</p>

          <p className="text-pink-300 text-xs italic cursor-pointer" onClick={() => setShowDetailDialog(true)}>
            Click to view details →
          </p>

          {/* ALLE Informationen in der Kartenansicht anzeigen */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center text-white/80">
              <Calendar className="w-4 h-4 mr-3 text-blue-300" />
              <span className="font-medium">
                {startTrip} → {endTrip}
              </span>
            </div>

            {employee && (
              <div className="flex items-center text-white/80">
                <User className="w-4 h-4 mr-3 text-green-300" />
                <span className="font-medium">{employee}</span>
              </div>
            )}

            {budget && (
              <div className="flex items-center text-white/80">
                <DollarSign className="w-4 h-4 mr-3 text-yellow-300" />
                <span className="font-medium">${budget.toLocaleString()}</span>
              </div>
            )}

            {/* Trip ID anzeigen */}
            <div className="flex items-center text-white/60">
              <FileText className="w-4 h-4 mr-3 text-gray-300" />
              <span className="font-medium text-xs">Trip ID: #{id}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <Badge className="bg-gradient-to-r from-pink-500/40 to-purple-500/40 text-white border border-pink-400/50 backdrop-blur-sm font-medium">
              <Heart className="w-3 h-3 mr-1 fill-pink-300" />
              In Your Wishlist
            </Badge>
            <span className="text-white/60 text-xs">Click to view details</span>
          </div>
        </CardContent>
      </Card>

      {/* Detailed View Dialog - ALLE Informationen */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900/95 border-slate-700 backdrop-blur-lg">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl text-white font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              {title}
            </DialogTitle>
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
            <div className="flex gap-3 flex-wrap">
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
              <Badge className="bg-gradient-to-r from-pink-500/60 to-purple-500/60 text-white px-3 py-1 text-sm border border-pink-400/50 backdrop-blur-sm shadow-lg">
                <Heart className="w-4 h-4 mr-2 fill-pink-300" />
                In Wishlist
              </Badge>
            </div>

            {/* Description */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-400" />
                Complete Description
              </h3>
              <p className="text-white/80 leading-relaxed">{description}</p>
            </div>

            {/* Trip Details Grid - ALLE Informationen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dates */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-400" />
                  Trip Schedule
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-4 h-4 mr-2 text-green-300" />
                    <span className="font-medium">Start Date:</span>
                    <span className="ml-2 text-green-200">{startTrip}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-4 h-4 mr-2 text-red-300" />
                    <span className="font-medium">End Date:</span>
                    <span className="ml-2 text-red-200">{endTrip}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <Clock className="w-4 h-4 mr-2 text-blue-300" />
                    <span className="font-medium">Status:</span>
                    <Badge className={`ml-2 ${getStatusColor(status)} text-xs`}>{status}</Badge>
                  </div>
                </div>
              </div>

              {/* Employee & Budget & ID */}
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-400" />
                  Trip Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-white/80">
                    <FileText className="w-4 h-4 mr-2 text-blue-300" />
                    <span className="font-medium">Trip ID:</span>
                    <span className="ml-2 text-blue-200">#{id}</span>
                  </div>
                  {employee && (
                    <div className="flex items-center text-white/80">
                      <User className="w-4 h-4 mr-2 text-purple-300" />
                      <span className="font-medium">Employee:</span>
                      <span className="ml-2 text-purple-200">{employee}</span>
                    </div>
                  )}
                  {budget && (
                    <div className="flex items-center text-white/80">
                      <DollarSign className="w-4 h-4 mr-2 text-yellow-300" />
                      <span className="font-medium">Budget:</span>
                      <span className="ml-2 text-yellow-200 font-semibold">${budget.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex items-center text-white/80">
                    <Building className="w-4 h-4 mr-2 text-orange-300" />
                    <span className="font-medium">Category:</span>
                    <Badge className={`ml-2 ${getCategoryColor(category)} text-xs`}>{category}</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Trip Summary */}
            <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-pink-400/30">
              <h3 className="text-white font-semibold mb-3 flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2 fill-pink-300" />
                Wishlist Trip Summary
                <Star className="w-5 h-5 ml-2 text-yellow-400 fill-yellow-400" />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-pink-200 text-xs">Trip ID</div>
                  <div className="text-white font-semibold">#{id}</div>
                </div>
                <div>
                  <div className="text-pink-200 text-xs">Category</div>
                  <div className="text-white font-semibold">{category}</div>
                </div>
                <div>
                  <div className="text-pink-200 text-xs">Status</div>
                  <div className="text-white font-semibold">{status}</div>
                </div>
                <div>
                  <div className="text-pink-200 text-xs">Budget</div>
                  <div className="text-white font-semibold">{budget ? `$${budget.toLocaleString()}` : "N/A"}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <Button
                onClick={() => {
                  dispatch({ type: "deleteItem", id })
                  setShowDetailDialog(false)
                }}
                variant="outline"
                className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove from Wishlist
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

      {/* Simple Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md bg-slate-900/95 border-red-500/30 backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Remove from Wishlist
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-white">
                "{title}" (ID: #{id})
              </span>{" "}
              from your wishlist?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 backdrop-blur-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 backdrop-blur-sm"
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
