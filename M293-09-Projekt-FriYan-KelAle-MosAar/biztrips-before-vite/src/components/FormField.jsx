"use client"

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  options = [],
}) {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`form-input ${error ? "error" : ""}`}
            rows={4}
          />
        )
      case "select":
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`form-input ${error ? "error" : ""}`}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`form-input ${error ? "error" : ""}`}
          />
        )
    }
  }

  return (
    <div className="form-field">
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {renderInput()}
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

export default FormField
