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
     http.post(apiEndpoint,post).then(res => { // then print response status
        console.log(res.statusText)
     });
}
export function updatePost(post){
    return http.put(apiEndpoint+'/'+post._id,post);
}