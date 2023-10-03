import axios from "axios";

// const proxy = 'https://cors-anywhere-herokuapp.com/';
const proxy = 'https://cors-proxy.htmldriven.com/?url=';
const baseUrl = `https://615f-212-199-47-186.ngrok-free.app/api/v1/app-service/`;

export const get = async (url: string, params: any = {}) => {
  try {
    const res = await axios.get(`${baseUrl}${url}`, { params });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const put = async (url: string, params: any = {}) => {
  try {
    const headers = {
      'ngrok-skip-browser-warning': '69420', // Your custom header
      'Accept': 'application/json', // Added 'Accept' header
      "User-Agent": "axios 0.21.1",
    };

    const res = await axios.put(`${proxy}${baseUrl}${url}`, params, { headers });
    return res.data;
  } catch (err) {
    console.error(err);
    // You might want to throw the error here or handle it differently based on your needs
    throw err;
  }
};