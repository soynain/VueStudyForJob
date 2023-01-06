import { defineStore } from "pinia";
import { ref } from "vue";

export const savedDataAlertStore = defineStore('savedDataAlert', {
    state: () => {
        let savedDataState = ref(false);

        function setSavedDataState(value: true | false) {
            savedDataState.value = value;
        }

        function getSavedDataState() {
            return savedDataState.value;

        }
        return { setSavedDataState, getSavedDataState };
    },
    persist:{
        storage:sessionStorage
    }
});


