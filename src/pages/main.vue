<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <section class="chart-container">
        <el-row>
          <el-col :span="8" v-for="item in vedios" :key="item.id">
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
      </section>

    </el-col>
  </el-row>
</template>
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

<script>
  import echarts from 'echarts'
  import Fetch from './../api/index'
  export default {
    data() {
      return {
        currentDate: new Date(),
        chartColumn: null,
        chartBar: null,
        chartLine: null,
        chartPie: null,
        vedios:[],
//        tableData: [],
//        splitTableData: [],
//        copyTableData: [],
//        pageSize: 2,
//        currenyPage: 1,
      };
    },
    methods:{
//      handleSizeChange(val) {
//        this.splitTableData = _.chunk(this.tableData, val) || [];
//        this.copyTableData = this.splitTableData[this.currenyPage - 1];
//      },
//
//      handleCurrentChange(val) {
//        this.currenyPage = val;
//        this.copyTableData = this.splitTableData[this.currenyPage - 1];
//      },

      async loadVedios(){
        let fetch = await Fetch.getFetch();
        let response = await fetch.get('/api/vedio/getHome');
        let result = response.data.data;
        if(response && result){
          this.vedios = result;
        }
      },

      handlePlay(data){
        this.$router.push({path:'/player',query:{data:JSON.stringify(data)}});//类似post传参
      },
    },
    mounted() {
      console.log('aa',JSON.parse(sessionStorage.getItem("role")))
      this.loadVedios();

    }
  }
</script>
