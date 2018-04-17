<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item ><b>搜索</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <section class="chart-container">
        <el-row>
          <el-col :span="8" v-for="item in copyVedios" :key="item.id">
            <el-card :body-style="{ padding: '0px' }" style="height: 400px">
              <a @click="handlePlay(item)">
                <img :src="item.pictureUrl" class="image" height="350px">
                <div style="padding: 14px;">
                  <span>{{item.name}}</span>
                </div>
              </a>
            </el-card>
          </el-col>
        </el-row>

        <el-col>
          <div style="margin-top: 50px;margin-left: 150px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[3, 6, 9]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="vedios.length">
            </el-pagination>
          </div>
        </el-col>
      </section>

    </el-col>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  import Fetch from './../api/index'
  import _ from 'lodash';
  export default {
    data() {
      return {
        vedios:[],
        tableData: [],
        splitTableData: [],
        copyTableData: [],
        pageSize: 2,
        currentPage: 1,
        search:'',
        copyVedios:[],
      };
    },
    methods:{
      handleSizeChange(val) {
        console.log('jinl',val);
        console.log('vv',this.vedios);
        this.splitTableData = _.chunk(this.vedios, val) || [];
        console.log('spli',this.splitTableData);
        console.log('pa',this.currentPage);
        this.copyVedios = this.splitTableData[this.currentPage - 1];
        console.log('cop',this.copyVedios)
      },

      handleCurrentChange(val) {
        this.currentPage = val;
        this.copyVedios = this.splitTableData[this.currentPage - 1];
      },

      async loadSearch(){
        let fetch = await Fetch.getFetch();
        //let response = await fetch.get('/api/vedio/select',{params:{name:this.name}});
        let response = await fetch.get('/api/vedio/search',{params:{keyString:this.search}});
        let result = response.data.data;
        console.log('result',result);
        if(response && result){
          this.vedios = result;
          this.splitTableData = _.chunk(this.vedios, this.pageSize) || [];
          this.copyVedios = this.splitTableData[this.currentPage - 1];
        }
      },


      handlePlay(data){
        this.$router.push({path:'/player',query:{data:JSON.stringify(data)}});//类似post传参
      },
    },
    mounted() {
      let search = this.$route.query.search;
      if(search){
        this.search = search;
        this.loadSearch();
      }else{
        this.$message.error("数据被怪兽吃掉了，请重新尝试");
      }
      //this.loadVedios();

    }
  }
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }
</style>
