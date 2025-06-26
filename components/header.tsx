import { Plane, Heart } from "lucide-react"

export function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Plane className="w-7 h-7 text-white" />
        </div>
        <Heart className="w-6 h-6 text-pink-400" />
      </div>

      <h1 className="text-4xl font-bold text-white mb-2">Business Trips - Wishlist</h1>
      <p className="text-xl text-slate-300 mb-1">Functional with JAVA & REACT</p>
      <h4 className="text-lg text-purple-300">Version-2 (using useReducer with pure functions instead of useState)</h4>
    </header>
  )
}
