import React from 'react'
import { checkKeyNull } from '../../../helpers/functions'
import { apiUpdateUser } from '../../../services/apiFunction/Authen'

const Item = ({ data, styleTH }) => {
  const [user, setUser] = React.useState({})
  const iptEl = React.useRef(null)
  const [onChange, setOnChange] = React.useState(false)
  const [fControl, setFControl] = React.useState(false)
  const [invoice, setInvoice] = React.useState(false)
  const [sales, setSales] = React.useState(false)
  const [admin, setAdmin] = React.useState(false)
  const [status, setStatus] = React.useState(false)

  React.useEffect(() => {
    setUser(data)
    setStatus(data?.enable || false)
    setAdmin(data?.administration || false)
    setSales(data?.saleReport || false)
    setInvoice(data?.transactionlist || false)
    setFControl(data?.transactioncontrol || false)
  }, [data])
  // console.log(user)
  const updateUser = () => {
    const body = {
      ...user,
      enable: status,
      administration: admin,
      saleReport: sales,
      transactionlist: invoice,
      transactioncontrol: fControl
    }
    apiUpdateUser(checkKeyNull(body)).then(res => {
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
            type="checkbox"
            checked={fControl}
            onClick={() => setFControl(!fControl)}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <input
            type="checkbox"
            checked={invoice}
            onClick={() => setInvoice(!invoice)}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <input
            type="checkbox"
            checked={sales}
            onClick={() => setSales(!sales)}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <input
            type="checkbox"
            checked={admin}
            onClick={() => setAdmin(!admin)}
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