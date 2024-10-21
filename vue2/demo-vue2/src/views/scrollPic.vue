<template>
  <div class="scroll-container">
    <div class="scroll-pic">
      <img :src="img" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "scrollPic",
  data(){
    return {
      img:require('@/assets/images/1.jpg')
    }
  }
}
</script>


<style scoped>
.scroll-container{
  width: 500px;
  height: 800px;
  border: 1px solid #ccc;
  overflow-x: scroll;
  overflow-y: hidden;
}
</style>