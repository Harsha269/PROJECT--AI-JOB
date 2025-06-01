
import{jwtDecode} from "jwt-decode"
const key = "access_token" ;
export const cookie = {
    set:(token)=>{
        const decoded = jwtDecode(token);
        const expire = new Date(decoded.exp * 1000).toUTCString();
        // document.cookie = `${key} = ${token}; expires=${expire};`;
        document.cookie = `${key}=${token}; expires=${expire};`;
 },

 get:()=>{
    const cookies = document.cookie
    const cookieList = cookies.split(";")
    for(let cookie of cookieList){
        const [field , value]= cookie.split("=");
        if(field.trim()===key){
            return value
        }
    }
    return null
 },
 remove :()=>{
    document.cookie = `${key}=;`
 }


}