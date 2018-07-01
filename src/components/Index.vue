<template>
  <div>
    <!--幻灯片样式-->
    <!-- <div class="">
      <div id="slideBox" class="slideBox">
        <div class="hd">
          <ul></ul>
        </div>
        <div class="bd">
          <ul>
            <li>
              <a href="#" target="_blank"><img v-bind:src="assets[0].src" /></a>
            </li>
          </ul>
        </div>
        <a class="prev" href="javascript:void(0)"></a>
        <a class="next" href="javascript:void(0)"></a>
      </div>
    </div> -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-bind:key=Index v-for="str in listImg" :style="{ backgroundImage: 'url(' + str.src + ')' }"></div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
    <div class="style1">
      <!--2楼蔬菜-->
      <div id="Vegetables_2f">
        <div class="Product_title">
          <span id="jqTest">1F</span>水果区</div>
        <div class="Vegetables_Show">
          <div class="Vegetables_one">
            <p class="name">精品水果</p>
            <img src="../assets/common/images/sg_14.png" />
          </div>
          <div class="Vegetables_two">
            <ul class="list">
              <li v-for="good in productList">
                <a href="#" @click="toProductDetail(good)">
                  <p><img :src="baseUrl+good.url" /></p>
                  <p>{{good.goods_name}}</p>
                  <p class="Price">￥{{good.goods_price}}/500g</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--2楼蔬菜-->
      <div id="Grain_3f">
        <div class="Product_title">
          <span>2F</span>蔬菜区</div>
        <div class="Vegetables_Show">
          <div class="Vegetables_one">
            <p class="name">精品蔬菜</p>
            <img src="../assets/common/images/sc_29.png" />
          </div>
          <div class="Vegetables_two">
            <ul class="list">
              <li v-for="good in vegetables">
                  <a href="#" @click="toProductDetail(good)">
                    <p><img :src="baseUrl+good.url" /></p>
                    <p>{{good.goods_name}}</p>
                    <p class="Price">￥{{good.goods_price}}/500g</p>
                  </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <div>
      <el-dialog title="选择店铺" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="省份" :label-width="formLabelWidth">
            <el-select size="small" style="" v-model="selectProv" placeholder="请选择省份" v-on:change="getProv($event)">
              <el-option v-for="item in provs" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市区" :label-width="formLabelWidth" v-if="selectProv!=''">
            <el-select size="small" style=""  v-model="selectCity" placeholder="请选择城市" v-on:change="getCity($event)">
              <el-option v-for="item in citys" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div> -->
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import zone from "../util/china_zones";
export default {
  name: "Index",
  data() {
    return {
      provs: zone.province,
      city: [],
      selectProv: "",
      selectCity: "",
      dialogFormVisible: true,
      formLabelWidth: "120px",
      productList: [],
      vegetables: [],
      listImg: [
        {
          src: require("../assets/common/images/bananer_22.png"),
          title: "pic1"
        },
        {
          src: require("../assets/common/images/bananer_22.png"),
          title: "pic2"
        },
        {
          src: require("../assets/common/images/bananer_22.png"),
          title: "pic3"
        }
      ],
      baseUrl: "http://localhost/fruit-shop/public/static/uploads"
    };
  },
  mounted() {
    console.log("mounted", this);
    var swiper = new Swiper(".swiper-container", {
      pagination: ".swiper-pagination",
      paginationClickable: true,
      loop: true,
      speed: 600,
      autoplay: 4000,
      onTouchEnd: function() {
        swiper.startAutoplay();
      }
    });
  },
  methods: {
    getProv: function(prov) {
      let tempCity = [];
      this.citys = [];
      this.selectCity = "";
      let allCity = zone.city;
      for (var val of allCity) {
        if (prov == val.prov) {
          console.log(val);
          tempCity.push({ label: val.label, value: val.label });
        }
      }
      this.citys = tempCity;
    },
    getCity: function(city) {
      console.log(city);
      console.log(this.selectCity);
    },
    getProduct: function(category) {
      var that = this;
      let id=parseInt(that.getCookie('shopId')) ;
      let para = {
        pn: 1,
        size: 8,
        id: id,
        classify_id: category
      };
      this.$http.post("/api/admin/seller/search", para).then(function(res) {
        if (category === 1) {
          that.productList = res.data.data.data;
        } else if (category === 2) {
          that.vegetables = res.data.data.data;
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
    toProductDetail: function(good) {
      this.$store.dispatch("setGoodId", good.sid);
      this.$store.dispatch("setGoodStock", good.stock);
      this.$router.push("/productDetail");
    }
  },
  created() {
    this.getProduct(1);
    this.getProduct(2);
  }
};
</script>
<style >
.swiper-container {
  width: 100%;
  height: 40rem;
}
.swiper-wrapper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
.swiper-pagination-bullet {
  width: 0.833rem;
  height: 0.833rem;
  display: inline-block;
  background: #7c5e53;
}
</style>
