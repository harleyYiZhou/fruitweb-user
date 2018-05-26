<template>
  <div>
    <!--内容样式-->
    <div id="page">
      <!--位置-->
      <div class="Position">当前位置：
        <a href="#">首页</a> >
        <a href="#">商品详情{{goodId}}{{goodStock}}</a>
      </div>
      <!--详细内容-->
      <div class="detailed">
        <div class="showContent margin clearfix">
          <!--相册样式-->
          <div class="gallery">
            <div class="content_style">
              <div class="Show_style">
                <div id="">
                  <!-- <ul class="img_ul" id="detail">
                    <li class="jqzoom_pm" v-for="imageUrl in goodDetail.img">
                      <a class="img_a"><img :src="baseUrl+imageUrl.url" style="height: 500px;"></a>
                    </li>
                  </ul>
                  <a href="javascript:void(0)" class="prev_a change_a" title="上一张">
                    <span style="display: none;"></span>
                  </a>
                  <a href="javascript:void(0)" class="next_a change_a" title="下一张">
                    <span style="display: none;"></span>
                  </a> -->
                  <div class="block">
                    <el-carousel height="500px;">
                      <el-carousel-item v-for="imageUrl in goodDetail.img">
                        <img :src="baseUrl+imageUrl.url" style="width: 450px;">
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </div>
                <div class="img_hd">
                  <ul class="clearfix xiaotu">
                    <li class="" v-for="imageUrl in goodDetail.img">
                      <a class="img_a"><img :src="baseUrl+imageUrl.url" onload="imgs_load(this)"></a>
                    </li>
                    <!-- <li class="">
                      <a class="img_a"><img src="common/images/cp-2.jpg" onload="imgs_load(this)"></a>
                    </li>
                    <li class="">
                      <a class="img_a"><img src="common/images/jzbh-2.jpg" onload="imgs_load(this)"></a>
                    </li>
                    <li class="">
                      <a class="img_a"><img src="common/images/cp-1.jpg" onload="imgs_load(this)"></a>
                    </li> -->
                  </ul>
                  <a class="bottom_a prev_a" style="opacity: 0.7;">&lt;</a>
                  <a class="bottom_a next_a" style="opacity: 0.7;">&gt;</a>
                </div>
              </div>
            </div>
          </div>
          <!--购买样式-->
          <div class="p_right_style">
            <div class="title_name">
              <h1>{{goodDetail.goods_name}}</h1>
              <p class="p_ad">{{goodDetail.goods_desc}}</p>
            </div>
            <div id="summary">
              <div class="p_Price">
                <div class="dt">价&nbsp;&nbsp;&nbsp;格:</div>
                <div class="dd">
                  <strong class="p_dd_price" id="xs-price">￥{{goodDetail.goods_price}}</strong>
                  <span class="Grade">VIP</span>
                </div>
                <div class="Comment">
                  <p>累计评论</p>
                  <h6>
                    <a href="#">33</a>
                  </h6>
                </div>
              </div>
              <div class="Sort">
                <ul>
                  <dl>
                    <dt class="name">重&nbsp;&nbsp;&nbsp;量:</dt>
                    <dd class="">500k/斤</dd>
                  </dl>
                  <dl>
                    <dt class="name">库&nbsp;&nbsp;&nbsp;存:</dt>
                    <dd class="">{{goodStock}}斤</dd>
                  </dl>
                </ul>
              </div>
              <div class="p_Submit">
                <div class="Numbers">
                  <input id="number" name="number" type="number" v-model="num" class="number_text">
                </div>
                <div class="btn_Submit">
                  <a @click="addToCart(1)" class="wrap_btn1" title="加入购物车"></a>
                  <a @click="addToCart(2)" class="wrap_btn2" title="立即购买"></a>
                </div>
              </div>
              <div class="ProductD clearfix">
                <div class="productDL">
                  <dl>
                    <dt>您还可以</dt>
                    <dd>
                      <ul>
                        <li>
                          <a href="javascript:collect(74)">
                            <span class="ico1"></span>收藏商品</a>
                        </li>
                        <li class="share">
                          <a href="javascript:;">
                            <span class="ico3"></span>分享到</a>
                          <div class="share1" style="overflow: hidden; width: 66px;">
                            <div class="bdshare_t" id="bdshare">
                              <a class="bds_tsina" title="分享到新浪微博" href="#">
                                <span class="ico1"></span>
                              </a>
                              <a class="bds_tqq" title="分享到腾讯微博" href="#">
                                <span class="ico2"></span>
                              </a>
                              <a class="bds_qzone" title="分享到QQ空间" href="#">
                                <span class="ico3"></span>
                              </a>
                              <a class="bds_t163" title="分享到网易微博" href="#">
                                <span class="ico4"></span>
                              </a>
                              <a class="bds_tsohu" title="分享到搜狐微博" href="#">
                                <span class="ico5"></span>
                              </a>
                              <a class="bds_renren" title="分享到人人网" href="#">
                                <span class="ico6"></span>
                              </a>
                              <a class="bds_kaixin001" title="分享到开心网" href="#">
                                <span class="ico7"></span>
                              </a>
                              <a class="bds_hi" title="分享到百度空间" href="#">
                                <span class="ico8"></span>
                              </a>
                              <a class="bds_baidu" title="分享到百度搜藏" href="#">
                                <span class="ico9"></span>
                              </a>
                              <a class="bds_tieba" title="分享到百度贴吧" href="#">
                                <span class="ico10"></span>
                              </a>
                              <a class="bds_douban" title="分享到豆瓣网" href="#">
                                <span class="ico11"></span>
                              </a>
                              <a class="bds_diandian" title="分享到点点网" href="#">
                                <span class="ico12"></span>
                              </a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Show_style">
          <div class="left_style">
            <div class="sideMenu" style="margin:0 auto">
              <div class="title_name">导航栏</div>
              <h3 class="on">
                <em></em>蔬菜系列</h3>
              <ul class="name_link">
                <li>
                  <a href="#">大白菜</a> |
                  <a href="#">胡萝卜</a> |
                  <a href="#">青菜</a> |
                  <a href="#">西红柿</a> |
                  <a href="#">花菜</a> |
                  <a href="#">黄瓜</a> |
                  <a href="#">大白菜</a> |
                  <a href="#">大白菜</a> |
                </li>
              </ul>
              <h3>
                <em></em>水果系列</h3>
              <ul>
                <li>
                  <a href="#">大白菜</a> |
                  <a href="#">胡萝卜</a> |
                  <a href="#">青菜</a> |
                  <a href="#">西红柿</a> |
                  <a href="#">花菜</a> |
                  <a href="#">黄瓜</a> |
                  <a href="#">大白菜</a> |
                  <a href="#">大白菜</a> |
                </li>
              </ul>
              <h3>
                <em></em>粮油系列</h3>
              <ul>
                <li>
                  <a href="#">大白菜</a> |
                  <a href="#">胡萝卜</a> |
                  <a href="#">青菜</a> |
                  <a href="#">西红柿</a> |
                  <a href="#">花菜</a> |
                  <a href="#">黄瓜</a> |
                  <a href="#">大白菜</a> |
                  <a href="#">大白菜</a> |
                </li>
              </ul>
            </div>
            <!--记录-->
            <div class="Record">
              <div class="title_name">浏览记录</div>
              <ul>
                <li>
                  <a href="#">
                    <P><img src="common/images/cp-7.jpg" /></P>
                    <p>商品名称</p>
                  </a>
                  <p>价格:
                    <b>￥5.30</b>
                  </p>
                </li>
                <li>
                  <a href="#">
                    <P><img src="common/images/cp-7.jpg" /></P>
                    <p>商品名称</p>
                  </a>
                  <p>价格:
                    <b>￥5.30</b>
                  </p>
                </li>
                <li>
                  <a href="#">
                    <P><img src="common/images/cp-7.jpg" /></P>
                    <p>商品名称</p>
                  </a>
                  <p>价格:
                    <b>￥5.30</b>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <!--右侧样式-->
          <div class="right_style">
            <div class="fixed_bar">
              <ul>
                <li class="on">
                  <a href="#">产品介绍</a>
                </li>
                <li>
                  <a href="#">商品评论(
                    <b>0</b>)</a>
                </li>
              </ul>
            </div>
            <div class="sh_Service">
              <div class="title_name">产品介绍</div>
              <div class="content">
                <!-- <ul> -->
                <div v-for="imgDetail in goodDetail.detail"><img :src="baseUrl+imgDetail.url" /></div>
                <!-- <li><img src="common/images/fu_img_05.png" /></li>
                  <li><img src="common/images/fu_img_07.png" /></li>
                  <li><img src="common/images/fu_img_09.png" /></li> -->
                <!-- </ul> -->
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
      goodDetail: {},
      baseUrl: "http://localhost/fruit-shop/public/static/uploads",
      num: 1
    };
  },
  computed: {
    goodId: function() {
      return this.$store.getters.getGoodId;
    },
    goodStock: function() {
      return this.$store.getters.getGoodStock;
    }
  },
  updated: function() {
    // this.getGoodDetail();
  },
  methods: {
    getGoodDetail: function() {
      var that = this;
      let para = {
        id: this.goodId
      };
      this.$http
        .post("/api/index/goods/getGoodsDetail", para)
        .then(function(res) {
          if (res.data.code === 200) {
            that.goodDetail = res.data.info;
          } else {
          }
        });
    },
    addToCart: function(type) {
      let num = Number(this.num);
      let product = {
        id: this.goodDetail.sid,
        stock: num
      };

      let cart = this.$store.getters.getShoppingCart;
      if (cart.length !== 0) {
        let shoppingCart = cart;
        let isHave = 0;
        for (var i = 0; i < shoppingCart.length; i++) {
          if (shoppingCart[i].id === this.goodDetail.sid) {
            shoppingCart[i].stock += num;

            this.$store.dispatch("setShoppingCart", shoppingCart);
            this.$message({
              message: "加入购物车成功",
              type: "success"
            });
            isHave = 1;
            if (type === 2) {
              this.$router.push("/shoppingCart");
            }
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
        }
      } else {
        let shoppingCart = [];
        shoppingCart.push(product);
        this.$store.dispatch("setShoppingCart", shoppingCart);
        this.$message({
          message: "加入购物车成功",
          type: "success"
        });
      }
      if (type === 2) {
        this.$router.push("/shoppingCart");
      }
    }
  },

  created: function() {
    this.getGoodDetail();
  }
};
</script>
<style sccped>
/* .grid-content {
  padding: 0px 10px;
} */
</style>
