import {
   START_FETCHING_JENISKERUSAKAN,
   SUCCESS_FETCHING_JENISKERUSAKAN,
   ERROR_FETCHING_JENISKERUSAKAN
} from './constans'

export const startFetchingJenisKerusakan = () => {
   return { type: START_FETCHING_JENISKERUSAKAN }
}

export const errorFetchingJenisKerusakan = () => {
   return { type: ERROR_FETCHING_JENISKERUSAKAN }
}

export const succesFetchingJenisKejadian = () => {
   return async (dispatch) => {
      dispatch(startFetchingJenisKerusakan())

      try {
         // const response 
      } catch (error) {
         dispatch(errorFetchingJenisKerusakan())
      }
   }
}