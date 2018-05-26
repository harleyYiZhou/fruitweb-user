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
          <a href="#">用户基本信息</a>
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
              <a @click="toOrder(0)">未付款订单</a>
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
          <div class="">
            <!-- 修改用户名 -->
            <div class="user_title">修改用户信息： </div>
            <el-row class="userInfo">
              <el-col :span=6>用户名：</el-col>
              <el-col :span=18>
                {{userInfo.nickname}}
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="dialogFormVisible1 = true" circle></el-button>
              </el-col>
            </el-row>

            <!-- 修改用户名弹窗 -->
            <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible1">
              <el-form :model="userInfo">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input v-model="userInfo.nickname" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="changeNickname">确 定</el-button>
              </div>
            </el-dialog>

            <!-- 地址本管理 -->
            <div class="user_title" style="margin-top: 30px;">收货地址管理：
              <el-button type="success" @click="dialogFormVisible2 = true">新增收货地址</el-button>
            </div>
            <el-table :data="address" highlight-current-row v-loading="listLoading"  style="width: 100%;">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column type="index" width="60">
              </el-table-column>
              <el-table-column prop="username" label="收货人" align="center" sortable>
              </el-table-column>
              <el-table-column prop="telphone" label="联系方式" align="center" sortable>
              </el-table-column>
              <el-table-column prop="address" label="送货地址" align="center" sortable>
              </el-table-column>
              <el-table-column label="操作" width="140">
                <template scope="scope">
                  <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)" circle></el-button>
                  <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 新增用户地址弹窗 -->
            <el-dialog title="新增用户地址" :visible.sync="dialogFormVisible2">
              <el-form :model="newAddress">
                <el-form-item label="收货人" :label-width="formLabelWidth">
                  <el-input v-model="newAddress.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                  <el-input v-model="newAddress.telphone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="收货地址" :label-width="formLabelWidth">
                  <el-input v-model="newAddress.address" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="addAddress">确 定</el-button>
              </div>
            </el-dialog>

            <!-- 修改用户地址弹窗 -->
            <el-dialog title="修改用户地址" :visible.sync="dialogFormVisible3">
              <el-form :model="editAddress">
                <el-form-item label="收货人" :label-width="formLabelWidth">
                  <el-input v-model="editAddress.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                  <el-input v-model="editAddress.telphone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="收货地址" :label-width="formLabelWidth">
                  <el-input v-model="editAddress.address" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="changeAddress">确 定</el-button>
              </div>
            </el-dialog>

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
      allOrder: [],
      address: [],
      //弹窗
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: '120px',
      newAddress: {
        username: '',
        telphone: '',
        address: ''
      },
      editAddress: {
        username: '',
        telphone: '',
        address: ''
      }
    };
  },

  created: function() {
    this.getUserInfo();
    this.getAddress();
  },
  methods: {
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

    toOrder: function(type) {
      this.$store.dispatch("setOrderType", type);
      this.$router.push("/userCenter/order");
    },

    //修改用户地址
    handleEdit: function(index,row){
      this.editAddress=row;
      this.dialogFormVisible3=true;
    },
    //修改用户昵称
    changeNickname: function(){
      var that=this;
      let para={
        name: this.userInfo.nickname
      };
      this.$http.post('/api/user/user/editUserNickname',para).then(function(res){
        if(res.data.code===200){
          that.$message({
            message: '修改用户名成功',
            type: 'success'
          })
          that.dialogFormVisible1=false;
        }else{
          that.$message({
            message: res.data.msg,
            type: 'error'
          })
          that.dialogFormVisible1=false;
        }
      });
    },
    //添加新的收货地址
    addAddress: function(){
      var that=this;
      let para=this.newAddress;
      this.$http.post('/api/index/address/addAddr',para).then(function(res){
        if(res.data.code===200){
          that.$message({
            message: '收货地址添加成功',
            type: 'success'
          });
          that.dialogFormVisible2=false;
          that.getAddress();
        }else{
          that.$message({
            message: res.data.msg,
            type: 'error'
          });
          that.dialogFormVisible2=false;
          that.getAddress();          
        }
      });
    },
    //修改收货地址
    changeAddress: function(){
      var that=this;
      let para={
        id: this.editAddress.id,
        username: this.editAddress.username,
        telphone: this.editAddress.telphone,
        address:  this.editAddress.address
      };
      this.$http.post('/api/index/address/updateAddr',para).then(function(res){
        if(res.data.code===200){
          that.$message({
            message: '地址更新成功',
            type: 'success'
          });
          that.dialogFormVisible3=false;
          that.getAddress();
        }else{
          that.$message({
            message: res.data.msg,
            type: 'error'
          });
          that.dialogFormVisible3=false;
        }
      });
    }
  }
};
</script>
<style sccped>
/* .grid-content {
  padding: 0px 10px;
} */
.user_title {
  font-size: 20px;
}
.userInfo {
  font-size: 15px;
  height: 40px;
  line-height: 40px;
}
.user_name_info {
  width: auto;
}
</style>
