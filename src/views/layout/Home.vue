<template>
  <div>
    <el-container class="home-container">

      <el-header class="home-header">
        <header-bar></header-bar>
      </el-header>

      <el-container>
          <side-bar></side-bar>
          <el-main>
            <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
            <!--<breadcrumb class="breadcrumb-container"/>-->

            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 3px">
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
  </div>
</template>

<script>
import TagsView from '../component/TagsView'
import HeaderBar from './HeaderBar'
import SideBar from './SideBar'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    TagsView,
    HeaderBar,
    SideBar,
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user',
      'activeIndex'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    }
  }
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
    /*background-color: #2C3C4D;*/
    color: #333;
    padding: 0px;
  }
  .breadcrumb-container{
    float: left;
  }
  .hamburger-container {
    float: left;
    padding: 0 10px;
  }
  .el-main {
    padding: 10px;
  }
</style>
