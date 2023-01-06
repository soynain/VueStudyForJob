import { defineStore } from "pinia";
import { ref } from "vue";

export const mostrarNavLinks=defineStore('navLinksState',{
    state:()=>{
        const estadoNav=ref(0);
        function incrementarEstadoNav(){
            return estadoNav.value++;
        }
    
        function setEstadoNav(valor:number){
            estadoNav.value=valor;
        }
    
        function getEstadoNavValue(){
            return estadoNav.value;
        }
    
        return {estadoNav,incrementarEstadoNav,getEstadoNavValue,setEstadoNav};
    },
    persist:{
        storage:localStorage
    }
});