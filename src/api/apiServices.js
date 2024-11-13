import axios from "axios";
import {apiConfig} from "./Config";

const apiClient = axios.create();

const getFullUrl = (baseUrl , endPoint)=> `${baseUrl}${endPoint.url}`

const apiService = {
    async request(baseUrlKey , endPointKey , data = null ){
     const endPoint  =  apiConfig.endpoints[endPointKey]

     if (!endPoint) throw new Error(`This endPoint : ${endPoint} is not valid`); // throw error if endpoint is not matched

     const baseUrl = apiConfig.baseUrls[baseUrlKey]
     const url = getFullUrl(baseUrl,endPoint)

     const options ={
        method : endPoint.method, 
        url , data 
     }
     
     const response = await apiClient(options)
     return response.data
    }
}

export default apiService