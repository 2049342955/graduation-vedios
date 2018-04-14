<template>
  <div class="my">
    <el-form  label-position="left" label-width="0px"
              class="demo-ruleForm login-container" ref="AccountFrom" :model="account" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="请输入内容" v-model="account.name">
          <template slot="prepend">用户名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input placeholder="请输入内容" v-model="account.password" type="password">
          <template slot="prepend">密码</template>
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Fetch from '../api/index'
  import DeepClone from '../common/lib/deepClone'

  export default {
    props: {
      visible: Boolean,
    },
    data() {
      return {
        loading: false,
        account: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min:6,max:20,message:'请输入6-20位密码',required:true, trigger: 'blur'},
          ]
        },
      };
    },
    methods: {
      transServer(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.name =formObj.name;
        serverObj.nickName = formObj.nickName;
        serverObj.password = formObj.password;
        serverObj.email = formObj.email;
        serverObj.status = formObj.status;
        serverObj.phone =  formObj.phone;
        return serverObj;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async handleLogin() {
        let that = this;
        try{
          await new Promise((res, rej) => {
            this.$refs.AccountFrom.validate((valid) => {
              if (valid) {
                res();
              } else {
                rej('数据格式不对');
              }
            });
          });
          let loginParams = {name: this.account.name, password: this.account.password};
          const fetch = Fetch.getFetch()
          let result = await fetch.get('/api/user/login', {params:loginParams})
          let user = result.data.user;
          if(result && user && user.id){
            this.$message({message:'登录成功，页面跳转中...',type:'success',center: true})
            sessionStorage.setItem('user',JSON.stringify(user));
            sessionStorage.setItem('role',JSON.stringify(result.data.role));
//            let roles = user.roles||[];
//            var roleIs = 0;
//            roles.forEach(role=>{
//              if(role.roleName == '管理员'){
//                roleIs = 2;
//              }
//            })
//            console.log("roleIs",roleIs);
//            console.log('router',this.$router.options.routes)
//            if(roleIs == 2){
//              (this.$router.options.routes||[]).faorEach(router=>{
//                if(router.name == '设置'){
//                  router.menuShow=true;
//                }
//                if(router.name == '管理'){
//                  router.menuShow=true;
//                }
//              })
//            }else{
//              (this.$router.options.routes||[]).forEach(router=>{
//                if(router.name == '设置'){
//                  router.menuShow=true;
//                }
//              })
//            }
//            console.log('rrouter',this.$router.options.routes)
//            let rout = DeepClone.deepClone(this.$router.options.routes);
//            sessionStorage.setItem('router',JSON.stringify(rout));
            this.$router.push('/');

          }else{
            this.$message.error("登录失败，请检查用户名和密码");
          }
        }catch (error) {
          this.$message.error(error);
        }
      }
    }
  }
</script>
<!--<style>-->
  <!--.body {-->
    <!--background: url(../assets/images/hill.png);-->
    <!--background-size: cover;-->

  <!--}-->
<!--</style>-->
<style lang="scss" scoped>
  .my{
    /*background-size: cover;*/
    /*background: url(../assets/images/hill.png) no-repeat;*/
    /*height:100%;*/
    /*width:100%;*/

  }
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
  }
</style>
