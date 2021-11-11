<template>
    <Map :stadiums="stadiums" :key="stadiums" @add-stadium="addStadium" />
    <Stadiums :stadiums="stadiums" />
</template>

<script>
    // import { defineComponent } from 'vue';
    import axios from "axios";
    import Map from '../components/Map.vue'
    import Stadiums from '../components/Stadiums.vue'

    export default {
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
            },
            async addStadium(coordinates) {
                // console.log(" adding a new stadium: ", coordinates)
                try {
                    const res = await axios.post('http://localhost:5000/stadiums', 
                        {
                            "geometry": {
                                "type": "Point",
                                "coordinates": [
                                    coordinates.lng,
                                    coordinates.lat
                                ]
                            },
                            "name": "New entry",
                            "imageURL": ""
                        }
                    )

                    // console.log("new entry added: ", res.data)
                    // add new entry to stadiums array
                    this.stadiums = [...this.stadiums, res.data]
                    // this.stadiums.push(res.data)
                }
                catch(error) {
                    console.log("error while adding a new stadium entry: ", error)
                }
            }
        },
        // fetch data everytime the component is created/page reloaded
        created() {
            this.fetchStadiums()
        }
    };
</script>