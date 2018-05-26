<template>
    <div>
        <div id="top">
            <div class="header">
                <div class="Collection">
                    <em></em>

                    <a href="#" @click="change">{{getCookie('shopName')!=''? getCookie('shopName'):'请选择店铺'}}</a>
                    <!-- <a v:if="selectCity!=''" href="#">{{selectCity}}</a> -->
                </div>
                <div class="hd_top_manu clearfix">
                    <ul class="clearfix">
                        <li v-if="!phone" class="hd_menu_tit zhuce" data-addclass="hd_menu_hover">欢迎光临本店！
                            <router-link to="/login">
                                <a href="#" class="red">[请登录]</a> 新用户
                            </router-link>
                            <router-link to="/register">
                                <a href="#" class="red">[免费注册]</a>
                            </router-link>
                        </li>
                        <li v-if="phone" class="hd_menu_tit" data-addclass="hd_menu_hover">
                            欢迎光临本店
                            <router-link to="/userCenter">
                                <a href="#">{{userName}}</a>
                            </router-link>
                            <router-link to="/userCenter">
                                <a href="#">我的订单</a>
                            </router-link>
                        </li>
                        <li class="hd_menu_tit hd_Shopping_Cart" data-addclass="hd_menu_hover">
                            <a href="#" class="hd_menu">购物车(
                                <b>{{cateLength}}</b>)</a>
                            <div class="hd_Shopping_list">
                                <i></i>
                                <ul>
                                    <li>
                                        <div class="img"><img src="../assets/common/images/tianma.png" /></div>
                                        <div class="content">
                                            <p>
                                                <a href="#">产品名称</a>
                                            </p>
                                            <p>颜色分类:紫花8255尺码:XL</p>
                                        </div>
                                        <div class="Operations">
                                            <p class="Price">￥55.00</p>
                                            <p>
                                                <a href="#">删除</a>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="Shopping_style">
                                    <a href="#" class="Shopping">查看我的购物车</a>
                                </div>
                            </div>
                        </li>
                        <li class="hd_menu_tit" data-addclass="hd_menu_hover">
                            <a href="#">联系我们</a>
                        </li>
                        <li v-if="phone" class="hd_menu_tit list_name" data-addclass="hd_menu_hover">
                            <el-popover placement="top" width="160" v-model="visible2">
                                <p>您确定要注销账号吗？</p>
                                <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="logout">确定</el-button>
                                </div>
                                <a href="#" class="hd_menu" slot="reference">注销</a>
                                <!-- <el-button slot="reference">删除</el-button> -->
                            </el-popover>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="header" class="header">
            <div class="logo">
                <a href="#"><img src="../assets/common/images/logo.png" /></a>
            </div>
            <div class="Search">
                <p><input name="" type="text" class="text" /><input name="" type="submit" value="搜索" class="Search_btn" /></p>
                <p class="Words">
                    <a href="#">苹果</a>
                    <a href="#">香蕉</a>
                    <a href="#">菠萝</a>
                    <a href="#">西红柿</a>
                    <a href="#">橙子</a>
                    <a href="#">苹果</a>
                </p>
            </div>
            <div class="phone">
                <img src="../assets/common/images/phone.png" />
            </div>
        </div>

    </div>

</template>

<script>
import zone from "../util/china_zones";

export default {
  data() {
    return {
      userName: "",
      phone: "",
      provs: zone.province,
      city: [],
      selectProv: "",
      selectCity: "",
      dialogFormVisible: this.msg,
      selectCity: this.selectCity
    };
  },
  computed: {
    cateLength: function(){
      return this.$store.getters.getShoppingCart.length;
    }
  },
  created: function() {
    this.getUser();
    this.phone = window.localStorage.getItem("user");
  },
  props: ["msg", "selectCity"],
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
    change: function() {
      this.dialogFormVisible = true;
      this.$emit("childchange", this.dialogFormVisible);
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
    getUser: function() {
      var that = this;
      let para = {};
      return this.$http.post("/api/user/user/getUserInfo", para).then(function(res) {
        if ((res.data.code = 200)) {
          localStorage.setItem("userName", res.data.user.nickname);
          that.userName=window.localStorage.getItem("userName");
        }else{} 
      });
    },
    logout: function() {
      localStorage.removeItem("user");
      localStorage.removeItem("password");
      window.location.assign("login.html");
    }
  }
};
</script>
<style sccped>
/* .grid-content {
  padding: 0px 10px;
} */
</style>
