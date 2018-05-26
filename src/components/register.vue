<template>
  <div>
    <div id="rgister">
      <div class="web_Center clearfix">
        <div class="AD_img left"><img src="../assets/common/images/bg_img_07.png" /></div>
        <div class="rgister-form right">
          <div class="rgister-name">
            <h1 class="name">用户注册</h1>
            <span class="login_link">
              <a href="login.html">
                <b></b>用户登陆</a>
            </span>
          </div>
          <div class="form clearfix">
            <div class="item item-fore1">
              <label for="loginname" class="login-label name-label"></label><input name="" type="text" class="text" placeholder="请输入用户" />
              <el-button type="primary" round size="small" style="float: right;margin-top: 10px;">发送验证码</el-button>
            </div>
            <div class="item item-fore2" style="border:none;margin-top: -30px;"></div>
            <div class="item item-fore2" >
              <label for="nloginpwd" class="login-label pwd-label" ></label><input name="" type="password" class="text" placeholder="用户密码" />
            </div>
            <div class="item item-fore2">
              <label for="nloginpwd" class="login-label pwd-label"></label><input name="" type="password" class="text" placeholder="确认密码" />
            </div>
            <div class="item item-fore3">
              <label for="nloginpwd" class="login-label vfd-label"></label><input name="" type="text" class="Verified" placeholder="验证码" />
            </div>
            <div class="right"><img src="common/images/yzm_img_03.png" /></div>
          </div>
          <div class="login-btn">
            <a href="javascript:;" class="btn_login">注&nbsp;&nbsp;&nbsp;&nbsp;册</a>
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
    return {};
  }
};
</script>
<style >

</style>
