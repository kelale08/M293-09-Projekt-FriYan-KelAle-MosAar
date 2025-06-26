"use client"

import type { BusinessTrip } from "@/app/page"

interface WishlistTestProps {
  wishlist: BusinessTrip[]
}

export function WishlistTest({ wishlist }: WishlistTestProps) {
  return (
    <div className="mb-8">
      <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">Debug: Wishlist State</h2>
        <pre className="bg-slate-900 p-4 rounded text-sm text-slate-300 overflow-auto">
          {JSON.stringify(wishlist, null, 2)}
        </pre>
      </div>
    </div>
  )
}
