"use client"
import { useBusinessTrip } from "../context/BusinessTripContext"

function FilterBar() {
  const { filters, setFilters } = useBusinessTrip()

  const handleFilterChange = (key, value) => {
    setFilters({ [key]: value })
  }

  const clearFilters = () => {
    setFilters({ month: "", year: "", search: "" })
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i - 2)

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="search">🔍 Search:</label>
        <input
          type="text"
          id="search"
          placeholder="Search trips..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="month">📅 Month:</label>
        <select
          id="month"
          value={filters.month}
          onChange={(e) => handleFilterChange("month", e.target.value)}
          className="filter-select"
        >
          <option value="">All months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="year">📅 Year:</label>
        <select
          id="year"
          value={filters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          className="filter-select"
        >
          <option value="">All years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-secondary clear-filters" onClick={clearFilters}>
        🗑️ Clear Filters
      </button>
    </div>
  )
}

export default FilterBar
