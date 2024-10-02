import { useState } from "react";

export const EndpointForm = () => {
    const [formValues, setFormValues] = useState({
        prefix: "",
        header_identifier: "",
        backend_urls: [],
        secure: false,
        allowed_methods: [],
        allowed_ips: [],
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({
          ...prevValues,
          [name]: value,
        }));
      };
      const handleBackendUrlChange = (index, field, value) => {
        const updatedBackendUrls = [...formValues.backend_urls];
        updatedBackendUrls[index] = {
          ...updatedBackendUrls[index],
          [field]: value,
        };
        setFormValues((prevValues) => ({
          ...prevValues,
          backend_urls: updatedBackendUrls,
        }));
      };
    
      const addBackendUrl = () => {
        setFormValues((prevValues) => ({
          ...prevValues,
          backend_urls: [...prevValues.backend_urls, { identifier: "", url: "" }],
        }));
      };
      
      const handleMethodChange = (index, value) => {
        const updatedMethods = [...formValues.allowed_methods];
        updatedMethods[index] = value;
        setFormValues((prevValues) => ({
          ...prevValues,
          allowed_methods: updatedMethods,
        }));
      };
    
      const addMethod = () => {
        setFormValues((prevValues) => ({
          ...prevValues,
          allowed_methods: [...prevValues.allowed_methods, ""],
        }));
      };
    
      const handleIpChange = (index, value) => {
        const updatedIps = [...formValues.allowed_ips];
        updatedIps[index] = value;
        setFormValues((prevValues) => ({
          ...prevValues,
          allowed_ips: updatedIps,
        }));
      };
    
      const addIp = () => {
        setFormValues((prevValues) => ({
          ...prevValues,
          allowed_ips: [...prevValues.allowed_ips, ""],
        }));
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formValues);
      };
  return (
    <>
    <button className="btn btn-success mt-2 mb-2" onClick={addBackendUrl}>
        <i className="bi bi-plus-square-fill"></i> Add Backend URL
      </button>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
        <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                <span className="input-group-text" id="prefix-desc">/</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="prefix"
                    name="prefix"
                    aria-describedby="prefix-desc"
                    value={formValues.prefix || ""}
                    onChange={handleInputChange}
                />
                <span className="input-group-text" id="identifier-desc">@</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Identifier"
                    name="identifier"
                    aria-describedby="identifier-desc"
                    value={formValues.identifier || ""}
                    onChange={handleInputChange}
                />
                </div>

                <div className="mb-2">
                <label htmlFor="url" className="form-label">Your vanity URL</label>
                <div className="input-group">
                    <span className="input-group-text" id="basic-addon3">
                    https://apigwdd.com/{formValues.prefix}/
                    </span>
                    <input type="text" className="form-control" id="url" aria-describedby="basic-addon3 basic-addon4" />
                </div>
                </div>

                {/* Backend URLs */}
                {formValues.backend_urls.map((backend, index) => (
                <div key={index} className="mb-2">
                    <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Identifier"
                        value={backend.identifier}
                        onChange={(e) => handleBackendUrlChange(index, "identifier", e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="URL"
                        value={backend.url}
                        onChange={(e) => handleBackendUrlChange(index, "url", e.target.value)}
                    />
                    </div>
                </div>
                ))}

                {/* Allowed Methods */}
                <div className="mb-2">
                <label>Allowed Methods</label>
                {formValues.allowed_methods.map((method, index) => (
                    <input
                    key={index}
                    type="text"
                    className="form-control mb-2"
                    placeholder="Method"
                    value={method}
                    onChange={(e) => handleMethodChange(index, e.target.value)}
                    />
                ))}
                <button type="button" className="btn btn-primary" onClick={addMethod}>
                    Add Method
                </button>
                </div>

                {/* Allowed IPs */}
                <div className="mb-2">
                <label>Allowed IPs</label>
                {formValues.allowed_ips.map((ip, index) => (
                    <input
                    key={index}
                    type="text"
                    className="form-control mb-2"
                    placeholder="IP"
                    value={ip}
                    onChange={(e) => handleIpChange(index, e.target.value)}
                    />
                ))}
                <button type="button" className="btn btn-primary" onClick={addIp}>
                    Add IP
                </button>
                </div>

                <button type="submit" className="btn btn-success">
                Submit
                </button>
        </form>
        </div>
      </div>
    </>

  )
}
