<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>我的主页</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <div style="margin: 30px 80px 30px 80px">
        <el-form label-width="80px">
          <fieldset>
            <legend>我的视频</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <div>
                <el-table
                  :data="vediosData"
                  style="width: 100%">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-row :gutter="12" style="width: calc(100% - 16px)">
                          <el-col :span="24">
                            <el-form-item label="活动概述">
                              <span style="color: #e68a00" class="tt">{{ props.row.summary }}</span>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="12" style="width: calc(100% - 16px)">
                          <el-col :span="24">
                            <el-form-item label="活动内容">
                              <span style="color: darkseagreen;font-size: smaller" class="tt">{{ props.row.content }}</span>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="12" style="width: calc(100% - 16px)">
                          <el-col :span="8">
                            <el-button type="info" icon="el-icon-edit" round @click.native.prevent="handleRead(props.row)">详情</el-button>
                          </el-col>
                          <el-col :span="8">
                            <el-button type="info" icon="el-icon-success" round @click.native.prevent="handleApprove(props.row)">通过</el-button>
                          </el-col>
                          <el-col :span="8">
                            <el-button type="info" icon="el-icon-error" round @click.native.prevent="handleRefuse(props.row)">拒绝</el-button>
                          </el-col>
                        </el-row>

                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="举办方"
                    prop="holder"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="活动名"
                    prop="actionName"
                    width="400">
                  </el-table-column>
                  <el-table-column
                    label="举办地"
                    prop="address"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    label="举办时间"
                    prop="startdate"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="终止时间"
                    prop="enddate"
                    width="180">
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
            </el-row>
          </fieldset>
        </el-form>
      </div>
    </el-col>

    <el-col :span="24" class="warp-main" >
      <div style="margin: 30px 80px 30px 80px">
        <el-form ref="form" :model="vedio" label-width="80px" :rules="rules">
          <fieldset>
            <legend>上传视频</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="分类" prop="name">
                  <el-tag v-for="category in categories"
                          size="medium"
                          closable
                          :key="category.id"
                          style="margin-left:10px"
                          @close="handleCategoryClose(category)">
                    {{category.typeName}}
                  </el-tag>
                  <br/>
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
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="10">
                <el-form-item label="视频名" prop="name">
                  <el-input v-model="vedio.name" suffix-icon="el-icon-edit"></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="12">
                <el-form-item label="简介" prop="summary">
                  <el-input v-model="vedio.summary" suffix-icon="el-icon-edit" type="textarea"
                            :rows="3"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <el-col :span="12">
                <el-form-item label="上传图片" prop="picture">
                  <!--<el-upload-->
                    <!--drag-->
                    <!--class="video-img"-->
                    <!--:file-list="ruleForm.videoImgList"-->
                    <!--ref="uploadImg"-->
                    <!--action=""-->
                    <!--:show-file-list="true"-->
                    <!--:auto-upload="false"-->
                    <!--:limit="1"-->
                    <!--:on-exceed="overLimit"-->
                    <!--:before-upload="beforeVideoImgUpload">-->
                    <!--<i class="el-icon-plus"></i>-->
                    <!--<i class="avatar-uploader-icon"></i>-->
                    <!--<div class="el-upload__tip">* 请点击此区域为选择一张图片作为视频封面</div>-->
                    <!--<div class="el-upload__tip">* 上传图片只能是 JPG 格式!</div>-->
                    <!--<div class="el-upload__tip">* 上传图片大小不能超过 2MB!</div>-->
                  <!--</el-upload>-->
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :auto-upload="false"
                    :before-upload="beforeVideoImgUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <form id="upload" enctype="multipart/form-data" method="post">
                <input type="file" name="file" id="pic"/>
                <input type="button" value="提交" onclick="uploadPic();"/>
                <span class="showUrl"></span>
                <img src="" class="showPic" alt="">
              </form>
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
    data(){
      const vm =this;
      return{
        vedio:{},
        vediosData:[],
        tableData:[],
        splitTableData:[],
        copyTableData:[],
        pageSize:2,
        currenyPage:1,
        categories:[],
        types:[],
        newType:{},
        rules:Rule.call(vm, 'form'),
        ruleForm: {
          name: '',
          type: '',
          desc: '',
          videoImgList: [],
          //videoFileList: []
        },
        imageUrl:'',
      }
    },
    methods:{
      overLimit() {
        let sel = this;
        sel.$message.error('上传数量为1');
      },
      beforeVideoImgUpload(file) {
        console.log(file);
        let sel = this;
        this.imgFile = file;
        let isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          sel.$message.error('上传视频封面图片大小不能超过 1MB!');
          return false;
        }
        this.uploadForm.append('imgFile', file);
        this.imageUrl = URL.createObjectURL(file.raw);
        return isLt2M;
      },



















      handleSizeChange(val) {
        this.splitTableData =_.chunk(this.tableData,val)||[];
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },
      handleCurrentChange(val) {
        this.currenyPage =val;
        this.copyTableData =this.splitTableData[this.currenyPage-1];
      },
      handleCategoryClose(val){
        console.log("jin")
          console.log("val",val);
//        _.remove((this.categories||[]),category=>{
//          return category.id == val.id;
//        })
        this.categories = (this.categories||[]).filter(category=>{
          return category.id != val.id;
        })
      },

      isTypeDisabled(item) {
        if (this.categories.find((e) => e.id === item.id)) return true;
        return false;
      },

      handleAddType() {
        if (this.newType) {
          var temp = {};
          (this.types||[]).forEach(type=>{
            if(type.id == this.newType){
              temp = type;
            }
          })
          console.log("copy",temp)
          this.categories.push(temp);
          this.newType = {};
        }
      },

      async loadTypeList(){
        let fetch  = Fetch.getFetch();
        let result = await fetch.get('/api/type/list');
        this.types = result.data;
      },

      handleTypeChange(val) {
        if (val) {
          let newCategory = this.types.find((e) => e.id === val.id);
          this.newCategory = newCategory;
        }
      },

    },
    mounted(){
    },
  }
</script>
