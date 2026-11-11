export default function FormField({ label, error, required = false, ...inputProps }) {
  const errorId = `${inputProps.id}-error`

  return (
    <div className="form-group">
      <label htmlFor={inputProps.id}>
        {required && <span className="required-mark">*</span>}
        {label}
      </label>
      <input
        {...inputProps}
        required={required}
        className="form-input"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <div id={errorId} className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
