<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>管理</el-breadcrumb-item>
        <el-breadcrumb-item>视频管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <div style="margin: 30px 80px 30px 80px">
        <fieldset>
          <legend>审核视频</legend>
          <div style="padding: 14px;">
            <hr>
            <div style="margin-left: 150px">
              <el-table
                :data="copyTableData"
                style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-row :gutter="12" style="width: calc(100% - 16px)">
                        <el-col :span="24">
                          <el-form-item label="分类">
                            <el-tag
                              v-for="tag in props.row.types"
                              :key="tag.id">
                              {{tag.typeName}}
                            </el-tag>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="12" style="width: calc(100% - 16px)">
                        <el-col :span="24">
                          <el-form-item label="视频简介">
                            <span style="color: #e68a00" class="tt">{{ props.row.summary }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="12" style="width: calc(100% - 16px)">
                        <el-col :span="24">
                          <el-form-item label="描述">
                              <span style="color: darkseagreen;font-size: smaller" class="tt">{{ props.row.description?props.row.description:"暂无描述"
                                }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="12" style="width: calc(100% - 16px)">
                        <el-col :span="8">
                          <el-button type="info" icon="el-icon-edit" round
                                     @click.native.prevent="handlePlay(props.row)">详情
                          </el-button>
                        </el-col>
                        <el-col :span="8">
                          <el-button type="success" icon="el-icon-edit" round
                                     @click.native.prevent="handleApprove(props.row)">通过
                          </el-button>
                        </el-col>
                        <el-col :span="8">
                          <el-button type="info" icon="el-icon-error" round
                                     @click.native.prevent="handleRef">拒绝
                          </el-button>
                        </el-col>
                      </el-row>

                      <el-row :gutter="12" v-show="reason" style="margin-top: 20px">
                        <el-col :span="24">
                          <el-input placeholder="请输入未通过原因,字数在100以内"
                                    type="textarea" rows="2"
                                    v-model="reasons"
                                    >
                          </el-input>
                        </el-col>
                        <el-col :span="24" style="margin-top: 20px">
                          <el-button type="info" icon="el-icon-error" round
                                     @click.native.prevent="handleRefuse(props.row)">提交
                          </el-button>
                        </el-col>
                      </el-row>

                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column
                  label="视频名"
                  prop="name"
                  width="140">
                </el-table-column>
                <el-table-column
                  label="所属者"
                  prop="userName"
                  width="180">
                </el-table-column>
                <el-table-column
                  label="播放量"
                  prop="playBack"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="收藏量"
                  prop="collection"
                  width="180">
                </el-table-column>
                <el-table-column
                  label="上传时间"
                  prop="uploadDate"
                  width="180">
                </el-table-column>
              </el-table>
            </div>
            <div style="margin-top: 50px;margin-left: 150px">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1,2, 3, 4, 5]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">
              </el-pagination>
            </div>
          </div>
        </fieldset>
      </div>
    </el-col>

    <el-col>
      <div style="margin: 30px 80px 30px 80px">
        <el-form ref="form" :model="newUser" label-width="80px" :rules="rules">
          <fieldset>
            <legend>下架视频</legend>
            <div style="padding: 14px;">
              <hr>
              <div style="margin-top: 20px;margin-left: 50px">
                <div>
                  <el-table
                    :data="newCopyTableData"
                    style="width: 100%">
                    <el-table-column type="expand">
                      <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                          <el-row :gutter="12" style="width: calc(100% - 16px)">
                            <el-col :span="24">
                              <el-form-item label="分类">
                                <el-tag
                                  v-for="tag in props.row.types"
                                  :key="tag.id">
                                  {{tag.typeName}}
                                </el-tag>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row :gutter="12" style="width: calc(100% - 16px)">
                            <el-col :span="24">
                              <el-form-item label="视频简介">
                                <span style="color: #e68a00" class="tt">{{ props.row.summary }}</span>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row :gutter="12" style="width: calc(100% - 16px)">
                            <el-col :span="24">
                              <el-form-item label="描述">
                              <span style="color: darkseagreen;font-size: smaller" class="tt">{{ props.row.description?props.row.description:"暂无描述"
                                }}</span>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-form>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="视频名"
                      prop="name"
                      width="140">
                    </el-table-column>
                    <el-table-column
                      label="所属者"
                      prop="userName"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="播放量"
                      prop="playBack"
                      width="200">
                    </el-table-column>
                    <el-table-column
                      label="收藏量"
                      prop="collection"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      label="上传时间"
                      prop="uploadDate"
                      width="180">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="200">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          type="success"
                          @click="handleXiaJia(scope.row)" >下架</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div style="margin-top: 50px;margin-left: 150px">
                  <el-pagination
                    @size-change="handleSizeChangeNew"
                    @current-change="handleCurrentChangeNew"
                    :current-page="newCurrentPage"
                    :page-sizes="[1,2, 3, 4, 5]"
                    :page-size="newPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="newTableData.length">
                  </el-pagination>
                </div>
              </div>
            </div>
          </fieldset>
        </el-form>
      </div>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <div style="margin: 30px 80px 30px 80px">
        <fieldset>
          <legend>快速下架</legend>
          <el-form label-width="80px">
            <div style="margin-top: 20px;">
              <el-row :gutter="12" >
                <el-col :span="12">
                  <el-form-item label="视频名" prop="name">
                    <el-input
                      placeholder="请输入视频名"
                      prefix-icon="el-icon-search"
                      @keyup.enter.native="handleSelect"
                      v-model="name">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div v-show="vedio.name!=''" style="margin-left: 60px">
              <span style="margin-left: 500px">视频</span>
              <hr>
              <div style="margin-top: 20px">
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="12">
                    <el-form-item label="名称">
                      <span style="color: #00cc66;font-size: large">{{vedio.name}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="所属者">
                      <span style="color: #00cc66;font-size: large">{{vedio.userName}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="12">
                    <el-form-item label="播放量">
                      <span style="color: #00cc66;font-size: large">{{vedio.playBack}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收藏量">
                      <span style="color: #00cc66;font-size: large">{{vedio.collection}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="24">
                    <el-form-item label="分类">
                      <el-tag
                        v-for="tag in vedio.types"
                        :key="tag.id">
                        {{tag.typeName}}
                      </el-tag>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="上传时间">
                      <span style="color: #00cc66;font-size: large">{{vedio.uploadDate}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <span slot="footer" class="dialog-footer" >
                  <el-button type="warning" icon="el-icon-check" round @click="handleDelete">下架</el-button>
                </span>
            </div>
          </el-form>
        </fieldset>
      </div>
    </el-col>

  </el-row>
</template>

<script>
  import DeepClone from './../common/lib/deepClone'
  import Fetch from './../api/index'
  import _ from 'lodash';
  import Rule from './../common/lib/admin-rule'
  export default {
    data(){
      const vm =this;
      return{
        name:'',
        vedio:{
          name:''
        },
        newUser:{},
        rules:Rule.call(vm, 'form'),
        tableData:[],
        splitTableData:[],
        copyTableData:[],
        pageSize:2,
        currentPage:1,
        newTableData:[],
        newSplitTableData:[],
        newCopyTableData:[],
        newPageSize:2,
        newCurrentPage:1,
        reason:false,
        reasons:'',
      }
    },
    methods:{
      transServer(formObj){
        const serverObj={};
        serverObj.id = formObj.id;
        serverObj.userId = formObj.UserId;
        serverObj.name =formObj.name;
        serverObj.summary = formObj.summary;
        serverObj.pictureUrl = formObj.pictureUrl;
        serverObj.vedioUrl = formObj.vedioUrl;
        serverObj.playBack = formObj.playBack;
        serverObj.collection =  formObj.collection;
        serverObj.status = formObj.status;
        //serverObj.uploadDate = formObj.uploadDate;
        serverObj.description  = formObj.description;
        return serverObj;
      },

      async handleDelete(){
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/vedio/delete',{params:{id:this.vedio.id}});
        let result = response.data;
        if(response && result){
          this.$message({message:'下架成功',type:'success',center: true})
          this.name='';
          this.vedio = {name:''};
        }else{
          this.$message.error("亲，下架失败，请重新尝试");
        }
      },

      async handleSelect(){
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/vedio/select',{params:{name:this.name}});
        let result = response.data;
        if(response && result){
          this.vedio = result;
        }else{
          this.$message.error("亲，没找到该视频，请确认视频名称正确");
        }
      },

      async handleAdd(){
        let fetch = Fetch.getFetch();
        this.newUser.password="a1234567";
        let response = await fetch.post('/api/user/addAdmin',this.transServer(this.newUser));
        let result = response.data;
        if(response && result){
          this.$message({message:'添加成功',type:'success',center: true})
          this.newUser={};
        }else{
          this.$message.error("亲，添加失败，请重新尝试");
        }
      },

      async handleDelet(val){
        console.log("val",val);
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/user/delete',{params:{id:val.id}});
        let result = response.data;
        if(response && result){
          this.$message({message:'删除成功',type:'success',center: true})
          this.tableData = (this.tableData||[]).filter(table=>{
            return table.id != val.id
          })
          this.copyTableData = (this.copyTableData||[]).filter(table=>{
            return table.id != val.id
          })
        }else{
          this.$message.error("亲，删除失败，请重新尝试");
        }
      },

      handleSizeChange(val) {        this.splitTableData =_.chunk(this.tableData,val)||[];
        this.copyTableData =this.splitTableData[this.currentPage-1];
      },

      handleCurrentChange(val) {
        this.currentPage =val;
        this.copyTableData =this.splitTableData[this.currentPage-1];
      },

      handleSizeChangeNew(val) {
        this.newSplitTableData =_.chunk(this.newTableData,val)||[];
        this.newCopyTableData =this.newSplitTableData[this.newCurrentPage-1];
      },

      handleCurrentChangeNew(val) {
        this.newCurrentPage =val;
        this.newCopyTableData =this.newSplitTableData[this.newCurrentPage-1];
      },

      async loadMyVedio(){
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/vedio/getAllAprove');
        let result = response.data.data;
        if(response && result) {
          this.tableData = result;
          this.splitTableData = _.chunk(this.tableData, this.pageSize) || [];
          this.copyTableData = this.splitTableData[this.currentPage - 1];
        }
      },

      handlePlay(data){
        this.$router.push({path:'/player',query:{data:JSON.stringify(data)}});//类似post传参
      },

      async handleApprove(data){
        data.status ="Y";
        let fetch = await Fetch.getFetch();
        let response = await fetch.post('/api/vedio/save',this.transServer(data));
        let result = response.data;
        console.log("result",result);
        if(response && result) {
          this.$message({message:'审核成功',type:'success',center: true})
          this.tableData = (this.tableData||[]).filter(table=>{
            return table.id != data.id;
          })
          this.copyTableData =(this.copyTableData||[]).filter(table=>{
            return table.id != data.id;
          });
        }else{
          this.$message.error("亲，审核失败，请重新尝试");
        }
      },

      handleRef(){
        this.reason=true;
      },

      async handleRefuse(data){
        console.log('data',data)
        data.description = this.reasons;
        data.status="NN";
        let fetch = await Fetch.getFetch();
        let response = await fetch.post('/api/vedio/save',this.transServer(data));
        let result = response.data;
        console.log("result",result);
        if(response && result) {
          this.$message({message:'审核成功',type:'success',center: true})
          this.tableData = (this.tableData||[]).filter(table=>{
            return table.id != data.id;
          })
          this.copyTableData =(this.copyTableData||[]).filter(table=>{
            return table.id != data.id;
          });
          this.reason= false;
          this.reasons = '';
        }else{
          this.$message.error("亲，审核失败，请重新尝试");
        }
      },

      async handleDel(data){

      },

      async handleXiaJia(data){
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/vedio/delete',{params:{id:data.id}});
        let result = response.data;
        console.log("result",result);
        if(response && result) {
          this.$message({message:'下架成功',type:'success',center: true})
          this.newTableData = (this.newTableData||[]).filter(table=>{
            return table.id != data.id;
          })
          this.newCopyTableData =(this.newCopyTableData||[]).filter(table=>{
            return table.id != data.id;
          });
        }else{
          this.$message.error("亲，下架失败，请重新尝试");
        }
      },

      async loadAllVedios(){
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/vedio/list',{params:{status:"Y"}});
        let result = response.data.data;
        console.log("result",result);
        if(response && result) {
          this.newTableData = result;
          this.newSplitTableData = _.chunk(this.newTableData, this.newPageSize) || [];
          this.newCopyTableData = this.newSplitTableData[this.newCurrentPage - 1];
        }
      },

    },
    mounted(){
//      this.loadUsers();
      this.loadMyVedio();
      this.loadAllVedios();
    },
  }
</script>
