import http from './httpService'
import {apiUrl} from '../config.json';
  export function getCuisines() {
       return http.get(apiUrl+"/cuisines");
  }