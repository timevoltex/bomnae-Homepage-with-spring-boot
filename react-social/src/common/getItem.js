import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

export async function getItem(format, subject) {
  if (format === "정기전") {
    const response = await axios.get(
      API_BASE_URL + `/api/v1/artwork/format/정기전`,
      {
        headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
      }
    );
    const data = response.data;
    return data;
  } else if (format === "졸업전") {
    const response = await axios.get(
      API_BASE_URL + `/api/v1/artwork/format/졸업전`,
      {
        headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
      }
    );
    const data = response.data;
    return data;
  } else if (subject === "자유") {
    const response = await axios.get(
      API_BASE_URL + `/api/v1/artwork/format/신인전-자유`,
      {
        headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
      }
    );
    const data = response.data;
    return data;
  } else {
    try {
      if (subject === "전체") {
        const response = await axios.get(
          API_BASE_URL + `/api/v1/artwork/format/신인전-주제`,
          {
            headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
          }
        );
        const data = response.data;
        return data;
      } else {
        const response = await axios.get(
          API_BASE_URL + `/api/v1/artwork/format/신인전-주제-${subject}`,
          {
            headers: { Authorization: localStorage.getItem(ACCESS_TOKEN) },
          }
        );
        const data = response.data;
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export const getFreeItem = async () => {
  try {
    getItem("신인전-자유").then((response) => {
      const data = response;
      return data;
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSubjectItem = async (subject) => {
  try {
    if (subject === null || subject === "전체") {
      getItem("신인전-주제").then((response) => {
        const data = response;
        return data;
      });
    } else {
      getItem("신인전-주제", subject).then((response) => {
        const data = response;
        return data;
      });
    }
  } catch (err) {
    console.log(err);
  }
};
