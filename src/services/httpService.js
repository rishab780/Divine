import axios from "axios";
import { toast } from "react-toastify";
// import { getJwtToken } from "./authService";


//axios.defaults.headers.common['x-auth-token'] = getJwtToken();

axios.interceptors.response.use(null, error => {
  
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;


  if (!expectedError) {
    
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
