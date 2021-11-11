<template>
    <form @submit="handleSubmit" class="edit-form" >
        <div class="form-control">
            <label for="name">Stadium Name: </label>
            <!-- v-model directive to bind values to form inputs -->
            <input type="text" v-model="name" name="name" placeholder="Stadium name"> 
        </div>
        <div class="form-control">
            <label for="imageURL">Image URL: </label>
            <input type="text" v-model="imageURL" name="imageURL" placeholder="https://www.example.com/image.jpg"> 
        </div>

        <!-- input tag with submit type creates a button -->
        <input type="submit" value="Save" class="btn btn-block">
        
        <i 
            id="close-container" 
            class="fas fa-times"
            @click="$emit('close-edit-card')"
        ></i>          
    </form>
</template>

<script>
    export default {
        name: 'EditStadium',
        props: {
            stadium: Object
        },
        data() {
            return {
                name: this.stadium.name,
                imageURL: this.stadium.imageURL,
                id: this.stadium.id
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()

                // simple front-end form validation
                if(!this.name) {
                    alert('Please add a stadium name')
                    //exit function:
                    return
                }

                const editedStadium = {
                    name: this.name,
                    imageURL: this.imageURL,
                    id: this.id
                }
                
                // console.log('edited entry: ', editedStadium)
                this.$emit('edit-stadium', editedStadium)

                // clear form
                this.name = ''
                this.imageURL = ''
                this.id = ''
            }
        }
    }
</script>

<style scoped>
    .edit-form {
        text-align: center;
        padding: 30px;
        border: 1px solid darkgray;
        border-radius: 5px;
        font-size: 12px;
        margin-bottom: 30px;
        position: relative;
    }

    .form-control {
        margin: 20px 0;
    }

    .form-control label {
        display: block;
    }

    .form-control input {
        width: 100%;
        height: 40px;
        margin: 5px;
        padding: 3px 7px;
        font-size: 17px;
    }

    #close-container {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;          
    }

</style>