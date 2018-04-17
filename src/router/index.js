import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import MAIN from '@/pages/main'
import UserProfile from '@/pages/profile'
import CopyLogin from '@/pages/copyLogin'
import MyVedios from '@/pages/myVedios'
import ManagerUser from '@/pages/manager-user'
import ManagerVedio from '@/pages/manager-vedio'
import Player from '@/pages/player'
import Search from '@/pages/search'
import Type from '@/pages/type'

Vue.use(Router)
const Login = resolve => require(['@/pages/Login'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/main',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/main', component: MAIN, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '我的主页',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/myVedios', component: MyVedios, name: '我的主页', menuShow: false},
        {path: '/type', component: Type, name: '视频分类', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '管理',
      menuShow: false,
      iconCls: 'el-icon-printer',
      children: [
        // {path: '/action-manager', component: ActionManager, name: '活动管理', menuShow: true},
        {path: '/manager-user', component: ManagerUser, name: '用户管理', menuShow: true},
        {path: '/manage-vedio', component: ManagerVedio, name: '视频管理', menuShow: true}
      ]

    },
    {
      path: '/',
      component: Home,
      name: '设置',
      menuShow: false,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/profile', component: UserProfile, name: '个人信息', menuShow: true},
      ]
    },
    {
      path: '/',
      component: Home,
      name: '播放视频',
      menuShow: false,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/player', component: Player, name: '播放视频', menuShow: false},
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/copyLogin',
      name: '登录',
      component: CopyLogin
    },
    {
      path: '/',
      component: Home,
      name: '搜索',
      menuShow: false,
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/search', component: Search, name: '搜索', menuShow: false},
      ]
    },
  ]
})
