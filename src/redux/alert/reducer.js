import { HIDE_ALERT, SHOW_ALERT } from "./constans";

const initialState = {
   message: '',
   type: '',
   show: false
};

export default function reducer(state = initialState, action) {
   switch (action.type) {
      case SHOW_ALERT:
         return { ...action.payload, show: true };
      case HIDE_ALERT:
         return { ...state, show: false };
      default:
         return state;
   }
}