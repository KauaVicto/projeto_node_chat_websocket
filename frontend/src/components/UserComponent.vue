<template>
    <div class="user">
        <img class="foto" src="../assets/logo.png"> <p class="name-user">{{ username }}</p>
    </div>
</template>
  
<script>
/* eslint-disable */

export default {
    name: 'UserComponent',
    props: {
        username: String
    }
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    transition: .2s all ease-in-out;
    border: 1px solid #868686;
}
.user:hover {
    background-color: #c1c1c1;
}
.foto {
    border-radius: 50%;
    border: 1px solid black;
    height: 30px;
}
.name-user {
    flex: 1;
    padding: 10px;
}
</style>
  