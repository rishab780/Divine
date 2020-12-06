import http from './httpService'
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl+"/favorites"
export function getFavourites(){
    return http.get(apiEndpoint);
}
export function makeFavourite(postId){
    return http.post(apiEndpoint+'/'+postId);
}