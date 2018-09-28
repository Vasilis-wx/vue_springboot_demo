<template>
  <div>
    <el-container class="home-container">

      <el-header class="home-header">
        <header-bar></header-bar>
      </el-header>

      <el-container>
        <el-aside width="180px" class="home-aside">
          <side-bar></side-bar>
        </el-aside>
        <el-container>
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
            <tags-view />
            <keep-alive>
              <router-view v-if="this.$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
          </el-main>
        </el-container>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import TagsView from '../component/TagsView'
import HeaderBar from './HeaderBar'
import SideBar from './SideBar'

export default {
  name: 'Home',
  components: {
    TagsView,
    HeaderBar,
    SideBar
  },
  methods: {}
}
</script>

<style scoped>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .home-header {
    background-color: #2C3C4D;
    color: #333;
    padding: 0px;
  }
  .home-aside {
    background-color: #545c64;
  }

</style>
