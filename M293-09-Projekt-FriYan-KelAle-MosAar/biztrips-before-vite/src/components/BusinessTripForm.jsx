"use client"

import { useState, useEffect } from "react"
import { useBusinessTrip } from "../context/BusinessTripContext"
import FormField from "./FormField"
import LoadingSpinner from "./LoadingSpinner"

function BusinessTripForm({ trip, onSave, onCancel }) {
  const { createTrip, updateTrip, loading } = useBusinessTrip()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTrip: "",
    endTrip: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (trip) {
      setFormData({
        title: trip.title || "",
        description: trip.description || "",
        startTrip: trip.startTrip ? new Date(trip.startTrip).toISOString().slice(0, 16) : "",
        endTrip: trip.endTrip ? new Date(trip.endTrip).toISOString().slice(0, 16) : "",
      })
    }
  }, [trip])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    if (!formData.startTrip) {
      newErrors.startTrip = "Start date is required"
    }

    if (!formData.endTrip) {
      newErrors.endTrip = "End date is required"
    }

    if (formData.startTrip && formData.endTrip) {
      const start = new Date(formData.startTrip)
      const end = new Date(formData.endTrip)

      if (start >= end) {
        newErrors.endTrip = "End date must be after start date"
      }

      if (start < new Date().setHours(0, 0, 0, 0)) {
        newErrors.startTrip = "Start date cannot be in the past"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const tripData = {
        ...formData,
        startTrip: new Date(formData.startTrip).toISOString(),
        endTrip: new Date(formData.endTrip).toISOString(),
      }

      if (trip) {
        tripData.id = trip.id
        await updateTrip(tripData)
      } else {
        await createTrip(tripData)
      }

      onSave()
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="business-trip-form">
      <div className="form-header">
        <h2>{trip ? "✏️ Edit Business Trip" : "➕ Create New Business Trip"}</h2>
      </div>

      <form onSubmit={handleSubmit} className="trip-form">
        <FormField
          label="Trip Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="e.g., San Francisco Tech Conference"
          required
        />

        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          placeholder="Describe the purpose and details of this business trip..."
          required
        />

        <div className="form-row">
          <FormField
            label="Start Date & Time"
            name="startTrip"
            type="datetime-local"
            value={formData.startTrip}
            onChange={handleChange}
            error={errors.startTrip}
            required
          />

          <FormField
            label="End Date & Time"
            name="endTrip"
            type="datetime-local"
            value={formData.endTrip}
            onChange={handleChange}
            error={errors.endTrip}
            required
          />
        </div>

        {errors.submit && <div className="error-message">❌ {errors.submit}</div>}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : trip ? "Update Trip" : "Create Trip"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BusinessTripForm
