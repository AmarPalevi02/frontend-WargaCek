import {
   FETCH_LAPORAN_FAILURE,
   FETCH_LAPORAN_REQUEST,
   FETCH_LAPORAN_SUCCESS,
   RESET_FETCH_LAPORAN
} from "./constans";

const initialState = {
   data: [],
   loading: false,
   error: null,
};

const laporanReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_LAPORAN_REQUEST:
         return {
            ...state,
            loading: true,
            error: null
         };
         
      case FETCH_LAPORAN_SUCCESS:
         return {
            ...state,
            loading: false,
            data: action.payload,
            error: null
         };

      case FETCH_LAPORAN_FAILURE:
         return {
            ...state,
            loading: false,
            error: action.payload
         };
      case RESET_FETCH_LAPORAN:
         return initialState;
      default:
         return state;
   }
};

export default laporanReducer;