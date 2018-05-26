<template>
  <div >
    <div id="Menu">
      <div class="Menu_style">
        <div id="allSortOuterbox">
          <div class="Category">
            <a href="#">
              <em></em>所有产品分类</a>
          </div>
          
        </div>
        <!-- <script>$("#allSortOuterbox").slide({ titCell:".Menu_list li",mainCell:".menv_Detail",	});</script> -->
        <!--菜单栏-->
        <div class="Navigation" id="Navigation">
          <ul class="Navigation_name">
            <li>
              <router-link to="/">
                <a href="#">首页</a>
              </router-link>
            </li>
            <li  v-for="item in nav">
              <a @click="setCategory(item.cid)">{{item.cname}}</a>
            </li>
            <!-- <li>
              <a href="#">水果</a>
            </li>
            <li>
              <a href="#">粮油</a>
            </li>
            <li>
              <a href="#">套餐礼盒</a>
            </li> -->
          </ul>
        </div>
        <!-- <script>$("#Navigation").slide({titCell:".Navigation_name li"});</script> -->
        <!--购物车-->
        <div @click="toShoppingCart" class="Shopping_car">
          <a>
            <em></em> 购物车(
            <b>{{cateLength}}</b> )
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: []
    };
  },
  computed: {
    cateLength: function(){
      return this.$store.getters.getShoppingCart.length;
    }
  },
  methods: {
    getNav: function(){
      var that=this;
      let para={};
      this.$http.post('/api/index/classify/getAllList',para).then(function(res){
        if(res.data.code=200){
          that.nav=res.data.classify;
        }else{
          return ;
        }
      });
    },
    setCategory: function(category){
      this.$store.dispatch("setCategory",category);
      this.$router.push("/productList");
    },
    toShoppingCart:function(){
      this.$router.push('/shoppingCart');
    }
  },
  created: function(){
    this.getNav();
  }
};
</script>
<style sccped>
@import "../assets/common/css/common.css";
/* .grid-content {
  padding: 0px 10px;
} */
</style>
