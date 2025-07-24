import {
   USER_LOGIN,
   USER_LOGOUT
} from "./constans";
import Cookies from "js-cookie";

export const userLogin = (token, username, email, role) => {
   return {
      type: USER_LOGIN,
      token,
      username,
      email,
      role
   }
}

export const userLogout = () => {
   Cookies.remove("auth")

   return {
      type: USER_LOGOUT
   }
}