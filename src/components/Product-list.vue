<template>
  <div>
    <!--产品列表-->
    <div id="page">
      <!--位置-->
      <div class="Position">当前位置：
        <a href="#">首页</a> >
        <a href="#">{{categoryName}}</a>
      </div>
      <!--内容展示区样式-->
      <div class="Show_style">
        <div class="Operation">
          <span>
            <a href="#" class="on">默认</a>
            <a href="#">销量
              <em></em>
            </a>
            <a href="#">价格
              <em></em>
            </a>
            <a href="#">上架时间</a>
          </span>
          <span class="img_lists">
            <em></em>
            <a href="#">大图</a>
          </span>
        </div>
        <!-- <el-table :data="fruitList" v-loading="false"> -->
        <div class="product_list">
          <ul class="product_name">
            <li v-for="good in fruitList">
              <div class="p_item" @click="toProductDetail(good)">
                <div class="Weight">500g/斤</div>
                <div class="img">
                  <a href="#"><img :src="baseUrl+good.url" /></a>
                </div>
                <div class="p_price">普通价：
                  <b>￥{{good.goods_price}}</b>
                  <!-- <span class="yuanjia">￥35.23</span> -->
                </div>
                <div class="p_name">
                  <a href="#">{{good.goods_desc}}</a>
                </div>
                <div class="p_operate">
                  <a @click.stop="addToCart(good)">加入购物车</a>
                  <span class="Number">
                    <b>123</b>购买</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- </el-table> -->

        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
          </el-pagination>
        </el-col>

        <!-- <div class="Paging">
          <a href="#" class="pn-prev disabled">
            <i>&lt;</i>上一页</a>
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">下一页
            <i>&gt;</i>
          </a>
          <a href="#">尾页</a>
          <span class="p-skip">
            <em>共
              <b>232</b>页&nbsp;&nbsp;到第</em><input id="page_jump_num" value="1" onkeydown="javascript:if(event.keyCode==13){page_jump();return false;}" class="input-txt">
            <em>页</em>
            <a href="javascript:page_jump();" class="btn btn-default">确定</a>
          </span>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fruitList: [],
      total: 0,
      baseUrl: "http://localhost/fruit-shop/public/static/uploads"
    };
  },
  created: function() {
    this.getGoods();
    this.getTotal();
  },
  computed: {
    category: function() {
      return this.$store.getters.getCategory;
    },
    categoryName: function() {
      return this.category == 1 ? "水果" : this.category == 2 ? "蔬菜" : " ";
    },
    cateLength: function(){
      return this.$store.getters.getShoppingCart.length;
    }
  },
  watch: {
    category: function() {
      this.getGoods();
      this.getTotal();
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getGoods();
    },
    getGoods: function() {
      var that = this;
      let para = {
        pn: 1,
        size: 20,
        id: 3,
        classify_id: this.category
      };
      let options = {};
      let loadingInstance = this.$loading(options);

      this.$http.post("/api/admin/seller/search", para).then(function(res) {
        if ((res.data.code = 200)) {
          that.fruitList = res.data.data.data;
          loadingInstance.close();
        }
      });
    },
    getTotal: function() {
      var that = this;
      let para = {
        pn: 1,
        size: 20,
        id: 3,
        classify_id: this.category
      };
      this.$http.post("/api/admin/seller/search", para).then(function(res) {
        if ((res.data.code = 200)) {
          that.total = res.data.data.count;
        }
      });
    },
    toProductDetail: function(good) {
      this.$store.dispatch("setGoodId", good.sid);
      this.$store.dispatch("setGoodStock", good.stock);
      this.$router.push("/productDetail");
    },
    addToCart: function(good) {
      let product = {
        id: good.sid,
        stock: 1
      };

      let cart = this.$store.getters.getShoppingCart;
      if (cart.length !== 0) {
        let shoppingCart = cart;
        let isHave = 0;
        for (var i = 0; i < shoppingCart.length; i++) {
          if (shoppingCart[i].id === good.sid) {
            shoppingCart[i].stock += 1;

            this.$store.dispatch("setShoppingCart", shoppingCart);
            this.$message({
              message: "加入购物车成功",
              type: "success"
            });
            console.log(cart);
            isHave = 1;
            return;
          }
        }
        if (isHave === 0) {
          shoppingCart.push(product);
          this.$store.dispatch("setShoppingCart", shoppingCart);
          this.$message({
            message: "加入购物车成功",
            type: "success"
          });
          console.log(cart);
        }
      } else {
        let shoppingCart = [];
        shoppingCart.push(product);
        this.$store.dispatch("setShoppingCart", shoppingCart);
        this.$message({
          message: "加入购物车成功",
          type: "success"
        });
        console.log(shoppingCart);
      }

      //对购物车数组进行操作
      // Array.prototype.indexOf = function(val) {
      //   for (var i = 0; i < this.length; i++) {
      //     if (this[i].id == val) return i;
      //   }
      //   return -1;
      // };
      // Array.prototype.remove = function(val) {
      //   var index = this.indexOf(val);
      //   if (index > -1) {
      //     this.splice(index, 1);
      //   }
      // };
    }
  }
};
</script>
<style sccped>
/* .grid-content {
  padding: 0px 10px;
} */
</style>
