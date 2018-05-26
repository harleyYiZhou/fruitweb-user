<template>
  <div>
    <!--用户中心-->
    <div id="user" class="clearfix">
      <div class="us_Position">
        <div class="left">
          <em></em>
        </div>
        <div class="left">
          <a href="#">首页</a> >
          <a href="#">用户中心</a>
        </div>
      </div>
      <!--菜单栏-->
      <div class="left_style">
        <div class="user_title">
          <em></em>用户中心</div>
        <!--栏目名称-->
        <div class="user_Column">
          <ul class="Column_list">
            <div class="title_name">
              <em></em>会员中心</div>
            <li>
              <router-link to="/userCenter">
                &lt;
                <a href="#">用户首页</a>
              </router-link>
            </li>
            <li>
              <router-link to="/userCenter/userInfo">
                &lt;
                <a href="#">用户基本信息</a>
              </router-link>
            </li>
          </ul>
          <ul class="Column_list Order">
            <div class="title_name">
              <em></em>订单中心</div>
            <li>
              &lt;
              <a  @click="toOrder(0)">未付款订单</a>
            </li>
            <li>
              &lt;
              <a @click="toOrder(1)">未发货订单</a>
            </li>
            <li>
              &lt;
              <a @click="toOrder(2)">未收获订单</a>
            </li>
            <li>
              &lt;
              <a @click="toOrder(3)">已完成订单</a>
            </li>
            <li>
              &lt;
              <a @click="toOrder(4)">已评价订单</a>
            </li>
          </ul>
        </div>
      </div>
      <!--内容展示-->
      <div class="right_style">
        <div class="Notice">
          <em></em>
          <span>系统最新公告:</span>为了更好地服务于【每日鲜】的会员朋友及读者 发表意见。</div>
        <div class="user_content clearfix">
          <!--用户-->
          <div class="user_name_info">
            <ul>
              <li class="us_one">
                <div class="name left">用户名:
                  <b>{{userInfo.nickname}}</b>欢迎你</div>
              </li>
              <li class="us_two">
                <dl>
                  <dt class="left">等级：</dt>
                  <dd>
                    <b>普通会员</b>
                  </dd>
                </dl>
              </li>
              <li class="us_two">
                <dl style="width: 300px;">
                  <dt class="left">手机号码：</dt>
                  <dd>
                    <b>{{userInfo.telphone}}</b>
                  </dd>
                </dl>
              </li>
              <li class="us_four">
                <div class="ratings left">
                  <span class="left">账户安全等级：</span>
                  <span class="ratings_tiao"></span>
                  <span class="left gao">高</span>
                </div>
                <div class="right time">
                  <span>注册时间：{{userInfo.register_time}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--订单-->
        <div class="clearfix">
          <div class="us_Orders left clearfix" style="width: 100%;">
            <el-table :data="allOrder" style="width: 100%">
              <el-table-column prop="trade_no" label="订单编号">
              </el-table-column>
              <el-table-column prop="total_price" label="订单总额">
              </el-table-column>
              <el-table-column prop="address" label="取货方式" :formatter="formatShipType">
              </el-table-column>
              <el-table-column prop="order_status" label="订单状态" :formatter="formatType">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- <div class="Orders_name">
              <div class="title_name">
                <div class="Records">购买记录</div>
                <div class="right select">
                  <select size="1">
                    <option value="1">最近一个月</option>
                  </select>
                </div>
              </div>
            </div> -->
            <!-- <table>
              <thead>
                <tr>
                  <th>产品名称</th>
                  <th>数量</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="img">
                    <a href="#">
                      <span class="left"><img src="common/images/cp-2.jpg" /></span>
                      <span class="left">产品名称敬龙云</span>
                    </a>
                  </td>
                  <td>2</td>
                  <td>完成</td>
                  <td>
                    <a href="#">查看</a>
                  </td>
                </tr>
                <tr>
                  <td class="img">
                    <a href="#">
                      <span class="left"><img src="common/images/cp-2.jpg" /></span>
                      <span class="left">产品名称敬龙云</span>
                    </a>
                  </td>
                  <td>2</td>
                  <td>完成</td>
                  <td>
                    <a href="#">查看</a>
                  </td>
                </tr>
              </tbody>
            </table> -->
            <div class="us_jls">共2条记录</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      allOrder: []
    };
  },
  
  created: function() {
    this.getUserInfo();
    this.getAllOrder();
  },
  methods: {
    formatType: function (row,column) { 
      return row.order_status==0 ? "未接单" : row.order_status==1 ? "未发货" : row.order_status==2 ? "待收货" : row.order_status==3 ? "已完成" : row.order_status==4 ? "退货退款中" : row.order_status==5 ? "已取消" : row.order_status==6 ? "已评论" :"未知";
    },
    formatShipType: function(row,column){
      let address=JSON.parse(row.address);
      return address.type==0? "上门自提" :address.type==1? "同城配送" :"未知";
    },
    getUserInfo: function() {
      var that = this;
      let para = {};
      this.$http.post("/api/user/user/getUserInfo", para).then(function(res) {
        if (res.data.code === 200) {
          that.userInfo = res.data.user;
        } else {
        }
      });
    },
    getAllOrder: function() {
      var that = this;
      let para = {};
      this.$http
        .post("/api/index/order/getUserOrder", para)
        .then(function(res) {
          if (res.data.code === 200) {
            that.allOrder = res.data.orders;
          } else {
          }
        });
    },
    toOrder: function(type){
      this.$store.dispatch("setOrderType",type);
      this.$router.push('/userCenter/order');
    }
  }
};
</script>
<style sccped>
/* .grid-content {
  padding: 0px 10px;
} */
</style>
