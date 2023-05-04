<template>
    
        <div class="message">
            <p class="name-user">{{ text }}</p>
            <span class="hora">{{ hora }}</span>
        </div>
</template>
  
<script>
/* eslint-disable */

export default {
    name: 'MyMessageComponent',
    props: {
        text: String,
        hora: String
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.message {
    color: white;
    background-color: rgb(19, 125, 19);
    padding: 10px 15px;
    border-radius: 10px;
    display: flex;
    align-items: end;
    max-width: 60%;
}
.hora {
    font-size: .7rem;
    margin-left: 10px;
}
</style>
  