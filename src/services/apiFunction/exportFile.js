// import toast, { Toaster } from "react-hot-toast";
import { toast } from "react-toastify"
import moment from "moment";
// import { get, post } from "./api_helper";
import httpServices from "../httpServices"

// export enum Type {
//   docx = "docx",
//   doc = "doc",
//   pdf = "pdf",
//   xlsx = "xlsx",
//   csv = "csv",
// }

interface Props {
  url: string;
  type?: "docx" | "doc" | "pdf" | "xlsx" | "csv";
  body?: any;
  name?: string;
  message?: any;
  method?: "GET" | "POST";
}

const createType = (type) => {
  switch (type) {
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessing";
    case "doc":
      return "application/msword";
    case "xlsx":
      return "application/vnd.ms-excel";
    case "csv":
      return "text/csv";
    default:
      return "application/pdf";
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (props: Props) => {
  const { url, body, type, name, message, method } = props;
  const typeCreated = createType(type);

  try {
    const response =
      method === "GET"
        ? await httpServices.get(url, "", { responseType: "arraybuffer" })
        : await httpServices.post(url, body || null, {
          responseType: "arraybuffer",
          "Content-type": "application/vnd.ms-excel"
        });

    if (response) {
      if (response?.status === 200) {
        const file = new Blob([response.data], {
          type: typeCreated || "pdf",
        });
        // Build a URL from the file
        const fileURL = await URL.createObjectURL(file);
        if (name && type !== "pdf") {
          const now = moment().format("HHmmss_DDMMYYYY");
          const link = document.createElement("a");
          link.download = `${name}_${now}.${type}`;
          link.href = fileURL;
          link.click();
        } else {
          // Open the URL on new Window
          window.open(fileURL, "PRINT", "width: 400px, height: 600px");
        }
        return true;
      } else {
        toast.error(message ? message : "Danh sách rỗng");
        return false;
      }
    } else {
      // toast({ toastOptions: { type: "error" } });
      toast.error(message ? message : "Danh sách rỗng");
      return false;
    }
  } catch (error) {
    // toast({ toastOptions: { type: "error" } });
    toast.error(message ? message : "Sự cố");
    return false;
  }
};
