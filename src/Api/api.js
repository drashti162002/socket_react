import axios from "axios";
import api from './url';

// user Register
export const postuserregisterUser = (data) => {
    return axios.post(api.userRegister, data);
 }
// user Login
export const postuserlogin = (data) => {
   console.log('ghtg')
    return axios.post(api.userLogin, data);
}
// user list 
export const listLoginUserData = (id) =>{
    return axios.get(api.listData+`/${id}`)
}
//chat data 
export const userChatData = (loginUserId, id) =>{
  return axios.get(api.chatData+`?loginUserId=${loginUserId}&id=${id}`)
}
 
