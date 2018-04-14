<template>
<div>
  <el-dialog
    :visible.sync="loginVisible"
    width="30%"
    center>
    <el-form>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane ><login-one v-on:close="handleClose"></login-one></el-tab-pane>
        <el-tab-pane ><login-one v-on:close="handleClose"></login-one></el-tab-pane>
        <el-tab-pane ><login-one v-on:close="handleClose"></login-one></el-tab-pane>
        <el-tab-pane ><login-one v-on:close="handleClose"></login-one></el-tab-pane>
        <el-tab-pane ><login-one v-on:close="handleClose"></login-one></el-tab-pane>
        <el-tab-pane label="登录" name="first" ><login-one v-on:close="handleClose"></login-one></el-tab-pane>
        <el-tab-pane label="注册" name="second"><login-two></login-two></el-tab-pane>
      </el-tabs>
    </div>
  </el-form>
  </el-dialog>
</div>
</template>

<script>
  import LoginOne from '../components/loginOne.vue'
  import LoginTwo from '../components/loginTwo.vue'

  export default {
    components:{LoginOne,LoginTwo},
    props: {
      visible: Boolean,
    },
    data() {
      return {
        img:'../images/bk.jpg',
        loading: false,
        account: {
          username: '',
          pwd: ''
        },
        checked: true,
        activeName:'',
        loginVisible:false,
        login:true,
      };
    },
    watch:{
      visible(val){
        if(val){
          this.loginVisible = true;
        }
      },
      loginVisible(val){
        this.$emit("update:visible", val);
      },
      login(val){
        this.loginVisible = false;
      },
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCancle(){
        this.loginVisible = false;
      },
      handleClose(){
        this.loginVisible = false;
        this.$router.go("/");
      },
    }
  }
</script>
<style>
  body {
    background-size: cover;

  }
</style>
<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
  .center {
    width: 960px;
    margin-left: auto;
    margin-right: auto;
    background-size: cover;
  }
</style>
