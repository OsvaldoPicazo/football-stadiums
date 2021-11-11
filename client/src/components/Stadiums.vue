<template>
    <!-- Map stadiums array  -->
    <div class="stadiums">
        <div 
            class="stadium"
            v-for="stadium in stadiums"
            v-bind:key="stadium.id"
            @dblclick="onOpen(stadium)"
        >
            {{ stadium.name }}
            <i 
                id="delete-stadium" 
                class="fas fa-times"
                @click="onDelete(stadium.id)"
            ></i>
            <i 
                id="edit-stadium" 
                class="fas fa-edit"
                @click="onEdit(stadium)"
            ></i>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Stadiums',
    props: {
        stadiums: Array
    },
    methods: {
        onDelete(id) {
            // emit custom event upstream 
            this.$emit('delete-stadium', id)
        },
        onEdit(stadium) {
            this.$emit('open-edit-stadium', stadium)
        },
        onOpen(stadium) {
            this.$emit('open-stadium', stadium)
        }
    }
}
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
        display: flex;
        justify-content: space-between;
        cursor: pointer;
    }

    #delete-stadium {
        position: absolute;
        bottom: 5px;
        right: 5px;
        cursor: pointer;        
    }

    #edit-stadium {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;        
    }    

    /* media queries to change the number of columns */
    @media (max-width: 1000px) {
        .stadiums {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 700px) {
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
