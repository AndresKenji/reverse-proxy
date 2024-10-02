/* eslint-disable react/prop-types */

export const AllowedMethods = ({ formValues, setFormValues }) => {
    const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    const handleMethodChange = (e) => {
      const { value, checked } = e.target;
  
      if (checked) {
        
        setFormValues((prevValues) => ({
          ...prevValues,
          allowed_methods: [...prevValues.allowed_methods, value],
        }));
      } else {
        
        setFormValues((prevValues) => ({
          ...prevValues,
          allowed_methods: prevValues.allowed_methods.filter((method) => method !== value),
        }));
      }
    };
  
    return (
      <div className="mb-3">
        <label className="form-label">Allowed HTTP Methods</label>
        <div>
          {methods.map((method) => (
            <div key={method} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id={`method-${method}`}
                value={method}
                checked={formValues.allowed_methods.includes(method)} // Mantener el checkbox marcado si está seleccionado
                onChange={handleMethodChange}
              />
              <label className="form-check-label" htmlFor={`method-${method}`}>
                {method}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
}
