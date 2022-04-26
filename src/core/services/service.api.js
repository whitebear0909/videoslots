import axios from "axios"

/** 
 * @description send the GET HTTP request
 * @param param: request param object
 * @returns Promise
*/
export const getImages = (params) => {
    return axios.get(`${process.env.VUE_APP_API_URL}/v2/list?page=${params.page}&limit=${params.limit}`);
}