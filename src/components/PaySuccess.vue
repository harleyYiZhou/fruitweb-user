<template>
  <div>
    <!--内容样式-->
    <div id="page">

      <div class="zp_Shopping_cart clearfix">
        <div class="flow_step_no1 Process clearfix" style="margin-top: 20px;g">
          <ul>
            <li class="step_3">1.我的购物车</li>
            <li class="step_2">2.填写核对订单</li>
            <li class="step_1">3.订单提交成功</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div><img src="../assets/common/images/good-or-tick.png" alt=""></div>
      <div class="text1">支付成功</div>
      <el-button type="success" @click="backToIndex">回到首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  
  methods: {
    backToIndex: function(){
      this.$router.push('/');
    },
    payNotify: function(){
      this.$http.post('/api/index/order/notify').then(function(res){
        console.log(res);
      })
    }
  },
  created: function() {
    this.payNotify();
  }
};
</script>
<style sccped>
/* .grid-content {
  padding: 0px 10px;
} */
.container{
  text-align: center;
  padding: 50px 20px;
}
.icon{
  width: 300px;
}
.text1{
  font-size: 25px;
  color: green;
}
</style>
