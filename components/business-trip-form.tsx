"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { BusinessTrip } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BusinessTripFormProps {
  trip?: BusinessTrip | null
  onCancel: () => void
  onSubmit: (trip: Omit<BusinessTrip, "id">) => void
}

export function BusinessTripForm({ trip, onCancel, onSubmit }: BusinessTripFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTrip: "",
    endTrip: "",
    category: "Conference" as BusinessTrip["category"],
    status: "planned" as BusinessTrip["status"],
    budget: "",
    employee: "",
  })

  useEffect(() => {
    if (trip) {
      setFormData({
        title: trip.title,
        description: trip.description,
        startTrip: trip.startTrip,
        endTrip: trip.endTrip,
        category: trip.category,
        status: trip.status,
        budget: trip.budget?.toString() || "",
        employee: trip.employee || "",
      })
    }
  }, [trip])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const tripData = {
      title: formData.title,
      description: formData.description,
      startTrip: formData.startTrip,
      endTrip: formData.endTrip,
      category: formData.category,
      status: formData.status,
      budget: formData.budget ? Number.parseFloat(formData.budget) : undefined,
      employee: formData.employee || undefined,
    }

    onSubmit(tripData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title" className="text-slate-300">
          Trip Title *
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g., Berlin Business Conference"
          className="bg-slate-700 border-slate-600 text-white"
          required
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-slate-300">
          Description *
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe the purpose and details of the trip..."
          className="bg-slate-700 border-slate-600 text-white"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTrip" className="text-slate-300">
            Start Date *
          </Label>
          <Input
            id="startTrip"
            type="date"
            value={formData.startTrip}
            onChange={(e) => handleChange("startTrip", e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>

        <div>
          <Label htmlFor="endTrip" className="text-slate-300">
            End Date *
          </Label>
          <Input
            id="endTrip"
            type="date"
            value={formData.endTrip}
            onChange={(e) => handleChange("endTrip", e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category" className="text-slate-300">
            Category *
          </Label>
          <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="Conference">Conference</SelectItem>
              <SelectItem value="Meeting">Meeting</SelectItem>
              <SelectItem value="Training">Training</SelectItem>
              <SelectItem value="Exhibition">Exhibition</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="status" className="text-slate-300">
            Status *
          </Label>
          <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="employee" className="text-slate-300">
            Employee
          </Label>
          <Input
            id="employee"
            value={formData.employee}
            onChange={(e) => handleChange("employee", e.target.value)}
            placeholder="Employee name"
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>

        <div>
          <Label htmlFor="budget" className="text-slate-300">
            Budget ($)
          </Label>
          <Input
            id="budget"
            type="number"
            value={formData.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          {trip ? "Update Trip" : "Create Trip"}
        </Button>
      </div>
    </form>
  )
}
