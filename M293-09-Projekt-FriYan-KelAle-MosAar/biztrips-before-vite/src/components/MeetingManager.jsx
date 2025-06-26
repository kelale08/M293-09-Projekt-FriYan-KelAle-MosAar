import React from "react";

function MeetingManager({ meetings, onEdit, onDelete }) {
  if (!meetings || meetings.length === 0) {
    return <div>Keine Meetings vorhanden.</div>;
  }
  return (
    <div className="meeting-manager">
      <h2>Meetings</h2>
      <ul>
        {meetings.map((meeting) => (
          <li key={meeting.id}>
            <strong>{meeting.title || "Meeting"}</strong> am {meeting.date}
            <div className="actions">
              {onEdit && (
                <button onClick={() => onEdit(meeting)}>Bearbeiten</button>
              )}
              {onDelete && (
                <button onClick={() => onDelete(meeting.id)}>Löschen</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeetingManager;
