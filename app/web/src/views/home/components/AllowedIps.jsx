/* eslint-disable react/prop-types */

export const AllowedIps = ({ formValues, setFormValues }) => {
    const handleIPChange = (e) => {
        const value = e.target.value;
        const ipArray = value.split(",").map(ip => ip.trim());
        
        setFormValues((prevValues) => ({
          ...prevValues,
          allowed_ips: ipArray,
        }));
      };
    
      return (
        <div className="mb-2">
          <label htmlFor="allowed_ips" className="form-label">Allowed IPs</label>
          <input
            type="text"
            className="form-control"
            id="allowed_ips"
            placeholder="Enter IPs separated by commas or enter * to accept any IP"
            value={formValues.allowed_ips.join(", ")} // Convertir el array a una string para el campo de entrada.
            onChange={handleIPChange}
          />
        </div>
      );
}
