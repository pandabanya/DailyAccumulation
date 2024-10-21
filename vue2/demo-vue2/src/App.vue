<template>
  <div id="app">
    <div class="teleport-title">传送门</div>
    <div class="teleport-list">
      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content ">
          <router-link to="demoBanner">swiper banner</router-link>
        </div></el-col>
        <el-col :span="6"><div class="grid-content ">

        </div></el-col>
        <el-col :span="6"><div class="grid-content ">222</div></el-col>
        <el-col :span="6"><div class="grid-content ">333</div></el-col>
      </el-row>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  },
};
</script>

<style>
#app {
  overflow: hidden;
}
</style>
