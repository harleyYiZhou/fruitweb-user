<template>
    <div id="app">
        <header>
            <div>
                <headerr :msg="dialogFormVisible" :selectCity="selectShop.shop_name" @childchange="change"></headerr>
            </div>
            <div id="nav">
                <nav1></nav1>
            </div>
        </header>
        <article>
            <router-view/>
        </article>
        <footer>
            <footerr></footerr>
        </footer>
        <div>
            <el-dialog title="选择店铺" :visible.sync="dialogFormVisible">
                <el-form>
                    <el-form-item label="省份" :label-width="formLabelWidth">
                        <el-select size="small" style="" v-model="selectProv" placeholder="请选择省份" v-on:change="getProv($event)">
                            <el-option v-for="item in provs" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="市区" :label-width="formLabelWidth" v-if="selectProv!=''">
                        <el-select size="small" style="" v-model="selectCity" placeholder="请选择城市" v-on:change="getCity($event)">
                            <el-option v-for="item in citys" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="连锁店" :label-width="formLabelWidth" v-if="selectCity!=''">
                        <el-select size="small" style="" v-model="selectShop" placeholder="请选择连锁店" v-on:change="getShop($event)">
                            <el-option v-for="item in shop" :key="item.shop_id" :label="item.shop_name" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="selectShop1">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Header from "./components/Header";
import HelloWorld from "./components/HelloWorld";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import zone from "./util/china_zones";
// import func from './vue-temp/vue-editor-bridge';
export default {
  name: "App",
  data() {
    return {
      provs: zone.province,
      city: [],
      shop: [],
      selectProv: "",
      selectCity: "",
      selectShop: "",
      shopName: "",
      dialogFormVisible: true,
      formLabelWidth: "120px"
    };
  },
  created: function() {
    if (this.getCookie("shopName")) {
      console.log(this.getCookie("shopName"));
      this.dialogFormVisible = false;
    };
    console.log(this.category)
  },
  components: {
    Headerr: Header,
    HelloWorld: HelloWorld,
    Nav1: Nav,
    Footerr: Footer
  },
  computed: {
    category: function(){
      return this.$store.getters.getCategory;
    }
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
      var that=this;
      let para={
        city: this.selectCity
      }
      this.$http.post('/api/admin/seller/getShopByAddress',para).then(function(res){
        if(res.data.code===200){
          for(let i=0;i<res.data.data.length;i++){
            that.shop.push({
              shop_id: res.data.data[i].id,
              shop_name: res.data.data[i].shop_name
            })
          }
        }
      })
    },
    getShop:function(){
      this.shopName=this.selectShop.shop_name;
      this.setCookie('shopName',this.selectShop.shop_name);
      this.setCookie('shopId',this.selectShop.shop_id);
    },
    change: function(val) {
      this.dialogFormVisible = val;
    },
    selectShop1: function() {
      this.dialogFormVisible = false;
      document.cookie = "shopName=" + this.selectShop.shop_name;
      this.setCookie('shopId',this.selectShop.shop_id);
      window.location.assign('index.html');
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
    setCookie: function(key,value){
      document.cookie=key+'='+value;
    }
  }
};
// $("#jqText").;
// $("#jqText").hide();
// $("#app").click(function () {
//     alert(1);
// });
</script>

<style>
@import "./assets/common/css/common.css";
@import "./assets/common/css/style.css";
@import "./assets/common/css/page.css";
@import "./assets/common/css/User_center.css";
@import "./assets/common/css/Narrow.css";

.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 25px;
}
.el-header {
  margin: 0px;
  padding: 0px;
}
article {
  min-height: 600px;
}
</style>
