<script setup lang="ts">
const props=defineProps({
    nombretxt:String,
    descripcionTxt:String,
    preciotxt:String,
    fabricantetxt:String
});

const emit=defineEmits<{
    (e:"update:nombretxt",value:String):void,
    (e:"updateData"):void,
    (e:"update:descripcionTxt",value:String):void,
    (e:"update:preciotxt",value:String):void,
    (e:"update:fabricantetxt",value:String):void
}>();

</script>
<template>
    <section class="w-75">
            <div class="mb-3">
                <label for="" class="form-label">Nombre del producto</label>
                <input required pattern="[a-zA-Z0-9 ]*"
                    @input="$emit('update:nombretxt',($event.target as HTMLInputElement).value)"               
                    type="text" class="form-control"
                >
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Descripción del producto</label>
                <textarea required pattern="[a-zA-Z0-9 ]*"
                    @input="$emit('update:descripcionTxt',($event.target as HTMLInputElement).value)" 
                     class="form-control">
                </textarea>
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Precio del producto</label>
                <input required pattern="[0-9][.][0-9]{2}"
                    @input="$emit('update:preciotxt',($event.target as HTMLInputElement).value)" 
                    type="text" class="form-control"
                >
            </div>
            <div class="mb-3">
                <label for="" class="form-label">Fabricante</label>
                <input required
                    @input="$emit('update:fabricantetxt',($event.target as HTMLInputElement).value)" 
                    type="text" class="form-control"
                >
            </div>
            <button @click="$emit('updateData')" class="btn btn-primary">Actualizar datos de producto</button>
        </section>
</template>