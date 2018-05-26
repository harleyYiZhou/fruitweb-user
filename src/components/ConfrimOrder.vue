<template>
  <div>
    <!--内容样式-->
    <div id="page">

      <div class="zp_Shopping_cart clearfix">
        <div class="flow_step_no1 Process clearfix" style="margin-top: 20px;g">
          <ul>
            <li class="step_2">1.我的购物车</li>
            <li class="step_1">2.填写核对订单</li>
            <li class="step_3">3.订单提交成功</li>
          </ul>
        </div>

        <div class="Shopping_list">
          <!-- <div class="title_name">
            <ul>
              <li class="checkbox">&nbsp;</li>
              <li class="name">商品名称</li>
              <li class="bdj">本店价</li>
              <li class="sl">购买数量</li>
              <li class="xj">小计</li>
              <LI class="cz">操作</LI>
            </ul>
          </div> -->
          <div class="shopping">

            <div class="content">
              <div class="shippingType">
                配送方式：
                <el-radio v-model="radio" label="1">送货上门</el-radio>
                <el-radio v-model="radio" label="2">上门自提</el-radio>
              </div>
              <!-- 选择送货地址 -->
              <div v-if="radio==='1'" class="address">
                <p class="address_title">配送地址： </p>
                <el-radio style="height: auto" v-for="(item,index) in address" v-model="radio7" :label="item" border>
                  <div>
                    <p>{{item.address}}</p>
                    <p>{{item.username}}</p>
                    <p>{{item.telphone}}</p>
                  </div>
                </el-radio>

                <!-- <el-radio style="height: auto" v-model="radio7" label="2" border>
                  <div>
                    <p>广东省 湛江市 麻章区 广东海洋大学</p>
                    <p>harley</p>
                    <p>13413645389</p>
                  </div>
                </el-radio> -->
              </div>
              <!-- 连锁店地址信息 -->
              <div v-if="radio==='2'" class="shopInfo">
                <p class="address_title">连锁店信息： </p>
                <!-- <div class="message"> -->
                <el-row>
                  <el-col :span="4">连锁店店名：</el-col>
                  <el-col :span="16" :offset="4">{{shopInfo.shopName}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">手机号码：</el-col>
                  <el-col :span="16" :offset="4">{{shopInfo.telphone}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">地址：</el-col>
                  <el-col :span="16" :offset="4">{{shopInfo.address}}</el-col>
                </el-row>
                <!-- </div> -->
              </div>
            </div>

            <table class="table_list">
              <tr class="title_name" style="text-align:center">
                <th class="name">商品名称</th>
                <th class="bdj">本店价</th>
                <th class="sl">购买数量</th>
                <th class="xj">小计</th>
              </tr>
              <tr v-for="(item,index) in orderGoods" class="tr">

                <td class="name">
                  <div class="img">
                    <a><img :src="baseUrl+item.url" /></a>
                  </div>
                  <div class="p_name">
                    <a>{{item.goods_name}}</a>
                  </div>
                </td>
                <td class="bgj sp">￥{{item.goods_price}}</td>
                <td class="sl">
                  <div class="Numbers">
                    {{item.num}}
                  </div>
                </td>
                <td class="xj">￥{{parseFloat(item.goods_price*item.num)}}</td>
              </tr>
            </table>

            <div class="sp_Operation">
              <!--结算-->
              <div class="toolbar_right">
                <div class="p_Total">
                  <span class="text">商品总价：</span>
                  <span class="price ">{{totalPrice}}元</span>
                </div>
                <div class="p_Total">
                  <span class="text">运送费：</span>
                  <span class="price ">{{shippingFree}}元</span>
                </div>
                <div class="p_Total">
                  <span class="text">订单金额：</span>
                  <span class="price sumPrice">{{totalPrice+shippingFree}}元</span>
                </div>
                <div class="btn">
                  <el-button @click="submitOrder" style="float:right;" type="success">提交订单</el-button>
                </div>
              </div>
            </div>
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
      goodsId: "",
      orderGoods: [],
      address: [],
      baseUrl: "http://localhost/fruit-shop/public/static/uploads",
      selectList: [],
      checked: false,
      radio: "1",
      radio7: "1",
      shippingFree: 0,
      payHref: ""
    };
  },
  computed: {
    cartIdStock: function() {
      return this.$store.getters.getOrderGoods;
    },
    totalPrice: function() {
      var total = 0;
      for (let i = 0; i < this.orderGoods.length; i++) {
        var item = this.orderGoods[i];
        if (item) {
          total += item.goods_price * item.num;
        } else {
          continue;
        }
      }
      return total;
    }
  },
  methods: {
    getOrderGoods: function() {
      var that = this;
      this.orderGoods = this.$store.getters.getOrderGoods;
    },
    getAddress: function() {
      var that = this;
      let para = {};
      this.$http
        .post("/api/index/address/getUserAddr", para)
        .then(function(res) {
          if (res.data.code === 200) {
            that.address = res.data.address;
          } else {
            return;
          }
        });
    },
    getShopInfo: function() {
      var that = this;
      let shopId = that.getCookie("shopId");
      let para = {
        id: shopId
      };
      this.$http
        .post("/api/admin/seller/getAddrAndPhone", para)
        .then(function(res) {
          if (res.data.code === 200) {
            that.shopInfo = res.data.info;
            that.shopInfo.shopName = "";
            that.shopInfo.shopName = that.getCookie("shopName");
          } else {
            return;
          }
        });
    },
    getCookie: function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    submitOrder: function() {
      var that = this;

      let data = "";
      if (this.radio == '1') {
        if (this.radio7 == 1) {
          this.$message({
            message: "请选择配送地址",
            type: "error"
          });
          return;
        }
        data = '{"aid":' + this.radio7.id + ',"goods":{';
      } else {
        // data = '{"goods":{';
         data = '{"aid": " "' + ',"goods":{';
      }
      for (let i = 0; i < this.orderGoods.length; i++) {
        if (i == this.orderGoods.length - 1) {
          data =
            data +
            '"' +
            this.orderGoods[i].sid +
            '"' +
            ":" +
            this.orderGoods[i].num;
        } else {
          data =
            data +
            '"' +
            this.orderGoods[i].sid +
            '"' +
            ":" +
            this.orderGoods[i].num +
            ",";
        }
      }
      data = data + "}}";
      console.log(data);
      let para = { data: data };
      this.$http.post("/api/index/order/placeOrder", para).then(function(res) {
        if (res.data.code === 200) {
          that.payHref = res.data.data;
          window.location.assign(that.payHref);
        } else {
          that.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      });
    }
  },
  created: function() {
    this.getOrderGoods();
    this.getAddress();
    this.getShopInfo();
  }
};
</script>
<style sccped>
/* .grid-content {
  padding: 0px 10px;
} */
tr th {
  text-align: center;
}
.shippingType {
  font-size: 17px;
  height: 40px;
  line-height: 40px;
}
.content {
  padding: 10px 30px;
}
.address_title {
  font-size: 17px;
  height: 40px;
  line-height: 40px;
}
.shopInfo {
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  margin-bottom: 10px;
}
.message {
  border: 1px solid #000000;
  padding: 5px;
}
.Shopping_list .sp_Operation {
  height: 120px;
}
</style>
