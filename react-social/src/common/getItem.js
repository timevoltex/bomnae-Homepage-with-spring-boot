import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

export default async function getItem(format, subject) {
  if (subject === undefined) {
    console.log(format);
    const response = await axios.get(
      API_BASE_URL + `/api/v1/artwork/format/${format}`,
      {
        headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
      }
    );
    const data = response.data;
    return data;
  } else {
    const response = await axios.get(
      API_BASE_URL + `/api/v1/artwork/format/${format}-${subject}`,
      {
        headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
      }
    );
    const data = response.data;
    return data;
  }
}
