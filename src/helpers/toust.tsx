import { toast } from "react-toastify";

export const notify = (type: String, text: String) => {
  if (type === "success") {
    toast.success(text);
  } else {
    toast.error(text);
  }
};
