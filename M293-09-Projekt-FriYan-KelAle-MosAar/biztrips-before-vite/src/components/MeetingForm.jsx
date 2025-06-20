"use client"

import { useState, useEffect } from "react"
import { useBusinessTrip } from "../context/BusinessTripContext"
import FormField from "./FormField"

function MeetingForm({ meeting, trip, onSave, onCancel }) {
  const { createMeeting, updateMeeting } = useBusinessTrip()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (meeting) {
      setFormData({
        title: meeting.title || "",
        description: meeting.description || "",
      })
    }
  }, [meeting])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Meeting title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Meeting description is required"
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
      const meetingData = {
        ...formData,
        businessTrip: { id: trip.id },
      }

      if (meeting) {
        meetingData.id = meeting.id
        await updateMeeting(meetingData)
      } else {
        await createMeeting(meetingData)
      }

      onSave()
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="meeting-form-overlay">
      <div className="meeting-form">
        <div className="form-header">
          <h3>{meeting ? "✏️ Edit Meeting" : "➕ Add New Meeting"}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <FormField
            label="Meeting Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="e.g., Opening Keynote"
            required
          />

          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            placeholder="Describe the meeting agenda and objectives..."
            required
          />

          {errors.submit && <div className="error-message">❌ {errors.submit}</div>}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : meeting ? "Update Meeting" : "Add Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MeetingForm
