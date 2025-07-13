import store from "./store";
import Cookies from "js-cookie";

let currentAuth;

function listener() {
   let previousAuth = currentAuth

   currentAuth = store.getState().auth;

   if (currentAuth !== previousAuth) {
      // Cookies.set("token", currentAuth.token || "", { expires: 7 / 24 });
      // Cookies.set("username", currentAuth.username || "", { expires: 7 / 24 });
      // Cookies.set("email", currentAuth.email || "", { expires: 7 / 24 });
      // Cookies.set("role", currentAuth.role || "", { expires: 7 / 24 });

      Cookies.set("token", currentAuth.token || "", { expires: 2 / 1440 });
      Cookies.set("username", currentAuth.username || "", { expires: 2 / 1440 });
      Cookies.set("email", currentAuth.email || "", { expires: 2 / 1440 });
      Cookies.set("role", currentAuth.role || "", { expires: 2 / 1440 });

   } else {
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("email");
      Cookies.remove("role");
   }
}

function listen() {
   store.subscribe(listener)
}

export { listen }