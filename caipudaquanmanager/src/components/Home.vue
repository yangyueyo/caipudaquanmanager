<template>
  <!--  引入container布局-->
  <el-container class="home-container">
    <!--头部---------------------------------->
    <el-header>
      <div>
        <img src="../assets/cat.png" alt>
        <span>菜谱大全后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">安全退出</el-button>
    </el-header>
    <!--主体部分-->
    <el-container>
      <!--侧边栏--------------------------------->
      <el-aside width="200px">
        <el-menu  background-color="#f5dfbf" text-color="#000" active-text-color="#df5c2a"
        :router="true" :default-active="activePath">
          <!--一级菜单-->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">{{ item.title }}</template>
              <!--二级菜单-->
              <el-menu-item :index="it.path+''" v-for="it in item.sList" :key="it.id">
                <template slot="title">{{ it.title }}</template>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList:[
          {
        "id":10,
        "path":"/home",
        "title":"菜谱管理",
        sList:[{
          "id":11,
          "path":"/caipu",
          "title":"菜谱管理",
        }]
      },{
          "id":20,
          "path":"/home",
          "title":"类型管理",
          sList:[{
            "id":21,
            "path":"/fenlei",
            "title":"类型管理",
          }]
        },{
          "id":30,
          "path":"/home",
          "title":"用户管理",
          sList:[{
            "id":31,
            "path":"/user",
            "title":"用户管理",
          }]
        },{
          "id":40,
          "path":"/home",
          "title":"收藏管理",
          sList:[{
            "id":41,
            "path":"/shoucang",
            "title":"收藏管理",
          }]
        },
      ],
      activePath:'/welcome', //默认路径
    }
  },
  //相当于onload事件
  created(){
    //查询menuList
  },
  methods: {
    //安全退出
    logout() {
      window.sessionStorage.clear(); //清除session
      this.$router.push("/") //回到登录页面
    },
  }
}
</script>

<style lang="less" scoped>
//布局器样式
.home-container {
  height: 100%;
}

//头部的样式
.el-header {
  background-color: #F4A460;
  display: flex;
  justify-content: space-between; //左右贴边
  padding-left: 0%; //左边界
  color: #ffffff;
  font-size: 30px;
  align-items: center;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }

}

//侧边栏的样式
.el-aside {
  background-color: #f5dfbf;
  .el-menu{
    border-right: none;
    .el-submenu{
      .title{
        font-size: 30px;
      }
    }
  }
}

//主体样式
.el-main {
  background-color: #FDF5E6;
  .el-menu{

  }
}

img {
  width: 65px;
  height: 65px;
}
</style>