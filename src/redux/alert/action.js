import { HIDE_ALERT, SHOW_ALERT } from "./constans";

export const showAlert = (message, type) => ({
   type: SHOW_ALERT,
   payload: { message, type }
});

export const hideAlert = () => ({ type: HIDE_ALERT });