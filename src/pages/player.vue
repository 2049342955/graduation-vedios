<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>视频</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="form" label-width="80px">
          <fieldset>
            <legend>视频</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <video-player class="vjs-big-play-centered"
                              ref="videoPlayer"
                              :options="playerOptions"
                              :playsinline="true">

                </video-player>
                <!--<el-form-item label="用户名" prop="name">-->
                  <!--<video-player  class="video-player vjs-custom-skin"-->
                                                <!--ref="videoPlayer"-->
                                                <!--:playsinline="true"-->
                                                <!--:options="playerOptions"-->
                                                <!--@play="onPlayerPlay($event)"-->
                                                <!--@pause="onPlayerPause($event)"-->
              <!--&gt;-->
              <!--</video-player>-->
                <!--</el-form-item>-->
              </el-col>
              <!--<el-col :span="10">-->
                <!--<el-form-item label="角色" prop="role">-->
                  <!--{{form.role}}-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>

            <!--<el-row :gutter="12" style="width: calc(100% - 16px)">-->
              <!--<el-col :span="10">-->
                <!--<el-form-item label="昵称" prop="nickName">-->
                  <!--<el-input v-model="form.nickName" suffix-icon="el-icon-edit"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="10">-->
                <!--<el-form-item prop="email" label="邮箱">-->
                  <!--<el-input v-model="form.email" suffix-icon="el-icon-edit"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->

            <!--<el-row :gutter="12" style="width: calc(100% - 16px)">-->
              <!--<el-col :span="10">-->
                <!--<el-form-item prop="phone" label="手机">-->
                  <!--<el-input v-model="form.phone" suffix-icon="el-icon-edit"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row>-->
              <!--<el-col align="center">-->
                <!--<el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>-->
              <!--</el-col>-->
            <!--</el-row>-->
          </fieldset>

      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import Fetch from './../api/index'
  import Rule from './../common/lib/profile-rule'
  export default {
    components: {
//      myVideo
    },
    data() {
      const vm = this;
      return {
//        video: {
//          sources: [{
//            src: 'http:localhost:8090//api/video/01.框架和最佳实践概述(1).avi',
//            type: 'video/mp4'
//          }],
//          options: {
//            autoplay: true,
//            volume: 0.6,
//            poster: 'http:localhost:8090//api/img/dog.jpg'
//          }
//        },
//        rules: Rule.call(vm, 'form'),
        playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            src: "http:localhost:8090//api/video/123.mp4" //你的m3u8地址（必填）
          }],
          poster: "http:localhost:8090//api/img/dog.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
//        controlBar: {
//          timeDivider: true,
//          durationDisplay: true,
//          remainingTimeDisplay: false,
//          fullscreenToggle: true  //全屏按钮
//        }
        }
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


      onPlayerPlay(player) {
        alert("play");
      },
//      onPlayerPause(player){
//        alert("pause");
//      },
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    mounted() {
      let user = sessionStorage.getItem('user');
      let role = sessionStorage.getItem('role')
      if (user) {
        user = JSON.parse(user);
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
