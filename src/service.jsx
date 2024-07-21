import axios from "axios";

export const CommonService = (url, type, payload) => {
  console.log(url, type)
  return axios({
    url: `http://localhost:3000/${url}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: payload,
    method: type,
  });
};
