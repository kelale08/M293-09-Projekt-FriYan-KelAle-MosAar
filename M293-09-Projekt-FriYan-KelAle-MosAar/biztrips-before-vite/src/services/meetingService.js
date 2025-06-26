const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"

const debugLog = (operation, data) => {
  if (import.meta.env.DEV) {
    console.log(`🔧 [MeetingService] ${operation}:`, data)
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

export async function getAllMeetings() {
  try {
    debugLog("GET All Meetings", `${baseUrl}/meetings`)
    const response = await fetch(`${baseUrl}/meetings`)
    return await handleResponse(response, "GET All Meetings")
  } catch (error) {
    debugLog("GET All Meetings Error", error)
    throw error
  }
}

export async function getMeeting(id) {
  try {
    debugLog("GET Meeting", `${baseUrl}/meetings/${id}`)
    const response = await fetch(`${baseUrl}/meetings/${id}`)
    return await handleResponse(response, "GET Meeting")
  } catch (error) {
    debugLog("GET Meeting Error", error)
    throw error
  }
}

export async function createMeeting(meetingData) {
  try {
    debugLog("CREATE Meeting", meetingData)
    const response = await fetch(`${baseUrl}/meetings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingData),
    })
    return await handleResponse(response, "CREATE Meeting")
  } catch (error) {
    debugLog("CREATE Meeting Error", error)
    throw error
  }
}

export async function updateMeeting(meetingData) {
  try {
    debugLog("UPDATE Meeting", meetingData)
    const response = await fetch(`${baseUrl}/meetings/${meetingData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meetingData),
    })
    return await handleResponse(response, "UPDATE Meeting")
  } catch (error) {
    debugLog("UPDATE Meeting Error", error)
    throw error
  }
}

export async function deleteMeeting(id) {
  try {
    debugLog("DELETE Meeting", `${baseUrl}/meetings/${id}`)
    const response = await fetch(`${baseUrl}/meetings/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      debugLog("DELETE Meeting Success", id)
      return true
    }

    throw new Error(`Delete failed: ${response.status}`)
  } catch (error) {
    debugLog("DELETE Meeting Error", error)
    throw error
  }
}
