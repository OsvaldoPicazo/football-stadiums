<template>
    <div id="map"></div>
</template>

<script lang="ts">
    import { defineComponent} from 'vue';
    import mapboxgl from "mapbox-gl";
    import "mapbox-gl/dist/mapbox-gl.css";
    
    export default defineComponent({
        name: 'Map',
        props: {
            stadiums: Object
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
                // console.log(JSON.parse(JSON.stringify(this.stadiums)));

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
                        'circle-radius': 7,
                        'circle-color': '#F73668'
                    }
                });

                map.on("click", "points", (e) => {
                    console.log("event", e)
                    /* 
                    const orgId = e.features[0].properties.id;
                    const orgName = e.features[0].properties.name;
                    const coordinates = e.features[0].geometry.coordinates.slice();
            
                    // Ensure that if the map is zoomed out such that
                    // multiple copies of the feature are visible, the
                    // popup appears over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    
                    map.easeTo({
                    center: e.features[0].geometry.coordinates.slice(),
                    zoom: 10,
                    });

                    // create an element with the popup content
                    const PopUpLink = document.createElement('div');
                    PopUpLink.setAttribute("id", "popup-map-button-container")
                    PopUpLink.innerHTML = `<button id="popup-map-button" style="border:none;background:none;" >${orgName}</button>`;
                    PopUpLink.addEventListener('click', (e) => {
                    props.history.push(`/orgs/${orgId}`)
                    });
                    new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setDOMContent(PopUpLink)
                    .addTo(map);
                    */
            
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