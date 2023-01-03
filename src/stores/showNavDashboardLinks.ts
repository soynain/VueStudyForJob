import { defineStore } from "pinia";
import { ref } from "vue";

export const mostrarNavLinks=defineStore('navLinksState',()=>{
    const estadoNav=ref(0);
    function incrementarEstadoNav(){
        return estadoNav.value++;
    }

    function getEstadoNavValue(){
        return estadoNav.value;
    }

    return {estadoNav,incrementarEstadoNav,getEstadoNavValue};
});