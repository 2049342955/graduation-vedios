<template>
  <el-form ref="UserFrom" :model="user" :rules="rules" >
    <el-form-item prop="name">
      <el-input placeholder="请输入用户名" v-model="user.name">
        <template>用户名</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="pwd" >
      <el-input v-model="user.pwd" type="password" auto-complete="on">
        <template slot="prepend">密码</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="npwd" v-show="user.pwd!=''" >
      <el-input v-model="user.npwd" type="password">
        <template slot="prepend">确认密码</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input placeholder="请输入邮箱" v-model="user.email">
        <template >邮箱</template>
      </el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister" :loading="loading">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Fetch from '../api/index'
  import Rule from '../common/lib/loginTwo-rule'
  export default {

    data() {
      const vm = this;
      return {
        loading: false,
        user:{
          name:'',
          pwd:'',
          npwd:'',
          email:''
        },
        rules: Rule.call(vm, 'user'),
        checked: true,
        activeName:''
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
        serverObj.phone =  formObj.phone;;
        return serverObj;
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async handleRegister() {
        let that = this;
        try {
          await new Promise((res, rej) => {
            this.$refs.UserFrom.validate((valid) => {
              if (valid) {
                res();
              } else {
                rej('数据格式不对');
              }
            });
          });

          this.loading = true;
          let params = {name: this.user.name, password: this.user.pwd, email: this.user.email};

        const fetch = Fetch.getFetch();
        let response =  await fetch.post('/api/user/register', this.transServer(params));
        if(response){
          const newUser = response.data;
          if(newUser.id && newUser.id != null){
            this.loading = false;
            this.$message({message:'注册成功',type:'success',center: true});
            this.user={};
          }else{
            this.$message.error("注册失败，请重新注册");
          }
        }else{
          this.$message.error("网络超时，请重新注册");
          this.loading=false
        }
        } catch (error) {
          this.$message.error(error);
        }
      },

      mounted(){
        this.user={};
      }
    }
  }
</script>
<style>
  body {
    background: #DFE9FB;
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
</style>
