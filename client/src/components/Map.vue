<template>
    <div id="map"></div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import mapboxgl from "mapbox-gl";
    import "mapbox-gl/dist/mapbox-gl.css";
    
    export default defineComponent({
        name: 'Map',

        // render map once the component is mounted
        mounted() {
            mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN || "pk.eyJ1Ijoib3N2YWxkb3BpY2F6byIsImEiOiJja3Z0dGoyNjFiZzRnMzBzN25rcXN3eDUzIn0.XIsWzk7ztZ382tFhzkFf7Q"
            const map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-35, 30],
                zoom: 1,
            });

            // add navigation controls
            map.addControl(new mapboxgl.NavigationControl());

            // add map layers once the map is loaded
            map.on('load', () => {
                // TODO: Here we want to load a layer
                // TODO: Here we want to load/setup the popup
            });    
        }
    });
</script>

<style scoped>
    /* width, height and padding attributes are required to display the map */
    #map {
        width:100%;
        height: 0;
        padding: 0 0 56% 0;
        margin-bottom: 30px;
        border-radius: 5px;
    }
</style>