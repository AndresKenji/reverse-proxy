/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export const BackendForm = ({ formValues, setFormValues }) => {
  const [backendList, setBackendList] = useState([{ identifier: "", url: "" }]);

  const handleBackendInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedBackends = [...backendList];
    updatedBackends[index][name] = value;
    setBackendList(updatedBackends);
  };

  const handleAddBackend = () => {
    setBackendList([...backendList, { identifier: "", url: "" }]);
  };

  const updateBackendUrls = () => {
    const backendUrls = backendList.reduce((acc, backend) => {
      if (backend.identifier && backend.url) {
        acc[backend.identifier] = backend.url; 
      }
      return acc;
    }, {});

    setFormValues((prevValues) => ({
      ...prevValues,
      backend_urls: backendUrls, // Actualizar el objeto backend_urls en el formulario
    }));
  };

  // Llamar a la función updateBackendUrls cada vez que backendList cambia
  useEffect(() => {
    updateBackendUrls();
  }, [backendList]);

  return (
    <div>
      {/* Mostrar las backend URLs actuales */}
      {Object.keys(formValues.backend_urls).length > 0 && (
        <div className="mb-3">
          <h5>Current Backend URLs:</h5>
          <ul>
            {Object.entries(formValues.backend_urls).map(([identifier, url], index) => (
              <li key={index}>
                <strong>{identifier}:</strong> {url}
              </li>
            ))}
          </ul>
        </div>
      )}

      {backendList.map((backend, index) => (
        <div className="input-group mb-3" key={index}>
          <input
            type="text"
            className="form-control"
            placeholder="Identifier"
            name="identifier"
            value={backend.identifier}
            onChange={(e) => handleBackendInputChange(e, index)}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="URL"
            name="url"
            value={backend.url}
            onChange={(e) => handleBackendInputChange(e, index)}
            required
          />
        </div>
      ))}

      {/* Botón para agregar una nueva línea de Backend URL */}
      <button
        type="button"
        className="btn btn-success mt-2 mb-2"
        onClick={handleAddBackend}
      >
        <i className="bi bi-plus-square-fill"></i> Add another Backend URL
      </button>
    </div>
  );
};
