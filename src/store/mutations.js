/*
状态对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_CATEGORIES,
  RECEIVE_RESET_USERINFO,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOODS_COUNT,
  REMOVE_FOODS_COUNT,
  CLEAR_SHOP_CART, RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import Vue from 'vue'

export default {
  // 更新state中的address属性数据
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },
  // 更新state中的foodCategories属性数据
  [RECEIVE_FOOD_CATEGORIES] (state, categories) {
    state.foodCategories = categories
  },
  // 更新state中的shops属性数据
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },
  // 更新state中的userInfo属性数据
  [RECEIVE_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  // 清空用户信息
  [RECEIVE_RESET_USERINFO] (state) {
    state.userInfo = {}
  },
  //  更新state中的goods属性数据
  [RECEIVE_GOODS] (state, goods) {
    state.goods = goods
  },
  //  更新state中的ratings属性数据
  [RECEIVE_RATINGS] (state, ratings) {
    state.ratings = ratings
  },
  //  更新state中的info属性数据
  [RECEIVE_INFO] (state, info) {
    state.info = info
  },
  // 增加goods中的food的count
  [ADD_FOODS_COUNT] (state, {food}) {
    if (!food.count) { // 未添加食物
      // 当第一次击加号，向food添加count属性（Vue. set（）），并设置唯一
      Vue.set(food, 'count', 1)
      // 将food添加到shopCartFoods中
      state.shopCartFoods.push(food)
    } else {
      food.count++
    }
  },
  // 减少goods中的food的count
  [REMOVE_FOODS_COUNT] (state, {food}) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        // 将food从shopCartFoods中删除
        state.shopCartFoods.splice(state.shopCartFoods.indexOf(food),1)
      }
    }
  },
  // 清空shopCartFoods
  [CLEAR_SHOP_CART] (state) {
   // 清除food中的count
    state.shopCartFoods.forEach(food => food.count = 0)
      // 移除购物车中的所有购物项
    state.shopCartFoods.length = 0
  },
  [RECEIVE_SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },
}
