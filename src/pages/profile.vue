<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" :loading="loading">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>基本信息</legend>
          <el-row :gutter="12" style="width: calc(100% - 16px)">
            <el-col :span="10">
              <el-form-item label="用户名" prop="name">
                {{form.name}}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="角色" prop="role">
                {{form.role}}
              </el-form-item>
            </el-col>
          </el-row>

            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="昵称" prop="nickName">
                  <el-input v-model="form.nickName" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="email" label="邮箱">
                  <el-input v-model="form.email" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item prop="phone" label="手机">
                  <el-input v-model="form.phone" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col align="center">
                <el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>


        <el-card :class="[$style.panel]" style="margin: 30px 80px 30px 80px">
          <fieldset>
            <legend>修改密码</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="8">
                <el-form-item prop="oldPassword" label="原密码">
                  <el-input v-model="form.oldPassword" type="password"></el-input>
                </el-form-item>
              </el-col>
              <div v-show="form.oldPassword == this.form.password">
                <el-col :span="8">
                  <el-form-item prop="newPassword" label="新密码">
                    <el-input v-model="form.newPassword" type="password"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="ensure" label="确认">
                    <el-input v-model="form.ensure" type="password"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>

            <el-row>
              <el-col align="center">
                <el-button type="primary" @click="handleSavePassword">修改并保存</el-button>
              </el-col>
            </el-row>
          </fieldset>
        </el-card>


      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import Fetch from './../api/index'
  import Rule from './../common/lib/profile-rule'
  export default {
    components: {
    },
    data() {
      const vm = this;
      return {
        loading: false,
        form: {
          useranme: '',
          nickname: '',
          name: '',
          email: '',
          major:'',
          startdate:'',
          phone:'',
          address:'',
          oldPassword:'',
          newPassword:'',
          ensure:'',
        },
        rules: Rule.call(vm, 'form'),
        college:'',
        colleges:[],
        majors:[],
        corporations:[],
        corporation:'',
        reasons:'',
        activeNames:[''],
        startDates:[{lable:'2014',value:'2014'},{lable:'2015',value:'2015'},{lable:'2016',value:'2016'},{lable:'2017',value:'2017'}],
        approveLoad:false,
        imageUrl:'',
        imageUrlId1:'',
        imageUrlId2:'',
        ruleForm:{},
        fileList: [],
        my:'/api/user/upload',
        isAdmin:false,
      }
    },
//    watch:{
//      async college(val){
//        if(val){
//          this.loadMajor();
//        }
//      }
//    },

    methods: {

      transServer(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.name =formObj.name;
        serverObj.nickName = formObj.nickName;
        serverObj.password = formObj.password;
        serverObj.email = formObj.email;
        serverObj.college = formObj.college;
        serverObj.major = formObj.major;
        serverObj.startdate = formObj.startdate;
        serverObj.address = formObj.address;
        serverObj.status = formObj.status;
        serverObj.phone =  formObj.phone;
        serverObj.headUrl = formObj.headUrl;
        return serverObj;
      },
      transPassword(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.name =formObj.name;
        serverObj.nickName = formObj.nickName;
        serverObj.password = formObj.newPassword;
        serverObj.status = formObj.status;
        serverObj.phone =  formObj.phone;
        return serverObj;
      },

      transApprove(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.uid =formObj.uid;
        serverObj.cid =formObj.cid;
        serverObj.status = formObj.status;
        serverObj.description = formObj.reasons;
        return serverObj;
      },

      handleChange(val) {
        console.log(val);
      },

      async loadCollege(){
        let fetch = Fetch.getFetch();
        const result = await fetch.get('/api/college/list');
        let colleges = result.data.data;
        this.colleges = (colleges ||[]).map(college => {
          return {
            value: college.id,
            label: college.name
          }
        });
      },

      async loadMajor(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/major/list',{params:{parentId:this.college}});
        let majors = result.data.data;
        this.majors = (majors||[]).map(major=>{
          return {
            value:major.id,
            label:major.name
          }
        })
      },

      async loadCorporation(){
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/corporation/list');
        let corporations = result.data.data;
        this.corporations = (corporations||[]).map(corporation=>{
          return {
            value:corporation.id,
            label:corporation.name
          }
        })
      },

      async handleCollege(){
        this.form.major='';
        this.loadMajor();
      },
      async handleSaveProfile() {
        this.form.college = this.college;
        const fetch = Fetch.getFetch();
        const result = await fetch.post('/api/user/save',this.transServer(this.form))
        let user = result.data;
        if(result && user && user.id){
          this.$message({message:'保存成功',type:'success',center: true})
          sessionStorage.setItem('user',JSON.stringify(user))
        }else{
          this.$message.error("修改失败，请重新尝试");
        }
      },

      async handleSavePassword(){
        this.form.college = this.college;
        const fetch = Fetch.getFetch();
        const result = await fetch.post('/api/user/save',this.transPassword(this.form))
        let user = result.data;
        if(result && user && user.id){
          this.$message({message:'保存成功',type:'success',center: true})
          sessionStorage.setItem('user',JSON.stringify(user))
          this.$router.push('/copyLogin')
        }else{
          this.$message.error("修改失败，请重新尝试");
        }
      },

      async handleApprove(){
        let fetch = Fetch.getFetch();
        let params = {uid:this.form.id,cid:this.corporation,reasons:this.reasons}
        const result = await fetch.post('/api/chairmanApprove/save',this.transApprove(params))
        let user = result.data.data;
        if(result && user && user.id){
          this.$message({message:'保存成功',type:'success',center: true})
          this.approveLoad=true;
          let user = JSON.parse(sessionStorage.getItem('user'));
          user.status=1;
          sessionStorage.setItem('user',JSON.stringify(user));
        }else{
          this.$message.error("修改失败，请重新尝试");
        }

      },
      async laodStatus(user){
        let fetch = Fetch.getFetch();
        let params = {id:user.id}
        const result = await fetch.get('/api/user/selectOne',{params:params})
        let newUser = result.data.data;
        if(result && newUser && newUser.status =='0'){
          this.approveLoad=0
        }
      },


    },
     mounted() {
      let user = sessionStorage.getItem('user');
      let role = sessionStorage.getItem('role')
      if (user) {
        user = JSON.parse(user);
        console.log('user',user)
        this.form.useranme = user.name;
        this.form.nickName = user.nickName || '';
        this.form.email = user.email || '';
        this.form.name = user.name || '';
        this.form.id = user.id;
        this.form.phone = user.phone;
        this.form.password = user.password;
        this.form.role ="";
        let arr=JSON.parse(role)||[];
        for(let i =0;i<arr.length;i++){
          if(i== arr.length-1){
            this.form.role+=arr[i].roleName;
          }else{
            this.form.role+=arr[i].roleName+",";
          }
        }

        (arr||[]).forEach(ar=>{
          if(ar.roleName == '管理员'){
            this.isAdmin = true;
          }
        })
        this.approveLoad = user.status == "1"?true:false;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" module>
  .wrapper {
  }

  .panel {
    transition: all .3s;
    &:hover {
      box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
    }
    &.shawdow {
      box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
    }
    &.margin {
      margin: 4px 100px 4px 100px
    }
  }

  .uploader{
    &.avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    &.avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    &.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    &.avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }


</style>
