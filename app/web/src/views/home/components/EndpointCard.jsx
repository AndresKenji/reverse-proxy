/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { deleteEndpoint } from "../../../store/slices/config/configSlice";
import { Tooltip } from 'react-tooltip'


export const EndpointCard = ({ endpoint, index, onEdit }) => {
  const dispatch = useDispatch()

  
  return (
    <div className="card m-2" style={{width: '22rem'}} key={endpoint.prefix}>
      <div className="card-header d-flex justify-content-between">
      {endpoint.prefix}
              <Tooltip id="delete-tooltip" />
              <i  className="bi bi-x-circle delete-btn" 
                  onClick={() => dispatch(deleteEndpoint({ index }))}
                  data-tooltip-id="delete-tooltip" data-tooltip-content="Eliminar endpoint"
                  ></i>
      </div>
        <div className="card-body">
            <h5 className="card-title d-flex justify-content-between">
            </h5>
            <h6 className="card-subtitle"> <strong>Identifier:</strong>  {endpoint.header_identifier }</h6>
            <ul className="list-group list-group-flush">
            {
            Object.entries(endpoint.backend_urls).map(([key, url],index) => (
                <li className="list-group-item" 
                    key={index}>
                      <strong>{key}:</strong> {url}
                </li>
            ))
            }
            </ul>
            <Tooltip id="edit-tooltip" />
            <i  className="bi bi-pencil-square" 
                onClick={() => onEdit()}
                data-tooltip-id="edit-tooltip" data-tooltip-content="Editar endpoint"
            ></i>            
        </div>
        <div className="card-footer text-body-secondary">
        {endpoint.allowed_methods.map((method, index) => (
           <span key={index}>{method} </span> 
          ))}
        </div>
    </div>
  )
}
