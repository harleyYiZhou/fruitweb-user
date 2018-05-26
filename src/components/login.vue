<template>
  <div>
    <div id="rgister">
      <div class="web_Center clearfix">
        <div class="AD_img left"><img src="../assets/common/images/bg_img_07.png" /></div>
        <div class="rgister-form right">
          <div class="rgister-name">
            <h1 class="name">用户登陆</h1>
            <span class="login_link">
              <a href="login.html">
                <b></b>用户注册</a>
            </span>
          </div>
          <div class="form clearfix">
            <div class="item item-fore1" style="margin-bottom: 50px;">
              <label for="loginname" class="login-label name-label"></label><input name="" type="text" class="text" placeholder="请输入用户" v-model="phone" />
              <el-button type="primary" round size="small" @click="sendCheckCode" style="float: right;margin-top: 10px;">发送验证码</el-button>
            </div>
            <!-- <div class="item item-fore2">
              <label for="nloginpwd" class="login-label pwd-label"></label><input name="" type="password" class="text" placeholder="请输入密码" />
            </div> -->
            <div class="item item-fore2">
              <label for="nloginpwd" class="login-label vfd-label"></label><input name="" type="text" class="Verified" placeholder="手机验证码" v-model="phoneCode" />
            </div>
            <div class="right"><img src="common/images/yzm_img_03.png" /></div>
          </div>
          <div class="login-btn">
            <a href="#" class="btn_login" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      phone: null,
      phoneCode: null
    };
  },
  methods: {
    login: function(){
      var that=this;
      let para={
        phone:this.phone,
        code: this.phoneCode
      }
      this.$http.post('/api/user/user/login',para).then(function(res){
        if(res.data.code===200){
          that.$message({
            message: '登录成功',
            type:"success"
          });
          localStorage.setItem('user',that.phone);
          window.location.assign("index.html");
          // that.$route.path="/index";
        }else{
          that.$message({
            message: res.data.msg,
            type:"error"
          });
        }
      })
      
    },
    sendCheckCode: function(){
      var that=this;
      let para={
        phone: this.phone
      };
      this.$http.post('/api/user/user/sendCheckCode',para).then(function(res){
        // if(res.data.code===200){
            that.$message({
              message: '发送成功',
              msg: 'success'
            })
        // }else{
        //   that.$message({
        //       message: '发送失败',
        //       msg: 'error'
        //     })
        // }
      });
    }
  }
};
</script>
<style >

</style>
