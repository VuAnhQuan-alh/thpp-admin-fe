import React from 'react'
import { checkKeyNull } from '../../../helpers/functions'
import { apiUpdateUser } from '../../../services/apiFunction/Authen'

const Item = ({ data, styleTH }) => {
  const [user, setUser] = React.useState({})
  const iptEl = React.useRef(null)
  const [onChange, setOnChange] = React.useState(false)
  const [status, setStatus] = React.useState("")
  const [roles, setRoles] = React.useState([])

  React.useEffect(() => {
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
  const updateUser = () => {
    const body = [{
      username: data?.username,
      roles: roles
    }]
    apiUpdateUser(body).then(res => {
      console.log(res)
    })
  }

  return (
    <>
      <tr>
        <th>
          <div style={{ width: "70px", textAlign: "center" }}>
            <button
              className={onChange ? "btn btn-sm btn-primary" : "btn btn-sm btn-secondary"}
              onClick={() => {
                if (onChange) updateUser()
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