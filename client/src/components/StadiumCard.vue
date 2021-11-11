<template>
    <div class="stadium-container">
        <img class="stadium-image" :src="stadium.imageURL" alt="Stadium Image">
        <h3> {{ stadium.name }} </h3>
        <i 
            id="close-container" 
            class="fas fa-times"
            @click="$emit('close-stadium-card')"
        ></i>        
    </div>
</template>

<script>
export default {
    name: 'StadiumCard',
    props: {
        stadium: Object
    }
}
</script>

<style scoped>
    .stadium-container {
        text-align: center;
        padding: 30px;
        border: 1px solid darkgray;
        border-radius: 5px;
        font-size: 12px;
        margin-bottom: 30px;
        position: relative;
    }

    .stadium-image {
        width:100%;
        max-width: 800px;
        margin-bottom: 15px;
    }

    #close-container {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;          
    }
</style>