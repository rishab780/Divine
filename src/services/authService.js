import http from './httpService'
import jwtDecode from "jwt-decode";
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl+"/users/auth"
http.setJwt(getJwtToken());
export async function login(email, password){
    
     const {data: jwt1} =  await http.post(apiEndpoint, {email,password});   
     
     localStorage.setItem('token',jwt1);
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