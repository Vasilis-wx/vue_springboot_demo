<template>
  <div style="display: flex;justify-content: flex-start;width: 180px;text-align: left;">
    <el-menu
      style="width: 180px;"
      unique-opened
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :default-active="$route.path"
    >
      <template v-for="(item,index) in this.routes" v-if="!item.hidden">
        <el-submenu :key="index" :index="index+''">
          <template slot="title">
            <i :class="item.iconCls" style="color: #20a0ff;width: 14px;"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item width="180px"
                        v-for="child in item.children"
                        :index="child.path"
                        :key="child.path">{{child.name}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  computed: {
    routes () {
      return this.$store.state.login.routes
    }
  }
}
</script>

<style scoped>
  .el-submenu .el-menu-item {
    width: 175px;
    min-width: 170px;
  }
</style>
