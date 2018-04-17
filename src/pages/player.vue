<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>视频</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form  label-width="80px">
          <fieldset>
            <legend>{{this.vedio.name}}</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="24">
                <div style="align-content: center;margin-top: 10px">
                  <video :src="this.vedio.vedioUrl" width="900px" height="400px" controls="controls"></video>
                </div>
              </el-col>
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

    <el-col :span="24" class="warp-main">
      <div style="margin-left: 80px">
        <el-col :span="24" class="warp-main" >
          <div style="margin-top: 20px;">
            <el-form label-width="80px">
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="2">
                  <el-button
                    plain
                    @click="handleSummary">
                    简介
                  </el-button>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="分类" prop="userName">
                    <el-tag
                      v-for="tag in this.vedio.types"
                      :key="tag.id">
                      {{tag.typeName}}
                    </el-tag>
                  </el-form-item>
                </el-col>
                <el-col :span="4" style="margin-left: 50px">
                  <el-form-item label="所属者" prop="userName">
                    {{this.vedio.userName}}
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="播放量" prop="userName">
                    {{this.vedio.playBack}}
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="收藏量" prop="userName">
                    {{this.vedio.collection}}
                  </el-form-item>
                </el-col>
                <el-col :span="2" v-if="!isCollect">
                  <el-button style="font-size: 20px;border: 0px" v-on:click="handleCollect">
                    <span class="el-icon-star-off"></span>
                  </el-button>
                </el-col>
                <el-col :span="2" v-else="isCollect">
                  <el-button style="font-size: 20px;border: 0px;color: red" v-on:click="handleRemoveCollect">
                    <span class="el-icon-star-on"></span>
                  </el-button>
                </el-col>
                <el-col :span="2">
                  <el-form-item >
                    <el-button style="border: 0px" v-on:click="handleConcern" v-show="!isConcern">
                      关注
                    </el-button>
                    <el-button style="border: 0px" v-on:click="handleRemoveConcern" v-show="isConcern">
                      取消关注
                    </el-button>
                    <!--<el-badge :value="12" class="item">-->
                      <!--<el-button size="small">评论</el-button>-->
                    <!--</el-badge>-->
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-col>
      </div>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div style="margin-left: 80px">
        <el-col :span="24" class="warp-main" >
          <div style="margin-top: 20px;">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item title="相关评论" name="1">
                <el-row>
                  <el-col :span="10">
                    <div v-show="user.id" style="margin-left: 150px">
                      <el-form label-width="80px">
                        <el-form-item label="评论">
                          <el-input
                            placeholder="请输入评论，字数在50以内"
                            v-model="content"
                            @keyup.enter.native="handleSelect"
                            clearable>
                          </el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-col>
                </el-row>
                <div style="margin-top: 20px;">
                  <div style="margin-left: 150px">
                    <el-table
                      :data="copyTableData"
                      style="width: 80%">
                      <el-table-column
                        label="用户名"
                        prop="userName"
                        width="140">
                      </el-table-column>
                      <el-table-column
                        label="内容"
                        prop="content"
                        width="400">
                      </el-table-column>
                      <el-table-column
                        label="评论时间"
                        prop="date"
                        width="180">
                      </el-table-column>
                      <el-table-column label="操作" fixed="right" width="200">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="handleDeletComment(scope.row)" v-show="isCanDelete">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div style="margin-top: 50px;margin-left: 150px">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currenyPage"
                      :page-sizes="[1,2, 3, 4, 5]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.length">
                    </el-pagination>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import Fetch from './../api/index'
  import _ from 'lodash';
  export default {
    components: {
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
//        playerOptions: {
////        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
//          autoplay: false, //如果true,浏览器准备好时开始回放。
//          muted: false, // 默认情况下将会消除任何音频。
//          loop: false, // 导致视频一结束就重新开始。
//          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
//          language: 'zh-CN',
//          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
//          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
//          sources: [{
//            type: "video/mp4",
//            src: "http:localhost:8090//api/video/123.mp4" //你的m3u8地址（必填）
//          }],
//          poster: "http:localhost:8090//api/img/dog.jpg", //你的封面地址
//          width: document.documentElement.clientWidth,
//          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
////        controlBar: {
////          timeDivider: true,
////          durationDisplay: true,
////          remainingTimeDisplay: false,
////          fullscreenToggle: true  //全屏按钮
////        }
//        }
        types:[{id:'1234567',typeName:'动画片'}],
        vedio:{
        },
        isCollect:false,
        user:{},
        collection:{},
        isConcern:false,
        concern:{},
        activeNames:1,
        content:'',
        tableData: [],
        splitTableData: [],
        copyTableData: [],
        pageSize: 2,
        currenyPage: 1,
        isCanDelete:false,
      }
    },

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

      transCollect(formObj){
        const serverObj ={};
        serverObj.id = formObj.id;
        serverObj.userId = formObj.userId;
        serverObj.vedioId = formObj.vedioId;
        serverObj.status = formObj.status;
        serverObj.description = formObj.description;
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

      handleSizeChange(val) {
        this.splitTableData = _.chunk(this.tableData, val) || [];
        this.copyTableData = this.splitTableData[this.currenyPage - 1];
      },

      handleCurrentChange(val) {
        this.currenyPage = val;
        this.copyTableData = this.splitTableData[this.currenyPage - 1];
      },


      handleSummary(){
        this.$notify({
          title: '简介',
          message: this.vedio.summary,
          duration: 0,
          position: 'top-right'
        });
      },

      async isCollection(){
        let fetch = Fetch.getFetch();
        let param ={userId:this.user.id,vedioId:this.vedio.id,status:'Y'};
        console.log('pp',param);
        const result = await fetch.get('/api/collection/selectOne',{params:param})
        let user = result.data;
        console.log("u",user);
        if(result && user && user.id){
          this.isCollect=true;
          this.collection = user;
        }
      },

      async isConcerntion(){
        let fetch = Fetch.getFetch();
        const result = await fetch.get('/api/concern/isConcern',{params:{userId:this.user.id,concernId:this.vedio.userId}})
        let user = result.data;
        console.log("u",user);
        if(result && user && user.id){
          this.isConcern=true;
          this.concern = user;
        }
      },

      async handleCollect(){
        let temp = this.isCollect;
        let fetch  = Fetch.getFetch();
        let params = {userId:this.user.id,vedioId:this.vedio.id,status:(!temp)?'Y':'N'};
        console.log('aa',this.transCollect(params))
        let response = await fetch.post('/api/collection/save',this.transCollect(params));
        let result = response.data;
        console.log('collect',this.vedio.collection);
        if(response && result && result.id){
          this.isCollect = !temp;
          this.$message({message:'收藏成功',type:'success',center: true})
          this.vedio.collection = this.vedio.collection+1;
        }else{
          this.$message.error("收藏失败，请重新尝试");
        }

      },

      async handleRemoveCollect(){
        let temp = this.isCollect;
        let fetch  = Fetch.getFetch();
        //let params = {id:this.collection.id,userId:this.user.id,vedioId:this.vedio.id,status:(!temp)?'Y':'N'};
        let response = await fetch.get('/api/collection/delete',{params:{userId:this.user.id,vedioId:this.vedio.id}});
        let result = response.data;
        if(response && result){
          this.isCollect = !temp;
          this.$message({message:'取消成功',type:'success',center: true});
          if(this.vedio.collection >0){
            this.vedio.collection = this.vedio.collection-1;
          }
        }else{
          this.$message.error("取消失败，请重新尝试");
        }
      },

      async handlePlayBack(){
        let fetch  = Fetch.getFetch();
        let response = await fetch.get('/api/vedio/addPlayBack',{params:{id:this.vedio.id}});
        let result = response.data;
        console.log("res",result);
        if(response && result){
          this.vedio.playBack= this.vedio.playBack+1;
        }else{
          this.$message.error("亲，内部错误，请多包涵");
        }
      },

      async handleConcern(){
        let fetch  = Fetch.getFetch();
        let response = await fetch.post('/api/concern/save',{id:this.concern.id,userId:this.user.id,concernId:this.vedio.userId,status:'Y'});
        let result = response.data;
        if(response && result){
          this.$message({message:'关注成功',type:'success',center: true});
          this.isConcern=true;
        }else{
          this.$message.error("亲，关注失败，请重新尝试");
        }
      },

      async handleRemoveConcern(){
        let fetch  = Fetch.getFetch();
        let response = await fetch.get('/api/concern/delete',{userId:this.user.id,concernId:this.vedio.userId});
        let result = response.data;
        console.log("res",result);
        if(response && result){
          this.$message({message:'取消成功',type:'success',center: true});
          this.isConcern=false;
        }else{
          this.$message.error("亲，取消失败，请重新尝试");
        }
      },

      async handleSelect(){
        let fetch = Fetch.getFetch();
        let response = await fetch.post('/api/comment/save',{vedioId:this.vedio.id,userId:this.user.id,content:this.content,userName:this.user.name});
        let result = response.data;
        if(response && result){
          this.$message({message:'评论成功',type:'success',center: true});
          this.content='';
          (this.tableData||[]).push(result);
          this.copyTableData.push(result);
        }else{
          this.$message.error("亲，评论失败，请重新尝试");
        }
      },

      async loadComment(){
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/comment/getByVedio',{params:{vedioId:this.vedio.id}});
        let result = response.data;
        if(response && result){
          this.tableData =result;
          console.log('table',this.tableData);
          this.splitTableData =_.chunk(this.tableData,this.pageSize)||[];
          this.copyTableData =this.splitTableData[this.currenyPage-1];
        }
      },

      async handleDeletComment(data){
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/comment/delete',{params:{id:data.id}});
        let result = response.data;
        console.log("comment",result);
        if(response && result){
          this.$message({message:'删除成功',type:'success',center: true});
          this.tableData = (this.tableData||[]).filter(table=>{
            return table.id != data.id
          })
          this.copyTableData = (this.copyTableData||[]).filter(table=>{
            return table.id != data.id
          })
        }else{
          this.$message.error("亲，删除，请重新尝试");
        }
      },

       async handleWatch(){
         let fetch = Fetch.getFetch();
         let response = await fetch.post('/api/watchRecords/save',{userId:this.user.id,vedioId:this.vedio.id});
         let result = response.data;
         console.log("watch",result);
         if(response && result){

         }
       },

    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    mounted() {
      let data = this.$route.query.data;
      if(data){
        data = JSON.parse(data);
        this.vedio = data;
        console.log("vedio",this.vedio);

      }else{
        this.$message.error("数据被怪兽吃掉了，请重新尝试");
      }
      let user = sessionStorage.getItem('user');
      let role = sessionStorage.getItem('role')
      if (user) {
        user = JSON.parse(user);
        this.user = user;
        this.isCollection();
        this.isConcerntion();
        this.loadComment();
        if(user.id == this.vedio.userId){
          this.isCanDelete = true;
        }
        this.handlePlayBack();
        this.handleWatch();
      }
      if(role){
        role = JSON.parse(role);
        (role||[]).forEach(r=>{
          if(r.code == 'GLY'){
            this.isCanDelete = true;
          }
        })
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
