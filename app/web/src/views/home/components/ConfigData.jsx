import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { EndpointCard } from "./EndpointCard";
import { AllowedMethods } from "./AllowedMethods";
import { BackendForm } from "./BackendForm";
import { AllowedIps } from "./AllowedIps";

export const ConfigData = () => {
  const { data, loading, error } = useFetch("http://localhost:8080/admin/config");
  const [formValues, setFormValues] = useState({
    prefix: "",
    header_identifier: "",
    backend_urls: [],
    secure: false,
    allowed_methods: [],
    allowed_ips: [],
  });
  const [showForm, setShowForm] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formValues);
  };

  const toggleForm = () => {
    setShowForm((prev) => !prev); 
  };

  

  return (
    <div>
      {error && <div className="alert alert-danger"> {error} </div>}
      <h1 className="text-center">Current config</h1>
      {loading && <div>Loading...</div>}
      {data && (
        <div className="container p-2">
          <p className="text-end">Created at: {data[0].created_at}</p>
          <div className="d-flex d-flex-wrap">
            {data[0].endpoints.map((cfgEnpoint, index) => (
              <EndpointCard endpoint={cfgEnpoint} key={`${cfgEnpoint.prefix}-${index}`} />
            ))}
          </div>
        </div>
      )}

      <button className="btn btn-primary mb-3" onClick={toggleForm}>
        {showForm ? "Hide Form" : "Add Endpoint"}
      </button>

      {showForm && (
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
                  placeholder="Identifier"
                  name="identifier"
                  value={formValues.identifier || ""}
                  onChange={handleInputChange}
                />
              </div>

              <BackendForm formValues={formValues} setFormValues={setFormValues} />
              <AllowedMethods formValues={formValues} setFormValues={setFormValues} />
              <AllowedIps formValues={formValues} setFormValues={setFormValues} />

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
