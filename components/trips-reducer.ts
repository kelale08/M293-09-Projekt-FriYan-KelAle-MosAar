import type { BusinessTrip } from "@/app/page"

export interface WishlistAction {
  type: "empty" | "add" | "deleteItem" | "createTrip" | "deleteTrip" | "clearAll"
  trip?: BusinessTrip
  id?: number
}

// Pure function that accepts state and an action and returns a new state
export default function tripsReducer(wishlist: BusinessTrip[], action: WishlistAction): BusinessTrip[] {
  switch (action.type) {
    case "empty":
      return []

    case "add": {
      if (!action.trip) return wishlist

      // Check if trip already exists in wishlist
      const exists = wishlist.some((item) => item.id === action.trip!.id)
      if (exists) {
        return wishlist // Don't add duplicates
      }

      // Add complete trip object with ALL properties preserved
      const newTrip: BusinessTrip = {
        id: action.trip.id,
        title: action.trip.title,
        description: action.trip.description,
        startTrip: action.trip.startTrip,
        endTrip: action.trip.endTrip,
        category: action.trip.category,
        status: action.trip.status,
        budget: action.trip.budget,
        employee: action.trip.employee,
      }

      return [...wishlist, newTrip]
    }

    case "deleteItem": {
      if (action.id === undefined) return wishlist
      return wishlist.filter((item) => item.id !== action.id)
    }

    case "createTrip":
    case "deleteTrip":
      // Handle these cases if needed in the future
      return wishlist

    case "clearAll": {
      return []
    }

    default:
      throw new Error("Unhandled action: " + action.type)
  }
}
