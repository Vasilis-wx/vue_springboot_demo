<template>
  <div class='siderBarClass'>
    <el-menu class="el-menu-vertical-demo"  :collapse="isCollapse" mode="vertical"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router
             :default-active="$route.path">

      <side-bar-item v-for="(route,index) of this.routes" :key="index" :item="route" :base-path="route.path"/>

      <!-- <template v-for="(item,index) in this.routes" v-if="!item.hidden">
        <el-submenu :key="index" :index="index+''">
          <template slot="title">
            <i :class="item.iconCls" style="color: #20a0ff;width: 20px;"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">{{child.name}}
          </el-menu-item>
        </el-submenu>
      </template> -->
    </el-menu>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SideBarItem from './SideBarItem'

export default {
  name: 'SideBar',
  components: {
    SideBarItem
  },
  mounted () {
    // console.info(this.routes)
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'routes'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    height: 100%;
  }

  .el-submenu .el-menu-item {
    min-width: 180px;
  }

  .siderBarClass {
    display: flex;
    justify-content: flex-start;
    text-align: left;
  }
</style>
<style>
  .siderBarClass .el-menu--collapse {
    width: 50px;
  }
</style>
