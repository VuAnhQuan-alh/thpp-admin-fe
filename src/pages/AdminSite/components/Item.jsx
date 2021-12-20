import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { checkKeyNull } from '../../../helpers/functions'
import { apiUpdateUser } from '../../../services/apiFunction/Authen'

const Item = ({ data, styleTH }) => {
  const [user, setUser] = useState({})
  const iptEl = useRef(null)
  const [onChange, setOnChange] = useState(false)
  const [status, setStatus] = useState("")
  const [roles, setRoles] = useState([])
  const [upd, setUpd] = useState(+localStorage.getItem("updated") || 2)

  useEffect(() => {
    setRoles(data?.roles)
    setUser(data)
  }, [data])
  const changeRoles = (role) => {
    let result = []
    if (roles.includes(role)) {
      result = roles.filter(i => i !== role)
    } else {
      result = [...roles, role]
    }
    setRoles(result)
  }
  const checkRoles = role => roles.includes(role)
  const updateUser = (isChange) => {
    const body = [{
      username: data?.username,
      roles: roles
    }]
    apiUpdateUser(body)
      .then(() => {
        localStorage.setItem('updated', isChange)
      })
      .then(() => {
        console.log("oke")
        toast.success('Cập nhật quyền truy cập thành công', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
  }

  return (
    <>
      <tr>
        <th>
          <ToastContainer />
          <div style={{ width: "70px", textAlign: "center" }}>
            <button
              className={onChange ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary"}
              onClick={() => {
                if (onChange) {
                  setUpd(upd + 1)
                  updateUser(upd + 1)
                }
                setOnChange(!onChange)
              }}>
              {onChange ? "Update" : "Edit"}
            </button>
          </div>
        </th>
        <td style={styleTH}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth: "max-content" }}>
            <i className="fas fa-user-tie"></i>
            <div style={{ marginLeft: "10px" }}>{user?.name}</div>
          </div>
        </td>
        <td style={styleTH}>{user?.username}</td>
        <td style={styleTH}>{user?.email}</td>
        <td style={styleTH}>{user?.firstSync ? "True" : "False"}</td>
        <td>
          <input
            style={{ cursor: "pointer" }}
            type="checkbox"
            checked={checkRoles("TRANSACTION_CONTROL")}
            onClick={() => changeRoles("TRANSACTION_CONTROL")}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <input
            style={{ cursor: "pointer" }}
            type="checkbox"
            checked={checkRoles("TRANSACTION_LIST")}
            onClick={() => changeRoles("TRANSACTION_LIST")}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <input
            style={{ cursor: "pointer" }}
            type="checkbox"
            checked={checkRoles("SALES_REPORT")}
            onClick={() => changeRoles("SALES_REPORT")}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <input
            style={{ cursor: "pointer" }}
            type="checkbox"
            checked={checkRoles("ADMINISTRATION")}
            onClick={() => changeRoles("ADMINISTRATION")}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <div className="form-check form-switch">
            <input
              ref={iptEl}
              type="checkbox"
              checked={status}
              role="switch"
              disabled={!onChange}
              className="form-check-input"
              onClick={() => setStatus(!status)}
            />
            <div style={{ width: "70px", textAlign: "right" }}>{status ? "Active" : "Inactive"}</div>
          </div>
        </td>
        <td style={styleTH}>{user?.phoneNumber}</td>
        <td style={styleTH}>{user?.cmndcccd || "187925792"}</td>
      </tr>
    </>
  )
}

export default Item