<template>
    <div class="message">
        <div class="username">{{ username }}</div>
        <div class="text"><br>{{ text }}</div>
        <div class="hora">{{ hora }}</div>
    </div>
</template>
  
<script>
/* eslint-disable */

export default {
    name: 'MyMessageComponent',
    props: {
        text: String,
        hora: String,
        username: String
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message {
    color: white;
    background-color: rgb(16, 54, 16);
    padding: 10px 15px;
    border-radius: 10px;
    min-width: 10%;
    max-width: 60%;
    position: relative;
}

.text {
    padding-bottom: 10px;
}

.hora {
    font-size: .7rem;
    margin-left: 10px;
    position: absolute;
    bottom: 5px;
    right: 5px;
}

.username {
    font-size: .8rem;
    color: rgb(201, 201, 201);
    position: absolute;
    top: 5px;
    left: 5px;
}
</style>
  