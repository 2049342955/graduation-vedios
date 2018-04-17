<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>视频分类</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div style="margin: 30px 80px 30px 80px">
        <el-form label-width="80px">
          <fieldset>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="24">
                <el-form-item label="分类" >
                  <el-tag v-for="category in categories"
                          size="medium"
                          closable
                          :key="category.id"
                          style="margin-left:10px"
                          @close="handleCategoryClose(category)">
                    {{category.typeName}}
                  </el-tag>

                  <el-button type="info" round @click.native="handleQuery">查询</el-button>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 30px">
                <div>
                  <br/>
                  <el-tooltip class="item" effect="dark"
                              content="选择分类后点击[添加]按钮" placeholder="请选择需要添加的分类" placement="bottom">
                    <el-select filterable
                               no-data-text="加载中..."
                               @focus="loadTypeList"
                               @change="handleTypeChange"
                               v-model="newType"
                               clearable>
                      <el-option v-for="item in types"
                                 :key="item.id"
                                 :label="item.typeName"
                                 :disabled="isTypeDisabled(item)"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-tooltip>
                  <el-button size="small" :disabled="!newType"
                             @click.native="handleAddType">选择分类
                  </el-button>
                </div>
              </el-col>

              <el-col >
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <div style="margin-left: 150px">
                    <el-table
                      :data="copyTableDataOne"
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
                            type="danger"
                            @click="handlePlay(scope.row)" >播放</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div style="margin-top: 50px;margin-left: 150px">
                    <el-pagination
                      @size-change="handleSizeChangeOne"
                      @current-change="handleCurrentChangeOne"
                      :current-page="currentPageOne"
                      :page-sizes="[1,2, 3, 4, 5]"
                      :page-size="pageSizeOne"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableDataOne.length">
                    </el-pagination>
                  </div>
                </el-row>
              </el-col>
            </el-row>
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
  import Rule from './../common/lib/vedio-rule'

  export default {
    data() {
      const vm = this;
      return {
        vedio: {
          videoImgList: [],
          videoFileList: []
        },
        vediosData: [],
        tableData: [],
        splitTableData: [],
        copyTableData: [],
        pageSize: 2,
        currenyPage: 1,
        categories: [],
        types: [],
        newType: {},

        tableDataOne: [],
        splitTableDataOne: [],
        copyTableDataOne: [],
        pageSizeOne: 2,
        currentPageOne: 1,
      }
    },
    methods: {
      handleSizeChange(val) {
        this.splitTableData = _.chunk(this.tableData, val) || [];
        this.copyTableData = this.splitTableData[this.currenyPage - 1];
      },

      handleCurrentChange(val) {
        this.currenyPage = val;
        this.copyTableData = this.splitTableData[this.currenyPage - 1];
      },

      handleCategoryClose(val) {
//        _.remove((this.categories||[]),category=>{
//          return category.id == val.id;
//        })
        this.categories = (this.categories || []).filter(category => {
          return category.id != val.id;
        })
      },

      handleCurrentChangeOne(val) {
        this.currentPageOne = val;
        this.copyTableDataOne = this.splitTableDataOne[this.currentPageOne - 1];
      },

      handleSizeChangeOne(val) {
        this.splitTableDataOne = _.chunk(this.tableDataOne, val) || [];
        this.copyTableDataOne = this.splitTableDataOne[this.currentPageOne - 1];
      },

      isTypeDisabled(item) {
        if (this.categories.find((e) => e.id === item.id)) return true;
        return false;
      },

      handleAddType() {
        if (this.newType) {
          var temp = {};
          (this.types || []).forEach(type => {
            if (type.id == this.newType) {
              temp = type;
            }
          })
          this.categories.push(temp);
          this.newType = '';
        }
      },

      async loadTypeList() {
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/type/list');
        this.types = result.data;
      },

      handleTypeChange(val) {
        if (val) {
          let newCategory = this.types.find((e) => e.id === val.id);
          this.newCategory = newCategory;
        }
      },

      handlePlay(data){
        this.$router.push({path:'/player',query:{data:JSON.stringify(data)}});//类似post传参
      },


      async handleLoadWatch(){
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/vedio/getWatch', {params:{id:this.user.id}});
        let result = response.data.data;
        console.log('watch',result);
        if(response && result) {
          this.newTableDataThree = result;
          this.newSplitTableDataThree = _.chunk(this.newTableDataThree, this.newPageSizeThree) || [];
          this.newCopyTableDataThree = this.newSplitTableDataThree[this.newCurrenyPageThree - 1];
        }
      },

      async handleDeleteCol(data){
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/collection/delete', {params:{vedioId:data.id,userId:this.userId}});
        let result = response.data;
        console.log("result",result);
        if(response && result) {
          this.$message({message:'取消成功',type:'success',center: true})
          this.newTableData = (this.newTableData||[]).filter(table=>{
            return table.id != data.id;
          })
          this.newCopyTableData =(this.newCopyTableData||[]).filter(table=>{
            return table.id != data.id;
          });
        }else{
          this.$message.error("亲，取消失败，请重新尝试");
        }
      },

      async handleQuery(){
        var typeString ='';
        if(this.categories && this.categories.length>0){
          (this.categories||[]).forEach(type=>{
            typeString = typeString+type.typeName+',';
          })
          let fetch = await Fetch.getFetch();
          let response = await fetch.get('/api/vedio/getByType', {params:{typeString:typeString}});
          let result = response.data.data;
          console.log("type",result);
          if(response && result) {
            this.tableDataOne = result;
            console.log('t',this.tableDataOne)
            this.splitTableDataOne = _.chunk(this.tableDataOne, this.pageSizeOne) || [];
            console.log('t1',this.splitTableDataOne)
            this.copyTableDataOne = this.splitTableDataOne[this.currentPageOne - 1];
            console.log('t2',this.copyTableDataOne)
          }
        }else{
          this.$message.error("亲，分类不能为null");
        }

      },

    },
    mounted() {
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.user = user;

      }
    },
  }
</script>

<style scoped="">
  .avatar-uploader .el-upload {
    border: 1px dashed #b0d9d5;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #9d9788;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 180px;
    height: 180px;
    display: block;
  }

  .icon-wrapper {
    border: 1px dashed #409EFF;
    border-radius: 6px;
  }
</style>
