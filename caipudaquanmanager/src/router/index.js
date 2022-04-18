import Vue from 'vue'
import VueRouter from 'vue-router'
//引入login组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import caiPuManagement from '../components/admin/caiPuManagement.vue'
import fenLeiManagement from '../components/admin/fenLeiManagement.vue'
import shouCangManagement from '../components/admin/shouCangManagement.vue'
import UserManagement from '../components/admin/UserManagement.vue'
import Welcome from "../components/Welcome.vue";

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component:Login,
  },
  {
    path:"/home",
    component:Home,
    redirect:"/welcome",  //重定向到welcom页面
    children:[
      {
        path:"/welcome",
          component:Welcome
      },
      {
        path:"/caipu",
        name:"菜谱管理",
        component:caiPuManagement
      },
      {
        path:"/fenlei",
        name:"类型管理",
        component:fenLeiManagement
      },
      {
        path:"/user",
        name:"用户管理",
        component:UserManagement
      },
      {
        path:"/shoucang",
        name:"收藏管理",
        component:shouCangManagement
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// //挂载路由导航守卫
// router.beforeEach((to,from,next)=>{
//   //to 将要访问
//   //from  从哪访问
//   //next 接着干的事  next(url) 跳转活重定向到url上  next(为空) 继续访问to的路径
//   if (to.path=='login') return next()
//   //获取usermanager
//   const userFlag = window.sessionStorage.getItem("uesrmanager"); //取出当前用户
//   if(!userFlag)return next('/login'); //无值返回登录页
//   next(); //符合要求，继续访问
// })

export default router //暴露出去
