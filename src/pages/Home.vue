<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap" style="color: salmon">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-logos" v-show="!collapsed">
        <!--<a href="/"><img src="../assets/logotxt.png"></a>-->
      </div>
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">美妆</span>
      </div>
      <div style="float: left;
        text-align: left;
        width: 300px;
        margin-left: 10px;
        ">
        <el-input
          clearable
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="search">
        </el-input>
      </div>
      <div class="topbar-account" v-if="name==''">
        <el-button type="info" round  @click="handleLogin">登录</el-button>
        <!--<div @click="handleLogin" style="font-size: 18px;color: #fff;"><span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i></span>登录</div>-->
      </div>
      <div class="topbar-account topbar-btn" v-else>
        <el-dropdown trigger="click">
          <el-button type="info" round><span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{nickName ? nickName:name}}  <i
            class="iconfont icon-down"></i></span></el-button>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--导航菜单-->
        <el-menu :default-active="defaultActiveIndex" router :collapse="collapsed" @select="handleSelect">
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                            :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i><span slot="title" style="color: lightsalmon;">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                          :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i><span slot="title" style="color: white;">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light" style="margin-bottom: 60px">
          <el-col :span="24" class="content-wrapper">
            <!--<transition-group name="fade" mode="out-in">-->
            <!--&lt;!&ndash;<router-view></router-view>&ndash;&gt;-->
            <!--<dash-board></dash-board>-->
            <!--<myBody></myBody>-->
            <!--</transition-group>-->
            <!--<dash-board></dash-board>-->
            <!--<myBody></myBody>-->
            <!--<my-body-middle></my-body-middle>-->
            <!--<my-body-bottom></my-body-bottom>-->
            <router-view></router-view>
          </el-col>
        </div>
      </section>
    </el-col>

    <login :visible.sync="loginVisible"></login>
  </el-row>
</template>

<script>
  //  import DashBoard from './Dashboard.vue'
  //  import myBody from './body-top.vue'
  //  import myBodyMiddle from './body-middle.vue'
  //  import myBodyBottom from './body-bottom.vue'
  import Fetch from '../api/index'
  import MAIN from './main.vue'
  import Login from './Login.vue'
  export default {
    name: 'home',
    components:{MAIN,Login},
    data () {
      return {
        name:'',
        defaultActiveIndex: "0",
        nickName: '',
        collapsed: false,
        loginVisible:false,
        search:'',
      }
    },
    methods: {

      handleLogin(){
        this.loginVisible=true;
      },
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout(){
        this.$confirm('是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          sessionStorage.removeItem('router');
          sessionStorage.removeItem('user')
          this.$router.push('/copyLogin');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '亲，发生了小错误'
          });
        });
      },

      open(title) {
        this.instance = this.$notify({
          title: '提示',
          message: title,
          showClose: false
        });
      },
      close(temp){
//        temp.status='1';
//        console.log('tempclose',temp)
//        let fetch = Fetch.getFetch();
//        let result = fetch.post('/api/message/save',temp);
      },

      closeAll(){
        this.messages=[]
        sessionStorage.setItem('message',JSON.stringify(this.messages));
      },

      async loadMessage(){
        console.log("messjinlai",this.user.id)
        let fetch = Fetch.getFetch();
        let result = await fetch.get('/api/message/getByName',{params:{userId:this.user.id}});
        let temp = result.data.data;
        console.log("temp",temp)
        if(result && temp && temp.length>0){
          this.messages=temp;
          (temp||[]).forEach(temp=>{
            this.open(temp.message)
          })
        }
        this.closeAll();
      },
    },
    created(){
      let user = sessionStorage.getItem('user');
      let message = sessionStorage.getItem('message');
      if (user) {
        user = JSON.parse(user);
        this.user= user;
        this.nickName = user.nickName || '';
        this.name = user.name;
//        if(!message){
//          this.loadMessage();
//        }
        console.log('name',this.name);
      }
      let rout = JSON.parse(sessionStorage.getItem('router'));
      if(rout && rout.length>0){
        console.log('rr',rout)
        this.$router.options.routes = rout;
      }
    },
    mounted() {
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 100px;
      line-height: 100px;
      background: #CB8D62;
      padding: 0px;

      .topbar-btn {
        color: #fff;
      }
      /*.topbar-btn:hover {*/
      /*background-color: #4A5064;*/
      /*}*/
      .topbar-logo {
        float: left;
        width: 100px;
        line-height: 100px;
      }
      .topbar-logos {
        float: left;
        width: 120px;
        line-height: 26px;
      }
      .topbar-logo img, .topbar-logos img {
        height: 40px;
        margin-top: 5px;
        margin-left: 2px;
      }
      .topbar-title {
        float: left;
        text-align: left;
        width: 200px;
        padding-left: 10px;
        border-left: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        padding-left: 10px;
      }
    }
    .main {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      top: 100px;
      bottom: 0px;
      overflow: hidden;
    }

    aside {
      min-width: 50px;
      background: #333744;
      &::-webkit-scrollbar {
        display: none;
      }

      &.showSidebar {
        overflow-x: hidden;
        overflow-y: auto;
      }

      .el-menu {
        height: 100%; /*写给不支持calc()的浏览器*/
        height: -moz-calc(100% - 80px);
        height: -webkit-calc(100% - 80px);
        height: calc(100% - 80px);
        border-radius: 0px;
        background-color: #333744;
        border-right: 0px;
      }

      .el-submenu .el-menu-item {
        min-width: 60px;
      }
      .el-menu {
        width: 180px;
      }
      .el-menu--collapse {
        width: 60px;
      }

      .el-menu .el-menu-item, .el-submenu .el-submenu__title {
        height: 46px;
        line-height: 46px;
      }

      .el-menu-item:hover, .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
        background-color: #7ed2df;
      }
    }

    .menu-toggle {
      background: #4A5064;
      text-align: center;
      color: white;
      height: 26px;
      line-height: 30px;
    }

    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      padding-bottom: 1px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>
