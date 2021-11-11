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

    <EditStadium 
        v-if="openEditCard"
        :stadium='stadium'
        @close-edit-card="closeEditStadium"
        @edit-stadium="editStadium"
    />

    <Stadiums 
        :stadiums="stadiums" 
        @delete-stadium="deleteStadium"
        @open-stadium="openStadium"
        @open-edit-stadium="openEditStadium"
    />
</template>

<script>
    // import { defineComponent } from 'vue';
    import axios from "axios";
    import Map from '../components/Map.vue'
    import Stadiums from '../components/Stadiums.vue'
    import StadiumCard from '../components/StadiumCard.vue'
    import EditStadium from '../components/EditStadium.vue'

    export default {
        name: 'Home',
        components: {
            Map,
            Stadiums,
            StadiumCard,
            EditStadium
        },
        data() {
            return {
                // array to render
                stadiums: [],
                openStadiumCard: false,
                openEditCard: false,
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
            openEditStadium(stadium) {
                this.openEditCard = true
                this.stadium = stadium
            },
            closeEditStadium() {
                this.openEditCard = false
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
            },
            async editStadium(editedStadium) {
                // close edit card
                this.openEditCard = false
                try {
                    // fetch entry to update
                    const res = await axios.get(`http://localhost:5000/stadiums/${editedStadium.id}`)
    
                    // console.log('fetched stadium: ', res.data)
                    const stadiumToUpdate = res.data

                    const updatedStadium = {...stadiumToUpdate, name: editedStadium.name, imageURL: editedStadium.imageURL}

                    // update entry
                    const result = await axios.put(`http://localhost:5000/stadiums/${updatedStadium.id}`,
                    updatedStadium);

                    // console.log("updated succesfully: ", result.data)
                }
                catch(error) {
                    console.log("error while editing the entry: ", error)
                }
            }
            
        },
        // fetch data everytime the component is created/page reloaded
        created() {
            this.fetchStadiums()
        }
    };
</script>