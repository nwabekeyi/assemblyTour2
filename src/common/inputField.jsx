
// Reusable Input Field
const InputField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    className = "",
    as = "input",
    children,
    ...props
  }) => {
    const baseStyle = {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #6b7280",
      borderRadius: "0.5rem",
      outline: "none",
      transition: "all 0.2s ease",
      backgroundColor: "white",
      color: "#111827",
      fontSize: "1rem",
    };
  
    const focusStyle = { borderColor: "#059669", boxShadow: "0 0 0 3px rgba(5, 150, 105, 0.2)" };
    const hoverStyle = { borderColor: "#10b981" };
  
    const inputClasses = "placeholder-gray-400 transition-all duration-200 hover:shadow-sm focus:shadow-md " + className;
  
    return (
      <div className={`space-y-1 ${className}`}>
        {label && <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">{label}</label>}
  
        {as === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={3}
            className={inputClasses}
            style={{ ...baseStyle, minHeight: "90px", resize: "vertical" }}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => (e.target.style.borderColor = "#6b7280")}
            onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseLeave={(e) => (e.target.style.borderColor = "#6b7280")}
            {...props}
          />
        ) : as === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`${inputClasses} appearance-none pr-10 bg-no-repeat bg-right-3 bg-center`}
            style={{
              ...baseStyle,
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 12 12'%3E%3Cpath stroke='%234B5563' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m1 4 5 5 5-5'/%3E%3C/svg%3E")`,
            }}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => (e.target.style.borderColor = "#6b7280")}
            onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseLeave={(e) => (e.target.style.borderColor = "#6b7280")}
            {...props}
          >
            {children}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
            style={baseStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => (e.target.style.borderColor = "#6b7280")}
            onMouseEnter={(e) => Object.assign(e.target.style, hoverStyle)}
            onMouseLeave={(e) => (e.target.style.borderColor = "#6b7280")}
            {...props}
          />
        )}
      </div>
    );
  };

  export default InputField;