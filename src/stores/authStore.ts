import { defineStore } from "pinia";
import { ref } from "vue";

export const authStore = defineStore('authStore', {
    state: () => {

        const jwtToken = ref<string>("");

        function setJwtToken($newJwt: string) {
            jwtToken.value = $newJwt;
        }

        function getJwt() {
            return jwtToken.value;
        }

        return { jwtToken, setJwtToken, getJwt };

    },
    persist:{
        storage:localStorage
    }
});