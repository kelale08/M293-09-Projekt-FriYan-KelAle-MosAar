"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Sparkles } from "lucide-react"
import type { FilterState } from "@/app/page"

interface SearchAndFilterProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function SearchAndFilter({ filters, onFiltersChange }: SearchAndFilterProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value })
  }

  const handleCategoryChange = (value: string) => {
    onFiltersChange({ ...filters, category: value })
  }

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value })
  }

  const clearFilters = () => {
    onFiltersChange({ search: "", category: "", status: "" })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Search className="w-4 h-4 text-white" />
          </div>
          Search & Filter Your Trips
          <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
              <Input
                placeholder="Search by title, description, or employee..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-blue-200 backdrop-blur-sm focus:bg-white/20 transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <Select value={filters.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/95 border-slate-600 backdrop-blur-lg">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Conference">🎯 Conference</SelectItem>
                <SelectItem value="Meeting">🤝 Meeting</SelectItem>
                <SelectItem value="Training">📚 Training</SelectItem>
                <SelectItem value="Exhibition">🏛️ Exhibition</SelectItem>
                <SelectItem value="Review">📊 Review</SelectItem>
                <SelectItem value="Other">📋 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <Select value={filters.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/95 border-slate-600 backdrop-blur-lg">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planned">🔵 Planned</SelectItem>
                <SelectItem value="ongoing">🟡 Ongoing</SelectItem>
                <SelectItem value="completed">🟢 Completed</SelectItem>
                <SelectItem value="cancelled">🔴 Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(filters.search || filters.category !== "all" || filters.status !== "all") && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4 text-blue-300" />
            <span className="text-blue-200">Active filters:</span>
            {filters.search && (
              <span className="bg-blue-500/30 border border-blue-400/50 px-3 py-1 rounded-full text-blue-100 backdrop-blur-sm">
                "{filters.search}"
              </span>
            )}
            {filters.category !== "all" && (
              <span className="bg-purple-500/30 border border-purple-400/50 px-3 py-1 rounded-full text-purple-100 backdrop-blur-sm">
                {filters.category}
              </span>
            )}
            {filters.status !== "all" && (
              <span className="bg-green-500/30 border border-green-400/50 px-3 py-1 rounded-full text-green-100 backdrop-blur-sm">
                {filters.status}
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-red-300 hover:text-red-200 ml-2 px-2 py-1 rounded hover:bg-red-500/20 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
