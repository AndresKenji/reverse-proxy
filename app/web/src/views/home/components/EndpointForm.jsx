/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { AllowedIps } from "./AllowedIps"
import { AllowedMethods } from "./AllowedMethods"
import { BackendForm } from "./BackendForm"
import { useDispatch } from "react-redux";
import { addEndpoint, editEndpoint  } from "../../../store/slices/config/configSlice";

export const EndpointForm = ({ formData, index,setShowForm  }) => {
  const dispatch = useDispatch()
  const [formValues, setFormValues] = useState({
    prefix: "",
    header_identifier: "",
    backend_urls: [],
    secure: false,
    allowed_methods: [],
    allowed_ips: [],
  });

  // Actualizar el estado cuando formData cambia (cuando se selecciona un endpoint para editar)
  useEffect(() => {
    if (formData) {
      setFormValues(formData);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formatear el prefix solo en el momento del envío
    let formattedPrefix = formValues.prefix;

    if (!formattedPrefix.startsWith("/")) {
      formattedPrefix = "/" + formattedPrefix;
    }
    if (!formattedPrefix.endsWith("/")) {
      formattedPrefix = formattedPrefix + "/";
    }

    // Actualizamos los valores antes de enviarlos
    const updatedFormValues = {
      ...formValues,
      prefix: formattedPrefix,
    };
    
    console.log("Formulario enviado:", updatedFormValues);

    // Si formData está presente, significa que estamos editando
    if (formData) {
      dispatch(editEndpoint({ index: index, endpoint: updatedFormValues }));
    } else {
      dispatch(addEndpoint(updatedFormValues));
    }
    setShowForm(false)
  };

  return (
    <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text">/</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="prefix"
                  name="prefix"
                  value={formValues.prefix || ""}
                  onChange={handleInputChange}
                />
                <span className="input-group-text">@</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Header Identifier"
                  name="header_identifier"
                  value={formValues.header_identifier || ""}
                  onChange={handleInputChange}
                />
              </div>

              <BackendForm formValues={formValues} setFormValues={setFormValues} />
              <AllowedMethods formValues={formValues} setFormValues={setFormValues} />
              <AllowedIps formValues={formValues} setFormValues={setFormValues} />

              <button type="submit" className="btn btn-success">
                {formData? "Save": "Add"}
              </button>
            </form>
          </div>
        </div>
  )
}
