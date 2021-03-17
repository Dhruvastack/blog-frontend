//So that every time no need of the token to be added

import axios from "axios";

const setAuthToken = token => {
   if (token) {
      axios.defaults.headers.common["Authorization"] = token;
   } else {
      delete axios.defaults.headers.common["Authorization"];
   }
};

export default setAuthToken;