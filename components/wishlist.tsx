"use client"

import { useState } from "react"
import type { BusinessTrip } from "@/app/page"
import type { WishlistAction } from "@/components/trips-reducer"
import { Wish } from "@/components/wish"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Heart, Trash2, Star, Sparkles, AlertTriangle } from "lucide-react"

interface WishlistProps {
  wishlist: BusinessTrip[]
  dispatch: (action: WishlistAction) => void
}

// Destructure props
export function Wishlist({ wishlist, dispatch }: WishlistProps) {
  const [showClearAllDialog, setShowClearAllDialog] = useState(false)

  const handleClearAllConfirm = () => {
    dispatch({ type: "empty" })
    setShowClearAllDialog(false)
  }

  if (wishlist.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Heart className="w-4 h-4 text-white" />
            </div>
            Your Wishlist
            <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
            <span className="ml-auto text-pink-300 text-sm">(0 items)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-400/30">
              <Star className="w-10 h-10 text-pink-300" />
            </div>
            <h3 className="text-white text-xl mb-2 font-semibold">Your wishlist is empty</h3>
            <p className="text-blue-200 text-sm max-w-md mx-auto leading-relaxed">
              Start building your dream business trip collection! Add trips from the list below to create your
              personalized wishlist.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-4 h-4 text-white" />
              </div>
              Your Wishlist
              <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
              <span className="ml-2 text-pink-300 text-sm">({wishlist.length} items)</span>
            </CardTitle>
            <Button
              onClick={() => setShowClearAllDialog(true)}
              variant="outline"
              size="sm"
              className="text-red-300 border-red-400/50 hover:bg-red-500/20 hover:text-red-200 backdrop-blur-sm transition-all"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((trip) => (
              <Wish key={trip.id} dispatch={dispatch} trip={trip} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Simple Clear All Confirmation Dialog */}
      <Dialog open={showClearAllDialog} onOpenChange={setShowClearAllDialog}>
        <DialogContent className="max-w-md bg-slate-900/95 border-orange-500/30 backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle className="text-orange-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Clear Wishlist
            </DialogTitle>
            <DialogDescription className="text-slate-300">
              Are you sure you want to remove all {wishlist.length} items from your wishlist? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowClearAllDialog(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 backdrop-blur-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleClearAllConfirm}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 backdrop-blur-sm"
            >
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
