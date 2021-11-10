<template>
    <footer class="footer-container">
        <router-link to="/About">About</router-link>
        <div>
            <b>Made by: </b>
            <a href="https://github.com/OsvaldoPicazo">Osvaldo Picazo</a>
        </div>
    </footer>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'Footer'

    });
</script>

<style scoped>
    .footer-container {
        display: flex;
        justify-content: space-between;
        background-color: rgb(34, 24, 59, 0.4);
        padding: 30px;
        border-radius: 5px;
        font-size: 12px;
    }

    .footer-container a {
        text-decoration: none;
    }

</style>