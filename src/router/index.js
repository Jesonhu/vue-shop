import Vue from 'vue';
import Router from 'vue-router';

const Tabbar = () => import('components/tabbar/tabbar');
const Home = () => import('components/home/home');
const HomeGoods = () => import('components/home-goods/home-goods');
const Category = () => import('components/category/category');
const Member = () => import('components/member/member');
const Shopcart = () => import('components/shopcart/shopcart');
const ShopcartOrder = () => import('components/shopcart-order/shopcart-order');
const Detail = () => import('components/detail/detail');
const Address = () => import('components/address/address');
const AddressdEdit = () => import('components/address-edit/address-edit');
const Coupon = () => import('components/coupon/coupon');
const Pay = () => import('components/pay/pay');
const PayResult = () => import('components/pay-result/pay-result');
const Order = () => import('components/order/order');
const OrderDetail = () => import('components/order-detail/order-detail');
const Search = () => import('components/search/search');
const Location = () => import('components/location/location');
const Login = () => import('components/login/login');
const LoginPassword = () => import('components/login-password/login-password');
const Register = () => import('components/register/register');
const Setting = () => import('components/setting/setting');

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/', component: Tabbar },
    { path: '/home', component: Home, name: '首页' },
    { path: '/home_goods', component: HomeGoods, name: '首页商品' },
    { path: '/category', component: Category, name: '分类' },
    { path: '/member', component: Member, name: '会员' },
    { path: '/shopcart', component: Shopcart, name: '购物车' },
    { path: '/shopcart_order', component: ShopcartOrder, name: '购物车订单' },
    { path: '/pay', component: Pay, name: '支付' },
    { path: '/pay_result', component: PayResult, name: '支付结果' },
    { path: '/detail', component: Detail, name: '商品详情' },
    { path: '/address', component: Address, name: '地址列表' },
    { path: '/address_edit', component: AddressdEdit, name: '编辑地址' },
    { path: '/coupon', component: Coupon, name: '优惠券' },
    { path: '/order', component: Order, name: '订单列表' },
    { path: '/order_detail', component: OrderDetail, name: '订单详情' },
    { path: '/search', component: Search, name: '搜索' },
    { path: '/location', component: Location, name: '店铺选择' },
    { path: '/login', component: Login, name: '登陆' },
    { path: '/login_password', component: LoginPassword, name: '密码登陆' },
    { path: '/register', component: Register, name: '注册' },
    { path: '/setting', component: Setting, name: '设置' }
  ]
});
