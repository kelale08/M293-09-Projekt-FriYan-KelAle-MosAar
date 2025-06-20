const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"

// Debug-Funktion für bessere Fehlerbehandlung
const debugLog = (operation, data) => {
  if (import.meta.env.DEV) {
    console.log(`🔧 [BusinessTripService] ${operation}:`, data)
  }
}

const handleResponse = async (response, operation) => {
  debugLog(`${operation} Response Status`, response.status)

  if (response.ok) {
    const data = await response.json()
    debugLog(`${operation} Success`, data)
    return data
  }

  const errorText = await response.text()
  debugLog(`${operation} Error`, { status: response.status, error: errorText })
  throw new Error(`${operation} failed: ${response.status} - ${errorText}`)
}

export async function getAllTrips() {
  try {
    debugLog("GET All Trips", `${baseUrl}/v1/trips`)
    const response = await fetch(`${baseUrl}/v1/trips`)
    return await handleResponse(response, "GET All Trips")
  } catch (error) {
    debugLog("GET All Trips Error", error)
    throw error
  }
}

export async function getTrip(id) {
  try {
    debugLog("GET Trip", `${baseUrl}/v1/trips/${id}`)
    const response = await fetch(`${baseUrl}/v1/trips/${id}`)
    return await handleResponse(response, "GET Trip")
  } catch (error) {
    debugLog("GET Trip Error", error)
    throw error
  }
}

export async function createTrip(tripData) {
  try {
    debugLog("CREATE Trip", tripData)
    const response = await fetch(`${baseUrl}/v1/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    })
    return await handleResponse(response, "CREATE Trip")
  } catch (error) {
    debugLog("CREATE Trip Error", error)
    throw error
  }
}

export async function updateTrip(tripData) {
  try {
    debugLog("UPDATE Trip", tripData)
    const response = await fetch(`${baseUrl}/v1/trips/${tripData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    })
    return await handleResponse(response, "UPDATE Trip")
  } catch (error) {
    debugLog("UPDATE Trip Error", error)
    throw error
  }
}

export async function deleteTrip(id) {
  try {
    debugLog("DELETE Trip", `${baseUrl}/v1/trips/${id}`)
    const response = await fetch(`${baseUrl}/v1/trips/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      debugLog("DELETE Trip Success", id)
      return true
    }

    throw new Error(`Delete failed: ${response.status}`)
  } catch (error) {
    debugLog("DELETE Trip Error", error)
    throw error
  }
}
