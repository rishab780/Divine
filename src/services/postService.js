import http from './httpService'
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl+"/posts"
export function getPosts(){
    return http.get(apiEndpoint);
}
export function deletePosts(postId){
   return http.delete(apiEndpoint+'/'+postId);
}
export function getPost(id){
    return http.get(apiEndpoint+"/"+id);
}
export function savePost(post){
    console.log(post)
    return http.post(apiEndpoint,post);
}
export function updatePost(post){
    return http.put(apiEndpoint+'/'+post._id,post);
}