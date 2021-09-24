<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link to='/search' class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="userInfo._id? '/userInfo' : '/login'" class="header_login" slot="right">
        <span class="header_login_text" v-if="userInfo._id">
          <i class="iconfont icon-person"></i>
        </span>
        <span class="header_login_text" v-else>登录|注册</span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container .border-1px" v-if="foodCategories.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide"  v-for="(smallArr, index) in foodCategoriesArr" :key="index">
            <a href="javascript:" class="link_to_food"  v-for="(category, index) in smallArr" :key="index">
              <div class="food_container">
                <img :src="`${imgBaseUrl}${category.image_url}`">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- 添加分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
<!--        <div class="swiper-button-prev"></div>-->
<!--        <div class="swiper-button-next"></div>-->

        <!-- 如果需要滚动条 -->
        <!--<div class="swiper-scrollbar"></div>-->
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <ShopList></ShopList>
  </section>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import Swiper,{Pagination, Navigation, Autoplay} from 'swiper'
  import 'swiper/swiper-bundle.css'
  import {mapState} from 'vuex'

  Swiper.use([Pagination, Navigation, Autoplay])

  export default {
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components: {
      HeaderTop,
      ShopList
    },
    mounted () {
      this.$store.dispatch('getFoodCategories')
      this.$store.dispatch('getShops')
    },
    // 把食物分类foodCategories一维数组转化成二维数组，实现数据分页
    computed: {
      ...mapState(['address', 'foodCategories', 'userInfo']),

      foodCategoriesArr () {
        const max = 8  // 单页显示食物种类的最大数量
        const arr = []  // 所有要显示的食物种类的容器(空的二维数组)
        let {foodCategories} = this  // 获取vm中foodCategories属性值
        let smallArr = []  // 单页要显示的食物分类的容器
        foodCategories.forEach((foodCategory, index) => {  // 遍历所有的食物种类
          // 把空的单页容器放入所有页的容器中
          if (smallArr.length === 0) {
            arr.push(smallArr)
          }
          // 向单页容器中添加当前遍历到的食物种类
          smallArr.push(foodCategory)
          // 单页容器已经装满
          if (smallArr.length === max) {
            smallArr = []  // 创建新的的空数组
          }
        })
        return arr
      }
    },
    watch: {
      foodCategories (value) {  // foodCategories数组中有了数据，在异步更新界面之前执行
        this.$nextTick(() => {  // 一旦完成界面更新，立即调用回调函数
          // 创建一个swiper对象实现轮播
          new Swiper('.swiper-container', {
            loop: true,
            // 增加分页器
            pagination: {
              el: '.swiper-pagination'
            },
            // 自动轮播
            autoplay: {
              delay: 2000,
              disableOnInteraction: false
            },
            // // 导航箭头
            // navigation: {
            //   nextEl: '.swiper-button-next',
            //   prevEl: '.swiper-button-prev'
            // }
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
.msite  //首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
</style>
