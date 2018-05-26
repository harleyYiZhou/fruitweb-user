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
          <a href="#">用户中心</a>>
          <a href="#">{{orderNav}}</a>
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
                <a >用户首页</a>
              </router-link>
            </li>
            <li>
              <router-link to="/userCenter/userInfo">
                &lt;
                <a >用户基本信息</a>
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
                  <el-button size="small" v-if="orderType===0" @click="handleOperate(scope.$index, scope.row)">付款</el-button>
                  <el-button size="small" v-if="orderType===1" @click="handleOperate(scope.$index, scope.row)">发货</el-button>
                  <el-button size="small" v-if="orderType===2" @click="handleOperate(scope.$index, scope.row)">确认收货</el-button>
                  <el-button size="small" v-if="orderType===3" @click="handleOperate(scope.$index, scope.row)">评价</el-button>
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                  <!-- <el-button size="small" v-if="row.order_status===0" @click="handleEdit(scope.$index, scope.row)">详情</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            
            <div class="us_jls">共2条记录</div>
          </div>

        </div>
      </div>
    </div>
    <!--编辑界面-->
    <el-dialog title="订单详情" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-row>
        <el-col :span="6">
          <div class="grid-content ">订单id</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content ">{{editForm.oid}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content ">交易订单号</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content ">{{editForm.trade_no}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content">商品名称</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content ">{{editForm.goods}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content">总价</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content ">{{editForm.total_price}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content ">配送方式</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content">{{editForm.type}}</div>
        </el-col>
      </el-row>
      <el-row v-if="editForm.address.info.name">
        <el-col :span="6">
          <div class="grid-content ">收货人</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content ">{{editForm.address.info.name}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content">联系方式</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content ">{{editForm.address.info.phone}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content ">地址</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content ">{{editForm.address.info.addr}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content">订单状态</div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content ">{{editForm.order_status}}</div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      allOrder: [],
      editFormVisible: false, //编辑界面是否显示
      editForm: {
        oid: 0,
        mid: 0,
        order_status: '',
        total_price: "",
        trade_no: '',
        user_id: '',
        goods: "wu",
        address: {
          type: 0,
          info: {
            phone:'',
            addr: ''
          }
        }
      },
    };
  },
  computed: {
    orderType: function(){
      return this.$store.getters.getOrderType;
    },
    orderNav: function(){
      if(this.orderType===0){
        return "未付款订单"
      }
      else if(this.orderType===1){
        return "未发货订单"
      }
      else if(this.orderType===2){
        return "未收货订单"
      }
      else if(this.orderType===3){
        return "已完成订单"
      }
      else if(this.orderType===4){
        return "已评价订单" 
      }else{
        return "所有订单"
      }
    }
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
      let para = {
        type: this.orderType
      };
      let options={};
      let loadingInstance=this.$loading(options);
      this.$http
        .post("/api/index/order/getUserOrder", para)
        .then(function(res) {
          if (res.data.code === 200) {
            loadingInstance.close();
            that.allOrder = res.data.orders;
          } else {
          }
        });
    },
    toOrder: function(type){
      this.$store.dispatch("setOrderType",type);
      this.getAllOrder();
    },
    handleOperate: function(index,row){

    },
    handleEdit: function(index, row) {
      var that=this;
      that.editFormVisible = true;
      
      this.$http.post('/api/index/order/getOrderGoodsList',{oid: row.oid}).then(function (res) { 
        // that.editForm.goods=res;
        that.editForm = Object.assign({}, row);
        let address=JSON.parse(row.address);
        that.editForm.goods="";
        that.editForm.address=address;
        that.editForm.type=address.type==0? "上门自提" :address.type==1? "同城配送" :"未知";
        that.editForm.order_status=row.order_status==0 ? "未接单" : row.order_status==1 ? "未发货" : row.order_status==2 ? "待收货" : row.order_status==3 ? "已完成" : row.order_status==4 ? "退货退款中" : row.order_status==5 ? "已取消" : row.order_status==6 ? "已评论" :"未知";
          console.log(that.editForm.goods);
        for(var i=0;i<res.data.list.length;i++){
          that.editForm.goods=that.editForm.goods+''+res.data.list[i].goods_name+"*"+res.data.list[i].goods_count
        }
        that.editFormVisible = true;
      })
    },
  }
};
</script>
<style sccped>
/* .grid-content {
  padding: 0px 10px;
} */
</style>
