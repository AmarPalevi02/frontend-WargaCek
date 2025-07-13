import Cookies from "js-cookie";
import {
   USER_LOGIN,
   USER_LOGOUT
} from "./constans";


let initialState = Cookies.get('auth')
   ? JSON.parse(Cookies.get('auth'))
   : { token: null, username: null, email: null, role: null }


export default function reducer(state = initialState, action) {
   switch (action) {
      case USER_LOGIN:
         return {
            token: action.token,
            username: action.username,
            email: action.email,
            role: action.role
         }
      case USER_LOGOUT:
         return { token: null, username: null, email: null, role: null }
      default:
         return state
   }
}