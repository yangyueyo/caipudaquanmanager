<template>
  <div class="login_container">
    <!-- 登录块 -->
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/cat.png" alt="">
      </div>
      <!-- 表单区域 ref相当于类名  1、添加校验属性  2、编写校验规则
        3、校验的元素 规则对应的标签 进行绑定  前提编写的数据进行动态改变 方式为model+编写的表单对象
      -->
      <el-form ref="loginFormRef" :rules="loginRules" :model="loginForm" class="login_form" label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghu-yuan"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" type="password"></el-input>
        </el-form-item>
<!--        <el-checkbox v-model="checked" class="loginRemenber">记住我</el-checkbox>-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //这是我们的表单数据对象
      loginForm: {
        username: "admin",
        password: "123456",
        code:''
      },
      //验证对象，编写校验规则
      loginRules: {
        //校验用户名规则
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},  //是否是必填项，必填项验证  blur失去焦点
          {min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur'}  //长度验证
        ],
        //校验用户名
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},  //是否是必填项，必填项验证  blur失去焦点
          {min: 6, max: 10, message: '长度在 6 ~ 10 个字符', trigger: 'blur'}  //长度验证
        ],
      },
    };
  },
  methods: {
    //重置表单内容
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    //登录按钮  validate方法
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        //返回一个data数据，将data数据重命名为res
        const {data: res} = await this.$http.post("test", this.loginForm); //访问后台
        console.log(res.usermanager)
        // =是赋值  ==是判断
        if (res === "ok") {
          this.$message.success("操作成功！！！"); //信息跳转
          this.$router.push({path: "/home"});  //页面路由跳转
          window.sessionStorage.setItem("usermanager",res.usermanager);  //存储usermanager对象
        } else {
          this.$message.error("操作失败");  //错误提示
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
//根节点样式
.login_container{
  background-color: #eeaf6d;
  background: url("../assets/loginbeijingtu.jpg");
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  //background-color: #fff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  //根据自己的位置沿着刚才左边的反坐标，以自己的长宽为移动距离，方向为反方向
  transform: translate(-50%,-50%);
  .avatar_box{
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #f6dcc1;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
}
.btns{
  display: flex;
  //跟框收尾对齐排列
  justify-content: flex-end;
}
.login_form{
  position: absolute;
  bottom: 0%;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box; //设置边框
}
</style>