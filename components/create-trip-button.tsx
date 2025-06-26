"use client"

import { useState } from "react"
import { BusinessTripForm } from "@/components/business-trip-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Sparkles } from "lucide-react"

export function CreateTripButton() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const handleCreateSubmit = (tripData: any) => {
    // For now, just show success message
    alert(`Trip "${tripData.title}" created successfully!`)
    setShowCreateDialog(false)
  }

  return (
    <>
      <Button
        onClick={() => setShowCreateDialog(true)}
        className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create New Trip
        <Sparkles className="w-4 h-4 ml-2" />
      </Button>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900/95 border-slate-700 backdrop-blur-lg">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Plus className="w-5 h-5 mr-2 text-green-400" />
              Create New Business Trip
            </DialogTitle>
          </DialogHeader>
          <BusinessTripForm onCancel={() => setShowCreateDialog(false)} onSubmit={handleCreateSubmit} />
        </DialogContent>
      </Dialog>
    </>
  )
}
