<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <div style="margin: 30px 80px 30px 80px">
        <fieldset>
          <legend>删除用户</legend>
          <el-form label-width="80px">
            <div style="margin-top: 20px;">
              <el-row :gutter="12" >
                <el-col :span="12">
                  <el-form-item label="用户" prop="name">
                    <el-input
                      placeholder="请输入用户名"
                      prefix-icon="el-icon-search"
                      @keyup.enter.native="handleSelect"
                      v-model="name">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div v-show="user.name!=''" style="margin-left: 60px">
              <span style="margin-left: 500px">用户</span>
              <hr>
              <div style="margin-top: 20px">
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="12">
                    <el-form-item label="名称">
                      <span style="color: #00cc66;font-size: large">{{user.name}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="昵称">
                      <span style="color: #00cc66;font-size: large">{{user.nickName?user.nickName:"未填写"}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="12">
                    <el-form-item label="邮箱">
                      <span style="color: #00cc66;font-size: large">{{user.email}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="手机">
                      <span style="color: #00cc66;font-size: large">{{user.phone?user.phone:"未填写"}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <span slot="footer" class="dialog-footer" >
                  <el-button type="warning" icon="el-icon-check" round @click="handleDelete">删除用户</el-button>
                </span>
            </div>
          </el-form>
        </fieldset>
      </div>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <div style="margin: 30px 80px 30px 80px">
        <el-form ref="form" :model="newUser" label-width="80px" :rules="rules">
            <fieldset>
              <legend>添加管理员</legend>
              <el-row :gutter="12" style="width: calc(100% - 16px)">

                <el-col :span="10">
                  <el-form-item label="角色" prop="role">
                    管理员，用户
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="密码" prop="pwd">
                    a1234567
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="10">
                  <el-form-item label="用户名" prop="name">
                    <el-input v-model="newUser.name" suffix-icon="el-icon-edit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="newUser.email" suffix-icon="el-icon-edit"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="12" style="width: calc(100% - 16px)">
                <el-col :span="10">
                  <el-form-item label="手机" prop="phone">
                    <el-input v-model="newUser.phone" suffix-icon="el-icon-edit"></el-input>
                  </el-form-item>
                </el-col>

              </el-row>
            </fieldset>
        </el-form>

        <span slot="footer" class="dialog-footer">
        <el-button type="warning" icon="el-icon-check" round @click="handleAdd">添加</el-button>
        </span>
      </div>
    </el-col>

    <el-col>
      <div style="margin: 30px 80px 30px 80px">
        <el-form ref="form" :model="newUser" label-width="80px" :rules="rules">
          <fieldset>
            <legend>管理用户</legend>
            <div style="padding: 14px;">
              <hr>
              <div style="margin-top: 20px;margin-left: 50px">
                <el-table
                  :data="copyTableData"
                  style="width: 100%">
                  <el-table-column
                    label="姓名"
                    prop="name"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="昵称"
                    prop="nickName"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="邮箱"
                    prop="email"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="手机号"
                    prop="phone"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="状态"
                    prop="status"
                    width="180">
                    <template slot-scope="scope">
                      <el-tag type="primary" :disable-transitions="true" v-if="scope.row.status == 'Y'">正常</el-tag>
                      <el-tag type="warning" :disable-transitions="true" v-else>异常</el-tag>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" fixed="right" width="200">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelet(scope.row)" >删除</el-button>
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
          </fieldset>
        </el-form>
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
        user:{
          name:''
        },
        newUser:{},
        rules:Rule.call(vm, 'form'),
        tableData:[],
        splitTableData:[],
        copyTableData:[],
        pageSize:2,
        currenyPage:1,
      }
    },
    methods:{
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

      async handleDelete(){
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/user/delete',{params:{id:this.user.id}});
        let result = response.data;
        if(response && result){
          console.log('result',result)
          this.$message({message:'删除成功',type:'success',center: true})
          this.name='';
          this.user = {name:''};
        }else{
          this.$message.error("亲，删除失败，请重新尝试");
        }
      },

      async handleSelect(){
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/user/selectOne',{params:{name:this.name}});
        let result = response.data;
        if(response && result){
          this.user = result;
        }else{
          this.$message.error("亲，没找到该用户，请确认用户名正确");
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

      handleSizeChange(val) {
        this.splitTableData =_.chunk(this.tableData,val)||[];
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },

      handleCurrentChange(val) {
        this.currenyPage =val;
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },

      async loadUsers(){
        let fetch = Fetch.getFetch();
        let response = await fetch.get('/api/user/getAllUSers');
        let result = response.data;
        console.log("result",result);
        if(response && result){
          this.tableData =result;
          console.log('table',this.tableData);
          this.splitTableData =_.chunk(this.tableData,this.pageSize)||[];
          this.copyTableData =this.splitTableData[this.currenyPage-1];
        }
      },

    },
    mounted(){
      this.loadUsers();
    },
  }
</script>
