import React from "react";

function BusinessTripCard({ trip, onEdit, onDelete }) {
  if (!trip) return null;
  return (
    <div className="business-trip-card">
      <h3>{trip.title || "Geschäftsreise"}</h3>
      <p><strong>Ort:</strong> {trip.location}</p>
      <p><strong>Datum:</strong> {trip.date}</p>
      <p><strong>Beschreibung:</strong> {trip.description}</p>
      <div className="actions">
        {onEdit && (
          <button onClick={() => onEdit(trip)}>Bearbeiten</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(trip.id)}>Löschen</button>
        )}
      </div>
    </div>
  );
}

export default BusinessTripCard;
