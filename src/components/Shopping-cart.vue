<template>
  <div>
    <!--内容样式-->
    <div id="page">

      <div class="zp_Shopping_cart clearfix">
        <div class="flow_step_no1 Process clearfix" style="margin-top: 20px;g">
          <ul>
            <li class="step_1">1.我的购物车</li>
            <li class="step_2">2.填写核对订单</li>
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
            <table class="table_list">
              <tr class="title_name" style="text-align:center">
                <th class="checkbox">&nbsp;</th>
                <th class="name">商品名称</th>
                <th class="bdj">本店价</th>
                <th class="sl">购买数量</th>
                <th class="xj">小计</th>
                <th class="cz">操作</th>
              </tr>
              <tr v-for="(item,index) in shoppingCart" class="tr">
                <td class="checkbox">
                  <input type="checkbox" v-model="selectList" :id="item.id" :value="index" name="selectList">
                </td>
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
                    <button @click="handleReduce(index)">-</button>
                    {{item.num}}
                    <button @click="handleAdd(index)">+</button>
                  </div>
                </td>
                <td class="xj">￥{{parseFloat(item.goods_price*item.num)}}</td>
                <td class="cz">
                  <p>
                    <a @click="handleRemove(index)">删除</a>
                  </P>
                </td>
              </tr>
            </table>
            <!-- <el-table :data="shoppingCart" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
              <el-table-column type="selection" align="center">
              </el-table-column>
              <el-table-column prop="goods_name" label="商品名称" align="center" sortable>
              </el-table-column>
              <el-table-column prop="goods_price" label="商品价格" align="center" sortable>
              </el-table-column>
              <el-table-column  label="购买数量" align="center"  sortable>
                <div class="Numbers">
                  <a href="javascript:void(0);" onclick="updatenum('del');">-</a>
                  <input id="number" name="number" type="text" value="1" class="number_text">
                  <a href="javascript:void(0);" onclick="updatenum('del');">+</a>
                </div>
              </el-table-column>
              <el-table-column prop="" label="小计" align="center"  sortable>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table> -->
            <div class="sp_Operation">
              <div class="select-all">
                <div class="cart-checkbox"><input type="checkbox" v-on:click="swapCheck" v-model="checked">全选</div>
              </div>
              <!--结算-->
              <div class="toolbar_right">
                <div class="p_Total">
                  <span class="text">商品总价：</span>
                  <span class="price sumPrice">{{totalPrice}}元</span>
                </div>
                <div class="btn">
                  <input name="" type="submit" value="" class="gouwu_btn" @click="shopping" />
                  <input name="" type="submit" value="" class="submit_btn" @click="submitCart"/>
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
      shoppingCart: [],
      baseUrl: "http://localhost/fruit-shop/public/static/uploads",
      selectList: [],
      checked: false
    };
  },
  computed: {
    cartIdStock: function() {
      return this.$store.getters.getShoppingCart;
    },
    totalPrice: function() {
      var total = 0;
      for (var i = 0, len = this.selectList.length; i < len; i++) {
        var index = this.selectList[i];
        var item = this.shoppingCart[index];
        if (item) {
          total += item.goods_price * item.num;
        } else {
          continue;
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ",");
    }
  },
  methods: {
    getShoppingCart: function() {
      var that = this;
      let cartIdStock = this.$store.getters.getShoppingCart;
      for (let i = 0; i < cartIdStock.length; i++) {
        if (this.goodsId === "") {
          this.goodsId = cartIdStock[i].id;
        } else {
          this.goodsId = this.goodsId + "," + cartIdStock[i].id;
        }
      }
      let para = {
        ids: this.goodsId
      };
      this.$http
        .post("/api/index/goods/getBuyCarGoods", para)
        .then(function(res) {
          if (res.data.code === 200) {
            console.log(res.data.goods);
            that.shoppingCart = res.data.goods;
            console.log(that.shoppingCart);
            for (let i = 0; i < that.shoppingCart.length; i++) {
              that.shoppingCart[i].num = 0;
              that.shoppingCart[i].num = that.cartIdStock[i].stock;
            }
          }
        });
    },
    swapCheck: function() {
      var selectList = document.getElementsByName("selectList");
      var len = selectList.length;
      if (this.checked) {
        for (var i = 0; i < len; i++) {
          var item = selectList[i];
          item.checked = false;
        }
        this.checked = false;
        this.selectList = [];
      } else {
        for (i = 0; i < len; i++) {
          item = selectList[i];
          if (item.checked === false) {
            item.checked = true;
            this.selectList.push(selectList[i].value);
          }
        }
        this.checked = true;
      }
    },
    handleReduce: function(index) {
      if(this.shoppingCart[index].num<=1){
        this.shoppingCart[index].num=1;
      }else{
        this.shoppingCart[index].num-=1;
        this.cartIdStock[index].stock-=1;
        this.$store.dispatch('setShoppingCart',this.cartIdStock);
        this.getShoppingCart();
      }
    },
    handleAdd: function(index) {
     
        this.shoppingCart[index].num+=1;
        this.cartIdStock[index].stock+=1;
        this.$store.dispatch('setShoppingCart',this.cartIdStock);
        this.getShoppingCart();
    },
    handleRemove: function(index) {
      this.shoppingCart.splice(index, 1);
      this.cartIdStock.splice(index,1);
      this.selectList.splice(index,1);
      this.$store.dispatch('setShoppingCart',this.cartIdStock);
      // this.getShoppingCart();
    },
    shopping:function(){
      this.$router.push('/productList');
    },
    submitCart:function(){
      let orderGoods=[];
      if(this.selectList.length===0){
        this.$message({
          message: '购物车不能为空',
          type: 'error'
        })
      }else{
        for(let i=0;i<this.selectList.length;i++){
          orderGoods.push(this.shoppingCart[this.selectList[i]]);
        }
        this.$store.dispatch('setOrderGoods',orderGoods);
        this.$router.push('/confirmOrder');
      }
    }
  },
  created: function() {
    this.getShoppingCart();
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
</style>
