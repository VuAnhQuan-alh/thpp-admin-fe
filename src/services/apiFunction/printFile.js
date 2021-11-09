import moment from "moment"
import httpServices from "../httpServices"
import { toast } from "react-toastify"

const createType = (type) => {
  switch (type) {
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessing"
    case "doc":
      return "application/msword"
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;"
    case "csv":
      return "text/csv"
    default:
      return "application/pdf"
  }
}

export const printFile = async (params) => {
  const { url, body, type, name, message, method } = params
  const typeCreated = createType(type)
  console.log(url)

  try {
    const response = method === "GET"
      ? await httpServices.get(url, "", { responseType: "arraybuffer" })
      : await httpServices.post(url, body || null, { responseType: "arraybuffer" })

    if (response) {
      if (response?.byteLength > 0) {
        const file = new Blob([response], { type: typeCreated || "pdf" })
        const fileUrl = await URL.createObjectURL(file)
        if (name) {
          const now = moment().format("HHMMSS_DDMMYYYY")
          const link = document.createElement("a")
          link.download = `${name}_${now}.${type}`
          link.href = fileUrl
          link.click()
        } else {
          window.open(fileUrl, "PRINT", "width: 400px, height: 600px")
        }
        return true
      } else {
        toast.error("Error: Danh sach rong", {
          position: "top-right",
          autoClose: "3000",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined
        })
        return false
      }
    } else {
      toast.error("Error: client-fix")
      return false
    }
  } catch (error) {
    toast.error("error: server-500")
    return false

  }

}