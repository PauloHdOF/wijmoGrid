<template>
  <v-snackbar v-model="show" :color="type" :timeout="3000" top class="text-center"> {{msg}} </v-snackbar>
</template>

<script>
export default {
    name: "Snackbar",
    data(){
        return {
            show: false,
            msg: "",
            type: ""
        }
    },
    methods: {
        success(msg){
            this.type = 'success'
            this.msg = msg
            this.show = true
        },

        error(msg){
            this.type = 'error'
            this.msg = msg
            this.show = true
        },

        alert(msg){
            this.type = 'deep-orange'
            this.msg = msg
            this.show = true
        }
    }
}
</script>