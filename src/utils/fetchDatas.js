import axios from "axios";
import { configs } from "../configs/config";
import Cookies from "js-cookie";
import handleError from "./handeleError";

export const postData = async (payload, formData, resource) => {
   try {
      const { token } = Cookies.get('auth')
         ? JSON.parse(Cookies.get('auth'))
         : {};

      const response = await axios.post(
         `${configs.base_url_dev}${configs.version}/${resource}`,
         payload,
         {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': formData ? 'multipart/form-data' : 'application/json',
            }
         }
      );

      return response;
   } catch (error) {
      return handleError(error)
   }
};