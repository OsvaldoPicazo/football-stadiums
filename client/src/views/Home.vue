<template>
    <Map :stadiums="stadiums" />
    <Stadiums :stadiums="stadiums" />
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import axios from "axios";
    import Map from '../components/Map.vue'
    import Stadiums from '../components/Stadiums.vue'

    export default defineComponent({
        name: 'Home',
        components: {
            Map,
            Stadiums
        },
        data() {
            return {
                // array to render
                stadiums: []
            }
        },
        methods: {
            // fetch data from api
            async fetchStadiums() {
                try {
                    const res = await axios.get('http://localhost:5000/stadiums')
                    this.stadiums = res.data
                }
                catch(error) {
                    console.log("Error while fetching stadiums data: ", error)
                }
            }
        },
        // fetch data everytime the component is created/page reloaded
        created() {
            this.fetchStadiums()
        }
    });
</script>