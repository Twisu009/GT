import axios, { AxiosResponse } from "axios";
import { getToken } from "./local-storage";

async function makeRequest<T>(method: string, path: string, data: any = null) {
  try {
    let token = getToken();
    const response: AxiosResponse<T> = await axios({
      method: method,
      url: path,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function getRequest<T>(url: string) {
  return await makeRequest<T>("GET", url);
}

async function postRequest<T>(url: string, postData: any) {
  return await makeRequest<T>("POST", url, postData);
}

async function patchRequest<T>(url: string, patchData: any) {
  return await makeRequest<T>("PATCH", url, patchData);
}

export { getRequest, postRequest, patchRequest };
