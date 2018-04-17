<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>我的主页</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div style="margin: 30px 80px 30px 80px">
        <el-form label-width="80px">
          <fieldset>
            <legend>我的视频</legend>
            <el-row :gutter="12" style="width: calc(100% - 16px)">
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
                          <el-col :span="12">
                            <el-button type="info" icon="el-icon-edit" round
                                       @click.native.prevent="handlePlay(props.row)">详情
                              <!--<router-link :to="{ name: 'player', params:props.row }">User</router-link>-->
                            </el-button>
                          </el-col>
                          <el-col :span="12">
                            <el-button type="info" icon="el-icon-error" round
                                       @click.native.prevent="handleDeleteMy(props.row)">删除
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

    <el-col :span="24" class="warp-main">
      <div style="margin: 30px 80px 30px 80px">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="上传视频" name="1">
            <el-form ref="form" :model="vedio" label-width="80px" :rules="rules">
              <fieldset>
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="10">
                    <el-form-item label="分类" prop="category">
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
                  <el-col :span="14">
                    <el-form-item label="简介" prop="summary">
                      <el-input v-model="vedio.summary" suffix-icon="el-icon-edit" type="textarea"
                                :rows="3"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="12">
                    <el-form-item label="上传封面" prop="picture">
                      <el-upload
                        class="avatar-uploader"
                        ref="uploadImg"
                        action=""
                        :limit="1"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="onChangesImg"
                        :before-upload="beforeVideoImgUpload">
                        <img v-if="showImg" :src="imageUrl" class="avatar" >
                        <div v-else class="icon-wrapper"><i class="el-icon-plus
                    avatar-uploader-icon"></i></div>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <el-col :span="12">
                    <el-form-item label="上传视频" prop="vedio">
                      <el-upload
                        class="avatar-uploader"
                        ref="uploadVideo"
                        action=""
                        :limit="1"
                        :on-exceed="overLimit"
                        :show-file-list="true"
                        :file-list="vedio.videoFileList"
                        :auto-upload="false"
                        :on-change="onChangesVedio"
                        :before-upload="beforeVideoUpload">
                        <div class="icon-wrapper"><i class="el-icon-plus
                    avatar-uploader-icon"></i></div>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="12" style="width: calc(100% - 16px)">
                  <!--<form id="upload" enctype="multipart/form-data" method="post">-->
                  <!--<input type="button" value="提交" onclick="uploadPic();"/>-->
                  <!--<span class="showUrl"></span>-->
                  <!--<img src="" class="showPic" alt="">-->
                  <!--</form>-->
                  <el-form-item>
                    <el-button type="primary" v-on:click="submitForm('vedio')">上传视频</el-button>
                  </el-form-item>
                </el-row>
              </fieldset>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="我的收藏" name="2">
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <div style="margin-left: 150px">
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
                        type="danger"
                        @click="handlePlay(scope.row)" >播放</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDeleteCol(scope.row)" >取消收藏</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div style="margin-top: 50px;margin-left: 150px">
                <el-pagination
                  @size-change="handleSizeChangeNew"
                  @current-change="handleCurrentChangeNew"
                  :current-page="newCurrenyPage"
                  :page-sizes="[1,2, 3, 4, 5]"
                  :page-size="newPageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="newTableData.length">
                </el-pagination>
              </div>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="我的动态" name="3">
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <div style="margin-left: 150px">
                <el-table
                  :data="newCopyTableDataOne"
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
                  @size-change="handleSizeChangeNewOne"
                  @current-change="handleCurrentChangeNewOne"
                  :current-page="newCurrenyPageOne"
                  :page-sizes="[1,2, 3, 4, 5]"
                  :page-size="newPageSizeOne"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="newTableDataOne.length">
                </el-pagination>
              </div>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="未通过审核" name="4">
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <div style="margin-left: 150px">
                <el-table
                  :data="newCopyTableDataTwo"
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
                            <el-form-item label="未通过原因">
                              <span style="color: darkseagreen;font-size: smaller" class="tt">{{ props.row.description?props.row.description:"暂无原因"
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
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDeleteRef(scope.row)" >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div style="margin-top: 50px;margin-left: 150px">
                <el-pagination
                  @size-change="handleSizeChangeNewTwo"
                  @current-change="handleCurrentChangeNewTwo"
                  :current-page="newCurrenyPageTwo"
                  :page-sizes="[1,2, 3, 4, 5]"
                  :page-size="newPageSizeTwo"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="newTableDataTwo.length">
                </el-pagination>
              </div>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="观看记录" name="5">
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <div style="margin-left: 150px">
                <el-table
                  :data="newCopyTableDataThree"
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
                  @size-change="handleSizeChangeNewThree"
                  @current-change="handleCurrentChangeNewThree"
                  :current-page="newCurrenyPageThree"
                  :page-sizes="[1,2, 3, 4, 5]"
                  :page-size="newPageSizeThree"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="newTableDataThree.length">
                </el-pagination>
              </div>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="我的关注" name="6">
            <el-row :gutter="12" style="width: calc(100% - 16px)">
              <div style="margin-left: 150px">
                <el-table
                  :data="newCopyTableDataFour"
                  style="width: 100%">
                  <el-table-column
                    label="姓名"
                    prop="name"
                    width="280">
                  </el-table-column>
                  <el-table-column
                    label="昵称"
                    prop="nickName"
                    width="280">
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

                  <el-table-column label="操作" fixed="right" width="250">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelet(scope.row)" >取消关注</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div style="margin-top: 50px;margin-left: 150px">
                <el-pagination
                  @size-change="handleSizeChangeNewFour"
                  @current-change="handleCurrentChangeNewFour"
                  :current-page="newCurrenyPageFour"
                  :page-sizes="[1,2, 3, 4, 5]"
                  :page-size="newPageSizeFour"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="newTableDataFour.length">
                </el-pagination>
              </div>
            </el-row>
          </el-collapse-item>
        </el-collapse>
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
        rules: Rule.call(vm, 'form'),
        imgFile: {},
        videoFile: {},
        showImg: false,
        imageUrl: '',
        uploadForm: new FormData(),
        user:{},
        activeName: '2',
        newTableData: [],
        newSplitTableData: [],
        newCopyTableData: [],
        newPageSize: 2,
        newCurrenyPage: 1,
        newTableDataOne: [],
        newSplitTableDataOne: [],
        newCopyTableDataOne: [],
        newPageSizeOne: 2,
        newCurrenyPageOne: 1,
        newTableDataTwo: [],
        newSplitTableDataTwo: [],
        newCopyTableDataTwo: [],
        newPageSizeTwo: 2,
        newCurrenyPageTwo: 1,
        newTableDataThree: [],
        newSplitTableDataThree: [],
        newCopyTableDataThree: [],
        newPageSizeThree: 2,
        newCurrenyPageThree: 1,
        newTableDataFour: [],
        newSplitTableDataFour: [],
        newCopyTableDataFour: [],
        newPageSizeFour: 2,
        newCurrenyPageFour: 1,
      }
    },
    methods: {
      onChangesImg(file, fileList) {
        console.log(file);
        let isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          this.$message.error('上传视频封面图片大小不能超过 1MB!');
          return false;
        }
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log("url",this.imageUrl)
        this.showImg = true;
        return isLt2M;
      },

      onChangesVedio(file, fileList) {
        console.log(file);
        let isLt2M = file.size / 1024 / 1024 < 1000;
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 1GB!');
          return false;
        }
        return isLt2M;
      },

      overLimit() {
        let sel = this;
        sel.$message.error('仅能上传一个文件');
      },

      beforeVideoImgUpload(file) {
        this.imgFile = file;
        this.uploadForm.append('imgFile', file);
      },

      beforeVideoUpload(file) {
        this.videoFile = file;
        this.uploadForm.append('videoFile', file);
      },

      async submitForm(formName) {
        console.log("this.categories",this.categories);
        var categories='';
        for (let i=0;i<this.categories.length;i++){
          if(i==this.categories.length -1){
            categories+= this.categories[i].id;
          }else{
            categories+= this.categories[i].id+',';
          }
        }
        console.log("categories",categories)
        let sel = this;
        this.uploadForm.append('name', this.vedio.name);
        this.uploadForm.append('categories', categories);
        this.uploadForm.append('summary', this.vedio.summary);
        this.uploadForm.append('userId',this.user.id);
        this.$refs.uploadImg.submit();  // 提交时触发了before-upload函数
        this.$refs.uploadVideo.submit();   // 提交时触发了before-upload函数
        let fetch = await Fetch.getFetch();
        let response = await fetch.post('/api/vedio/addVideo', this.uploadForm);
        let result = response.data;
        if(response && result){
          this.$message({message:'上传成功，请等待审核',type:'success',center: true})
          this.categories=[];
          this.vedio={};
          this.imageUrl='';
        }else{
          this.$message.error("上传失败，请重新尝试");
        }
      },

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

      handleCurrentChangeNew(val) {
        this.newCurrenyPage = val;
        this.newCopyTableData = this.newSplitTableData[this.newCurrenyPage - 1];
      },

      handleSizeChangeNew(val) {
        this.newSplitTableData = _.chunk(this.newTableData, val) || [];
        this.newCopyTableData = this.newSplitTableData[this.newCurrenyPage - 1];
      },

      handleCurrentChangeNewOne(val) {
        this.newCurrenyPageOne = val;
        this.newCopyTableDataOne = this.newSplitTableDataOne[this.newCurrenyPageOne - 1];
      },

      handleSizeChangeNewOne(val) {
        this.newSplitTableDataOne = _.chunk(this.newTableDataOne, val) || [];
        this.newCopyTableDataOne = this.newSplitTableDataOne[this.newCurrenyPageOne - 1];
      },

      handleCurrentChangeNewTwo(val) {
        this.newCurrenyPageTwo = val;
        this.newCopyTableDataTwo = this.newSplitTableDataTwo[this.newCurrenyPageTwo - 1];
      },

      handleSizeChangeNewTwo(val) {
        this.newSplitTableDataTwo = _.chunk(this.newTableDataTwo, val) || [];
        this.newCopyTableDataTwo = this.newSplitTableDataTwo[this.newCurrenyPageTwo - 1];
      },

      handleCurrentChangeNewThree(val) {
        this.newCurrenyPageThree = val;
        this.newCopyTableDataThree = this.newSplitTableDataThree[this.newCurrenyPageThree - 1];
      },

      handleSizeChangeNewThree(val) {
        this.newSplitTableDataThree = _.chunk(this.newTableDataThree, val) || [];
        this.newCopyTableDataThree = this.newSplitTableDataThree[this.newCurrenyPageThree - 1];
      },

      handleCurrentChangeNewFour(val) {
        this.newCurrenyPageFour = val;
        this.newCopyTableDataFour = this.newSplitTableDataFour[this.newCurrenyPageFour - 1];
      },

      handleSizeChangeNewFour(val) {
        this.newSplitTableDataFour = _.chunk(this.newTableDataFour, val) || [];
        this.newCopyTableDataFour = this.newSplitTableDataFour[this.newCurrenyPageFour - 1];
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

      async loadMyVedio(){
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/vedio/getByUser', {params:{id:this.user.id}});
        let result = response.data.data;
        if(response && result) {
          this.tableData = result;
          this.splitTableData = _.chunk(this.tableData, this.pageSize) || [];
          this.copyTableData = this.splitTableData[this.currenyPage - 1];
        }
      },

      handlePlay(data){
        this.$router.push({path:'/player',query:{data:JSON.stringify(data)}});//类似post传参
      },

      async loadCollect(){
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/vedio/getCollect', {params:{id:this.user.id}});
        let result = response.data.data;
        console.log("result",result);
        if(response && result) {
          this.newTableData = result;
          this.newSplitTableData = _.chunk(this.newTableData, this.newPageSize) || [];
          this.newCopyTableData = this.newSplitTableData[this.newCurrenyPage - 1];
        }
      },

      async loadConcern(){
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/vedio/getConcern', {params:{id:this.user.id}});
        let result = response.data.data;
        console.log("concern",result);
        if(response && result) {
          this.newTableDataOne = result;
          this.newSplitTableDataOne = _.chunk(this.newTableDataOne, this.newPageSizeOne) || [];
          this.newCopyTableDataOne = this.newSplitTableDataOne[this.newCurrenyPageOne - 1];
        }
      },

      async loadRefuse(){
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/vedio/getRefuse', {params:{id:this.user.id}});
        let result = response.data.data;
        if(response && result) {
          this.newTableDataTwo = result;
          this.newSplitTableDataTwo = _.chunk(this.newTableDataTwo, this.newPageSizeTwo) || [];
          this.newCopyTableDataTwo = this.newSplitTableDataTwo[this.newCurrenyPageTwo - 1];
        }
      },

      async handleDeleteMy(data){
        console.log('data',data);
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/vedio/delete', {params:{id:data.id}});
        let result = response.data;
        console.log("result",result);
        if(response && result) {
          this.$message({message:'下架成功',type:'success',center: true})
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

      async handleDeleteRef(data){
        console.log('data',data);
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/vedio/delete', {params:{id:data.id}});
        let result = response.data;
        console.log("result",result);
        if(response && result) {
          this.$message({message:'下架成功',type:'success',center: true})
          this.newTableDataTwo = (this.newTableDataTwo||[]).filter(table=>{
            return table.id != data.id;
          })
          this.newCopyTableDataTwo =(this.newCopyTableDataTwo||[]).filter(table=>{
            return table.id != data.id;
          });
        }else{
          this.$message.error("亲，下架失败，请重新尝试");
        }
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

      async handleLoadConcernUser(){
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/user/getConcernUser', {params:{id:this.user.id}});
        let result = response.data;
        console.log('concern',result);
        if(response && result) {
          this.newTableDataFour = result;
          this.newSplitTableDataFour = _.chunk(this.newTableDataFour, this.newPageSizeFour) || [];
          this.newCopyTableDataFour = this.newSplitTableDataFour[this.newCurrenyPageFour - 1];
        }
      },

      async handleDelet(data){
        console.log('data',data);
        let fetch  = Fetch.getFetch();
        let response = await fetch.get('/api/concern/delete',{params:{userId:this.user.id,concernId:data.id}})
        let result = response.data;
        if(response && result) {
          this.$message({message:'取消成功',type:'success',center: true})
          this.newTableDataFour = (this.newTableDataFour||[]).filter(table=>{
            return table.id != data.id;
          })
          this.newCopyTableDataFour =(this.newCopyTableDataFour||[]).filter(table=>{
            return table.id != data.id;
          });
        }else{
          this.$message.error("亲，取消失败，请重新尝试");
        }
      },

    },
    mounted() {
      let user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.user = user;
        this.loadMyVedio();
        this.loadCollect();
        this.loadConcern();
        this.loadRefuse();
        this.handleLoadWatch();
        this.handleLoadConcernUser();
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
