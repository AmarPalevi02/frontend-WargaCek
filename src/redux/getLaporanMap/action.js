import { getDatas } from "../../utils/fetchDatas";
import {
  FETCH_LAPORAN_FAILURE,
  FETCH_LAPORAN_REQUEST,
  FETCH_LAPORAN_SUCCESS,
  RESET_FETCH_LAPORAN,
} from "./constans";

import { radiusCOnfigs } from "../../configs/constans";

export const fetchLaporan =
  ({ userLat, userLng, radius } = {}) =>
  async (dispatch) => {
    dispatch({ type: FETCH_LAPORAN_REQUEST });
    try {
      const query =
        userLat && userLng
          ? `?userLat=${userLat}&userLng=${userLng}&radius=${radius || radiusCOnfigs.DEFAULT_RADIUS}`
          : "";
      const response = await getDatas(`laporan${query}`);
      dispatch({
        type: FETCH_LAPORAN_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_LAPORAN_FAILURE,
        payload: error.message,
      });
    }
  };

export const resetFetchLaporan = () => ({
  type: RESET_FETCH_LAPORAN,
});
