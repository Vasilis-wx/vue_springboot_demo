<template>
  <div style="display: flex;align-items: center;justify-content: space-between;height: 100%;" >
    <div style="display: flex;align-items: center;justify-content: space-between;height: 100%">
      <div style="width: 180px">
        <span class="home_title">vue+springboot</span>
      </div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#2C3C4D"
        text-color="#fff"
        active-text-color="#ffd04b">

        <!--头部menu-->
        <template v-for="(item,index) in headMenu">
          <el-menu-item :index="item.index+''" :key="index"> {{generateTitle(item.title)}}</el-menu-item>
        </template>

      </el-menu>
    </div>
    <div >
      <!--语言选择-->
      <lang-select class="international right-menu-item"/>

      <!--用户管理-->
      <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
              {{user.name}}
              <i><img v-if="user.userface!==''" :src="user.userface"
                      style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
            </span>
        <!--下拉菜单-->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{ $t('dropDownMenu.personal') }}</el-dropdown-item>
          <el-dropdown-item>{{ $t('dropDownMenu.setting') }}</el-dropdown-item>
          <el-dropdown-item command="logout" divided>{{ $t('dropDownMenu.sign_out') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { generateTitle } from '@/utils/i18n'
import LangSelect from '@/components/LangSelect'

export default {
  components: {
    LangSelect
  },
  name: 'HeaderBar',
  computed: {
    ...mapGetters([
      'user',
      'activeIndex',
      'headMenu'
    ])
  },
  mounted: function () {
  },
  methods: {
    generateTitle,
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
          // _this.$router.replace({path: '/'})
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消'
          })
        })
      }
    },
    handleSelect (index) {
      this.$store.commit('selectHeader', {
        headerIndex: index
      })
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
