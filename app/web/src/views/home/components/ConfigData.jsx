/* eslint-disable react/prop-types */
import { useState } from "react";
import { EndpointCard } from "./EndpointCard";
import { EndpointForm } from "./EndpointForm";

export const ConfigData = ({data, loading, error, modified, saveConfig}) => {
  
  const [showForm, setShowForm] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [editIndex, seteditIndex] = useState(null)

  const toggleForm = () => {
    setShowForm((prev) => !prev);
    if (showForm) {
      setSelectedEndpoint(null); // Resetear el formulario cuando se cierra
    }
  };

  const handleEditClick = (endpoint, index) => {
    setSelectedEndpoint(endpoint); // Establecer el endpoint seleccionado para editar
    setShowForm(true); // Mostrar el formulario
    seteditIndex(index)
  };

  

  return (
    <div>
      {error && <div className="alert alert-danger"> {error} </div>}
      <div className="d-flex justify-content-between">
        <h1>
          Current config
        </h1>
        {
          modified && 
          <button className="btn save-btn" onClick={() => { 
            saveConfig() 
            setShowForm(false)
            }}>
            <i className="bi bi-floppy"></i> save config
          </button>
        }

      </div>
      {loading && 
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }
      {data && (
        <div className="container p-2">
          <p>Created at: {data.created_at}</p>
          <div className="d-flex d-flex-wrap">
            {data.endpoints.map((cfgEnpoint, index) => (
              <EndpointCard 
                endpoint={cfgEnpoint} 
                index={index} 
                key={`${cfgEnpoint.prefix}-${index}`}
                onEdit={() => handleEditClick(cfgEnpoint, index)} // Pasar la función de edición
              />
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <button className="btn btn-primary mb-3" onClick={toggleForm}>
          {showForm ? "Hide Form" : "Add Endpoint"}
        </button>
      </div>

      {showForm && (
        <EndpointForm formData={selectedEndpoint} index={editIndex} setShowForm={setShowForm} />
      )}
    </div>
  );
};
