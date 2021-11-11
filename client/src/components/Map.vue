<template>
    <div id="map"></div>
</template>

<script lang="ts">
    import { defineComponent, nextTick, createApp } from 'vue';
    import mapboxgl from "mapbox-gl";
    import "mapbox-gl/dist/mapbox-gl.css";
    import Popup from './Popup.vue'
    
    export default defineComponent({
        name: 'Map',
        props: {
            stadiums: Array
        },
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

            // add markers and popups ince the map is loaded
            map.on('load', () => {
                console.log("geojson: ", JSON.parse(JSON.stringify(this.stadiums)));

                // add data source
                map.addSource('stadiums', {
                    'type': 'geojson',
                    'data': { 
                      'type' : 'FeatureCollection',
                      'features' : JSON.parse(JSON.stringify(this.stadiums))}
                });                

                // markers
                map.addLayer({
                    'id': 'points',
                    'type': 'circle',
                    'source': 'stadiums',
                    'paint': {
                        'circle-radius': 10,
                        'circle-color': '#F73668'
                    }
                });


                map.on("click", "points", (e) => {
                    console.log("marker clicked", e)

                    // set flag to stop any actions when a normal click occurs
                    e.clickOnLayer = true;

                    // const coordinates = e.features[0].geometry.coordinates.slice();
                    
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML('<div id="popup-content"></div>')
                        .addTo(map);
                    
                    nextTick(() => {
                        createApp(Popup).mount("#popup-content");
                    });
                   
                   });                

                   // add new entry when clicking on the map if the point is not yet a marker
                   map.on('click', (e) => {
                       if (e.clickOnLayer) {
                           return;
                       }
                    //    console.log(`A click event has occurred at: `, e);
                       const coordinates = e.lngLat
                       this.$emit('add-stadium', coordinates)
                   });     
                   
                   // Change the cursor to a pointer when the mouse is over the places layer.
                    map.on('mouseenter', 'points', () => {
                    map.getCanvas().style.cursor = 'pointer';
                    });

                    // Change it back to a pointer when it leaves.
                    map.on('mouseleave', 'points', () => {
                    map.getCanvas().style.cursor = '';
                    });
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