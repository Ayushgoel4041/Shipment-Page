import axios from "axios";
import { apiConfig } from "./Config";

const apiClient = axios.create();

const getFullUrl = (baseUrl, endPoint, params) => {
  //   `${baseUrl}${endPoint.url}?${params}`;

  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    return `${baseUrl}${endPoint.url}`;
  }
  return `${baseUrl}${endPoint.url}`;
};

const apiService = {
  async request(
    baseUrlKey,
    endPointKey,
    data = null,
    params = null,
    headers = {}
  ) {
    const endPoint = apiConfig.endpoints[endPointKey];

    if (!endPoint) throw new Error(`This endPoint : ${endPoint} is not valid`); // throw error if endpoint is not matched

    const baseUrl = apiConfig.baseUrls[baseUrlKey];
    const url = getFullUrl(baseUrl, endPoint, params);

    const options = {
      method: endPoint.method,
      url,
      data,
      params,
      headers,
    };

    const response = await apiClient(options);
    return response.data;
  },
};

export default apiService;
