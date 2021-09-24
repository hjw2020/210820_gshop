/*
通过提交更新请求给mutations间接更新state的多个方法的对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOOD_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  ADD_FOODS_COUNT,
  REMOVE_FOODS_COUNT,
  CLEAR_SHOP_CART, RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategories,
  reqShops,
  reqUserinfo,
  reqLogout, reqShopGoods, reqShopRatings, reqShopInfo,reqSearchShops
} from '../api'
import Vue from 'vue'

export default {
  // 异步获取地址
  async getAddress ({commit,state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },

  // 异步获取食品分类列表
  async getFoodCategories ({commit}) {
    // 发送异步ajax请求
    const result = await reqFoodCategories()
    // 提交一个mutation
    if (result.code === 0) {
      const categories = result.data
      commit(RECEIVE_FOOD_CATEGORIES, categories)
    }
  },

  // 异步获取商家列表
  async getShops ({commit,state}) {
    // 发送异步ajax请求
    const {latitude,longitude} = state
    const result = await reqShops(latitude,longitude)
    // 提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },
  // 同步记录用户信息
  recordUser ({commit}, useInfo) {
    commit(RECEIVE_USER_INFO, useInfo)
  },
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUserinfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, userInfo)
    }
  },
  // 异步退出登录
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RECEIVE_RESET_USERINFO)
    }
  },
  // 异步获取goods商品信息
  async getShopGoods ({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, goods)
      // 数据已经更新，通知组件
      callback && callback()
    }
  },
  // 异步获取ratings商品信息
  async getRatings ({commit},callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, ratings)
      callback && callback()
    }
  },
  // 异步获取info商家信息
  async getInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, info)
    }
  },
  // 更新goods中的food的count
  updateFoodsCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(ADD_FOODS_COUNT, {food})
    } else {
      commit(REMOVE_FOODS_COUNT, {food})
      }
  },
  clearShopCart ({commit}) {
    commit(CLEAR_SHOP_CART)
  },
  // 异步获取商家商品列表
  async searchShops({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShops(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
}
