<template>
  <div style="display: flex;align-items: center;justify-content: space-between;height: 100%">
    <div style="display: flex;align-items: center;justify-content: space-between;height: 100%">
      <div style="width: 180px">
        <span class="home_title">vue+springboot</span>
      </div>
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#2C3C4D"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">系统管理</el-menu-item>
        <el-menu-item index="2">订单管理</el-menu-item>
      </el-menu>
    </div>
    <div >
      <!--<el-badge style="margin-right: 30px">-->
      <!--<i class="fa fa-bell-o" style="cursor: pointer"></i>-->
      <!--</el-badge>-->
      <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
              {{user.name}}
              <i><img v-if="user.userface!==''" :src="user.userface"
                      style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
            </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  computed: {
    user () {
      return this.$store.state.login.user
    }
  },
  methods: {
    handleCommand (cmd) {
      var _this = this
      /* ***************** 注销 ************************/
      if (cmd === 'logout') {
        this.$confirm('注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          center: false
        }).then(() => {
          _this.getRequest('/login/logout')
          _this.$store.commit('logout')
          _this.$router.replace({path: '/'})
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消'
          })
        })
      }
    },
    handleSelect () {
      this.$store.commit('selectHeader')
      // initMenu(router, store)
    }
  }
}
</script>

<style scoped>
  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }

</style>
