"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import * as businessTripService from "../services/businessTripServices"
import * as meetingService from "../services/meetingService"

const BusinessTripContext = createContext()

const initialState = {
  trips: [],
  meetings: [],
  loading: false,
  error: null,
  filters: {
    month: "",
    year: "",
    search: "",
  },
}

function businessTripReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "SET_TRIPS":
      return { ...state, trips: action.payload, loading: false, error: null }
    case "ADD_TRIP":
      return { ...state, trips: [...state.trips, action.payload] }
    case "UPDATE_TRIP":
      return {
        ...state,
        trips: state.trips.map((trip) => (trip.id === action.payload.id ? action.payload : trip)),
      }
    case "DELETE_TRIP":
      return {
        ...state,
        trips: state.trips.filter((trip) => trip.id !== action.payload),
      }
    case "SET_MEETINGS":
      return { ...state, meetings: action.payload }
    case "ADD_MEETING":
      return { ...state, meetings: [...state.meetings, action.payload] }
    case "UPDATE_MEETING":
      return {
        ...state,
        meetings: state.meetings.map((meeting) => (meeting.id === action.payload.id ? action.payload : meeting)),
      }
    case "DELETE_MEETING":
      return {
        ...state,
        meetings: state.meetings.filter((meeting) => meeting.id !== action.payload),
      }
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } }
    default:
      return state
  }
}

export function BusinessTripProvider({ children }) {
  const [state, dispatch] = useReducer(businessTripReducer, initialState)

  // Load initial data
  useEffect(() => {
    loadTrips()
    loadMeetings()
  }, [])

  const loadTrips = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const trips = await businessTripService.getAllTrips()
      dispatch({ type: "SET_TRIPS", payload: trips })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
      console.error("Error loading trips:", error)
    }
  }

  const loadMeetings = async () => {
    try {
      const meetings = await meetingService.getAllMeetings()
      dispatch({ type: "SET_MEETINGS", payload: meetings })
    } catch (error) {
      console.error("Error loading meetings:", error)
    }
  }

  const createTrip = async (tripData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const newTrip = await businessTripService.createTrip(tripData)
      dispatch({ type: "ADD_TRIP", payload: newTrip })
      return newTrip
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
      throw error
    }
  }

  const updateTrip = async (tripData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const updatedTrip = await businessTripService.updateTrip(tripData)
      dispatch({ type: "UPDATE_TRIP", payload: updatedTrip })
      return updatedTrip
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
      throw error
    }
  }

  const deleteTrip = async (tripId) => {
    try {
      await businessTripService.deleteTrip(tripId)
      dispatch({ type: "DELETE_TRIP", payload: tripId })
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message })
      throw error
    }
  }

  const createMeeting = async (meetingData) => {
    try {
      const newMeeting = await meetingService.createMeeting(meetingData)
      dispatch({ type: "ADD_MEETING", payload: newMeeting })
      return newMeeting
    } catch (error) {
      console.error("Error creating meeting:", error)
      throw error
    }
  }

  const updateMeeting = async (meetingData) => {
    try {
      const updatedMeeting = await meetingService.updateMeeting(meetingData)
      dispatch({ type: "UPDATE_MEETING", payload: updatedMeeting })
      return updatedMeeting
    } catch (error) {
      console.error("Error updating meeting:", error)
      throw error
    }
  }

  const deleteMeeting = async (meetingId) => {
    try {
      await meetingService.deleteMeeting(meetingId)
      dispatch({ type: "DELETE_MEETING", payload: meetingId })
    } catch (error) {
      console.error("Error deleting meeting:", error)
      throw error
    }
  }

  const setFilters = (filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters })
  }

  const value = {
    ...state,
    loadTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    createMeeting,
    updateMeeting,
    deleteMeeting,
    setFilters,
  }

  return <BusinessTripContext.Provider value={value}>{children}</BusinessTripContext.Provider>
}

export function useBusinessTrip() {
  const context = useContext(BusinessTripContext)
  if (!context) {
    throw new Error("useBusinessTrip must be used within a BusinessTripProvider")
  }
  return context
}
