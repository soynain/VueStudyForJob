import { defineStore } from "pinia";
import { ref } from "vue";

export const authStore=defineStore('authStore',()=>{
    const jwtToken=ref("");

    function setJwtToken($newJwt:string){
        jwtToken.value=$newJwt;
    }

    function getJwt(){
       return jwtToken.value;
    }

    return {jwtToken,setJwtToken,getJwt};
});