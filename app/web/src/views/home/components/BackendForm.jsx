/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export const BackendForm = ({ formValues, setFormValues }) => {
  // Inicializa el estado del backendList con las URLs actuales del formValues
  const [backendList, setBackendList] = useState(() => {
    return Object.entries(formValues.backend_urls || {}).map(([identifier, url]) => ({
      identifier,
      url,
    })) || [{ identifier: "", url: "" }];
  });

  // Actualiza el backendList cuando formValues cambia
  useEffect(() => {
    setBackendList(Object.entries(formValues.backend_urls || {}).map(([identifier, url]) => ({
      identifier,
      url,
    })) || [{ identifier: "", url: "" }]);
  }, [formValues.backend_urls]);

  const handleBackendInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedBackends = [...backendList];
    updatedBackends[index][name] = value;
    setBackendList(updatedBackends);
    updateFormValues(updatedBackends);
  };

  const handleAddBackend = () => {
    setBackendList([...backendList, { identifier: "", url: "" }]);
  };

  // Actualiza backend_urls en formValues
  const updateFormValues = (updatedBackends) => {
    const backendUrls = updatedBackends.reduce((acc, backend) => {
      if (backend.identifier && backend.url) {
        acc[backend.identifier] = backend.url;
      }
      return acc;
    }, {});

    // Solo actualiza formValues si ha habido cambios en backendUrls
    if (JSON.stringify(backendUrls) !== JSON.stringify(formValues.backend_urls)) {
      setFormValues((prevValues) => ({
        ...prevValues,
        backend_urls: backendUrls,
      }));
    }
  };

  return (
    <div>
      {backendList.map((backend, index) => (
        <div className="input-group mb-3" key={index}>
          <input
            type="text"
            className="form-control"
            placeholder="Identifier"
            name="identifier"
            value={backend.identifier}
            onChange={(e) => handleBackendInputChange(e, index)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="URL"
            name="url"
            value={backend.url}
            onChange={(e) => handleBackendInputChange(e, index)}
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
