import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/Index'
import Register from '@/components/register'
import Login from '@/components/login'
import UserCenter from '@/components/user-center'
import ProductList from '@/components/Product-list'
import ProductDetail from '@/components/Product-detail'
import ShoppingCart from '@/components/Shopping-cart'
import Order from '@/components/userCenter/Order'
import UserInfo from '@/components/userCenter/UserInfo'
import ConfirmOrder from "@/components/ConfrimOrder"
import PaySuccess from "@/components/PaySuccess"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:"/register",
      name:"Register",
      component: Register
    },
    {
      path:"/login",
      name:"Login",
      component: Login
    },
    {
      path:"/productList",
      name:"ProductList",
      component: ProductList
    },
    {
      path:"/productDetail",
      name:"ProductDetail",
      component: ProductDetail
    },
    {
      path:"/shoppingCart",
      name:"ShoppingCart",
      component: ShoppingCart
    },
    {
      path:"/userCenter",
      name:"UserCenter",
      component: UserCenter,
      
    },
    { path: '/userCenter/order', component: Order, name: '订单列表'},
    { path: '/userCenter/userInfo', component: UserInfo, name: '用户信息' },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/confirmOrder',
      name: 'ConfirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/paySuccess',
      name: 'PaySuccess',
      component: PaySuccess
    }
  ]
})
