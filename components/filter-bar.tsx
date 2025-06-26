"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

interface FilterBarProps {
  onFilter: (filters: {
    status?: string
    destination?: string
    employee?: string
    dateRange?: { start: string; end: string }
  }) => void
}

export function FilterBar({ onFilter }: FilterBarProps) {
  const [filters, setFilters] = useState({
    status: "all",
    destination: "",
    employee: "",
    startDate: "",
    endDate: "",
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)

    // Apply filters
    onFilter({
      status: newFilters.status,
      destination: newFilters.destination,
      employee: newFilters.employee,
      dateRange:
        newFilters.startDate || newFilters.endDate
          ? {
              start: newFilters.startDate,
              end: newFilters.endDate,
            }
          : undefined,
    })
  }

  const clearFilters = () => {
    const clearedFilters = {
      status: "all",
      destination: "",
      employee: "",
      startDate: "",
      endDate: "",
    }
    setFilters(clearedFilters)
    onFilter({})
  }

  const hasActiveFilters =
    filters.status !== "all" || filters.destination || filters.employee || filters.startDate || filters.endDate

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                {showAdvanced ? "Simple" : "Advanced"}
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search destination..."
                value={filters.destination}
                onChange={(e) => handleFilterChange("destination", e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search employee..."
                value={filters.employee}
                onChange={(e) => handleFilterChange("employee", e.target.value)}
                className="pl-10"
              />
            </div>

            {showAdvanced && (
              <>
                <div>
                  <Input
                    type="date"
                    placeholder="Start date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange("startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    placeholder="End date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange("endDate", e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
