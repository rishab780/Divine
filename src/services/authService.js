import http from './httpService'
import jwtDecode from "jwt-decode";
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl+"/users/auth"
http.setJwt(getJwtToken());
export async function login(email, password){
    
     const {data: jwt} =  await http.post(apiEndpoint, {email,password});
     
     loginWithJwt(jwt);
}
export function loginWithJwt(jwt){
    localStorage.setItem('token',jwt);
}
export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem("token");
        return jwtDecode(jwt);
       
      } catch (error) {
          return null;
      }
}
export function getJwtToken(){
    return localStorage.getItem("token");
}
export function logout(){
    localStorage.removeItem('token');
}