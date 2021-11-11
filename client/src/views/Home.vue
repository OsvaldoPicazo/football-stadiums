<template>
    <Map 
        :stadiums="stadiums" 
        :key="stadiums" 
        @add-stadium="addStadium" 
    />

    <StadiumCard 
        v-if="openStadiumCard"
        :stadium='stadium'
        @close-stadium-card="closeStadium"
    />

    <Stadiums 
        :stadiums="stadiums" 
        @delete-stadium="deleteStadium"
        @open-stadium="openStadium"
    />
</template>

<script>
    // import { defineComponent } from 'vue';
    import axios from "axios";
    import Map from '../components/Map.vue'
    import Stadiums from '../components/Stadiums.vue'
    import StadiumCard from '../components/StadiumCard.vue'

    export default {
        name: 'Home',
        components: {
            Map,
            Stadiums,
            StadiumCard
        },
        data() {
            return {
                // array to render
                stadiums: [],
                openStadiumCard: false,
                stadium: {}
            }
        },
        methods: {
            openStadium(stadium) {
                this.openStadiumCard = true
                this.stadium = stadium
            },
            closeStadium() {
                this.openStadiumCard = false
            },
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
            },
            async deleteStadium(id) {
                try {
                    await axios.delete(`http://localhost:5000/stadiums/${id}`)

                    this.stadiums = this.stadiums.filter( stadium => stadium.id !== id)
                }
                catch(error) {
                    console.log("error while deleting entry: ", error)
                }
            }
            
        },
        // fetch data everytime the component is created/page reloaded
        created() {
            this.fetchStadiums()
        }
    };
</script>