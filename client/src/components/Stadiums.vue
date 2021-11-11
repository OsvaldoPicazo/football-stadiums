<template>
    <!-- Map stadiums array  -->
    <div class="stadiums">
        <div 
            class="stadium"
            v-for="stadium in stadiums"
            v-bind:key="stadium.id"
        >
            {{ stadium.name }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Stadiums',
    props: {
        stadiums: Array
    }
})
</script>

<style scoped>
    .stadiums {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        margin-bottom: 30px;
        border-radius: 5px;
    }

    .stadium {
        background: lightblue;
        padding: 1rem;
        border: 1px solid darkgray;
        border-radius: 5px;
        text-align: center;
        position: relative;
        font-size: 14px;
    }

    /* media queries to change the number of columns */
    @media (max-width: 1000px) {
        .stadiums {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 640px) {
        .stadiums {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    
    @media (max-width: 400px) {
        .stadiums {
            grid-template-columns: 1fr;
        }
    }    

</style>
