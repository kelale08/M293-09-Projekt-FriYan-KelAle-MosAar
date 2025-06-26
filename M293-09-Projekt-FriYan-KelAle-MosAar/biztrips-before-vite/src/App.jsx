"use client"

import { useState } from "react"
import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import BusinessTripList from "./components/BusinessTripList"
import BusinessTripForm from "./components/BusinessTripForm"
import MeetingManager from "./components/MeetingManager"
import { BusinessTripProvider } from "./context/BusinessTripContext"

function App() {
  const [currentView, setCurrentView] = useState("list")
  const [selectedTrip, setSelectedTrip] = useState(null)

  const renderCurrentView = () => {
    switch (currentView) {
      case "list":
        return (
          <BusinessTripList
            onEdit={(trip) => {
              setSelectedTrip(trip)
              setCurrentView("edit")
            }}
            onManageMeetings={(trip) => {
              setSelectedTrip(trip)
              setCurrentView("meetings")
            }}
            onCreateNew={() => {
              setSelectedTrip(null)
              setCurrentView("create")
            }}
          />
        )
      case "create":
      case "edit":
        return (
          <BusinessTripForm
            trip={selectedTrip}
            onSave={() => {
              setCurrentView("list")
              setSelectedTrip(null)
            }}
            onCancel={() => {
              setCurrentView("list")
              setSelectedTrip(null)
            }}
          />
        )
      case "meetings":
        return <MeetingManager trip={selectedTrip} onBack={() => setCurrentView("list")} />
      default:
        return <BusinessTripList />
    }
  }

  return (
    <BusinessTripProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <nav className="app-nav">
            <button
              className={`nav-btn ${currentView === "list" ? "active" : ""}`}
              onClick={() => setCurrentView("list")}
            >
              📋 Trip Overview
            </button>
            <button
              className={`nav-btn ${currentView === "create" ? "active" : ""}`}
              onClick={() => {
                setSelectedTrip(null)
                setCurrentView("create")
              }}
            >
              ➕ New Trip
            </button>
          </nav>
          {renderCurrentView()}
        </main>
        <Footer />
      </div>
    </BusinessTripProvider>
  )
}

export default App
