import React from 'react'
import { checkKeyNull } from '../../../helpers/functions'
import { apiUpdateUser } from '../../../services/apiFunction/Authen'

const Item = ({ data, styleTH }) => {
  const [user, setUser] = React.useState({})
  const iptEl = React.useRef(null)
  const [onChange, setOnChange] = React.useState(false)
  const [fControl, setFControl] = React.useState("")
  const [invoice, setInvoice] = React.useState("")
  const [sales, setSales] = React.useState("")
  const [admin, setAdmin] = React.useState("")
  const [status, setStatus] = React.useState("")

  React.useEffect(() => {
    setUser(data)
    setStatus(data?.enable || false)
    setAdmin(data?.administration || "0")
    setSales(data?.saleReport || "0")
    setInvoice(data?.transactionlist || "0")
    setFControl(data?.transactioncontrol || "0")
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
    // console.log(checkKeyNull(body))
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
            checked={fControl === "1"}
            onClick={() => setFControl(fControl === "0" ? "1" : "0")}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <input
            type="checkbox"
            checked={invoice === "1"}
            onClick={() => setInvoice(invoice === "0" ? "1" : "0")}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <input
            type="checkbox"
            checked={sales === "1"}
            onClick={() => setSales(sales === "0" ? "1" : "0")}
            disabled={!onChange}
            className="form-check-input"
          />
        </td>
        <td>
          <input
            type="checkbox"
            checked={admin === "1"}
            onClick={() => setAdmin(admin === "0" ? "1" : "0")}
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