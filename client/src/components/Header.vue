<template>
    <header>
        <h1> {{title}} </h1>
        <div class="instructions">
            <p>- Click on the map to add a new entry</p>
            <p>- Double click on the stadium box to display a picture</p>
            <p>- Edit and/or delete markers by clicking on the icons</p>
        </div>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'Header',
        props: {
            title: String,
        }

    });
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }

    .instructions {
        font-size: 12px;
    }
</style>