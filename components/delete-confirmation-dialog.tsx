"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AlertTriangle, Lock, Shield } from "lucide-react"

interface DeleteConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName: string
  itemType: "trip" | "wishlist item"
}

const DELETE_PASSWORD = "delete123" // You can change this password

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType,
}: DeleteConfirmationDialogProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (password === DELETE_PASSWORD) {
      onConfirm()
      handleClose()
    } else {
      setError("Incorrect password. Please try again.")
    }

    setIsLoading(false)
  }

  const handleClose = () => {
    setPassword("")
    setError("")
    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-slate-900/95 border-red-500/30 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            You are about to delete the {itemType}: <span className="font-semibold text-white">"{itemName}"</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-red-300 mb-2">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Security Check Required</span>
            </div>
            <p className="text-sm text-red-200">
              This action cannot be undone. Please enter the deletion password to confirm.
            </p>
          </div>

          <div>
            <Label htmlFor="delete-password" className="text-slate-300">
              Deletion Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                id="delete-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to confirm deletion"
                className="pl-10 bg-slate-800/50 border-slate-600 text-white backdrop-blur-sm"
                required
                autoFocus
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>

          <div className="bg-slate-800/50 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-xs text-slate-400">
              💡 <strong>Hint:</strong> The password is "delete123"
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 backdrop-blur-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 backdrop-blur-sm"
              disabled={isLoading || !password}
            >
              {isLoading ? "Deleting..." : "Delete Forever"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
