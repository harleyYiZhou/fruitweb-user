import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let store = new Vuex.Store({
  // 1. state
  state:{
      category:0,
      goodId: 0,
      good_stock: 0,
      orderType: 0,
      shoppingCart: [],
      orderGoods: []
  },

  // // 2. getters
  getters:{
      // 参数列表state指的是state数据
      getCategory(state){
          return state.category;
      },
      getGoodId(state){
        return state.goodId;
      },
      getGoodStock(state){
        return state.good_stock;
      },
      getOrderType(state){
        return state.orderType;
      },
      getShoppingCart(state){
        return state.shoppingCart;
      },
      getOrderGoods(state){
        return state.orderGoods;
      }
  },
  // 3. actions
  // 通常跟api接口打交道
  actions:{
      // 设置城市信息
      // 参数列表：{commit, state}
      // state指的是state数据
      // commit调用mutations的方法 
      // name就是调用此方法时要传的参数
      setCategory({commit,state}, name){
          // 跟后台打交道
          // 调用mutaions里面的方法
          commit("setCategory", name);
      },
      setGoodId({commit,state},id){
        commit("setGoodId",id);
      },
      setGoodStock({commit,state},stock){
        commit("setGoodStock",stock);
      },
      setOrderType({commit,state},type){
        commit("setOrderType",type);
      },
      setShoppingCart({commit,state},shoppingCart){
        commit("setShoppingCart",shoppingCart);
      },
      setOrderGoods({commit,state},orderGoods){
        commit("setOrderGoods",orderGoods);
      }
  },
  // 4. mutations
  mutations:{
      // state指的是state的数据
      // name传递过来的数据
      setCategory(state, name){
          state.category = name;//将传参设置给state的city
      },
      setGoodId(state,id){
        state.goodId=id;
      },
      setGoodStock(state,stock){
        state.good_stock=stock;
      },
      setOrderType(state,type){
        state.orderType=type;
      },
      setShoppingCart(state,shoppingCart){
        state.shoppingCart=shoppingCart;
      },
      setOrderGoods(state,orderGoods){
        state.orderGoods=orderGoods;
      }
  }
});

export default store;