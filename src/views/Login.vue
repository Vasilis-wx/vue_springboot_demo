<template>
    <el-form class="login-container" :model="loginForm" :rules="loginRules" ref="loginForm" v-loading="loading">
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" name="username" placeholder="请输入用户名/手机号" auto-complete="on"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" name="password" placeholder="请输入密码" auto-complete="on"></el-input>
      </el-form-item>

      <!--<el-checkbox class="login_remember" v-model="checked">记住密码</el-checkbox>-->

      <el-form-item>
        <el-button type="primary" @click="handleLoginClick" style="width:100%;">登录</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import {initMenu, initAllMenu} from '@/utils/utils'
export default {
  name: 'Login',
  data () {
    return {
      checked: true,
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleLoginClick () {
      var _this = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.postRequest('/login/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })
            .then(res => {
              _this.loading = false
              if (res && res.status === 200) {
                var data = res.data
                _this.$store.commit('login', data.data)
                _this.$store.commit('initIndex')
                // var path = _this.$route.query.redirect
                // _this.$router.replace({path: '/home'})
                initMenu(_this.$router, _this.$store, 'selectHeader', true)
                initAllMenu(_this.$router, _this.$store)
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
