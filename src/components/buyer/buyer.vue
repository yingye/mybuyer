<template>
  <div class="buyer" ref="buyer">
    <div class="buyer-content">
      <div class="overview">
        <h1 class="title">{{buyer.name}}</h1>
        <div class="desc">
          <star :size="36" :score="buyer.score"></star>
          <span class="text">({{buyer.ratingCount}})</span>
          <span class="text">月售{{buyer.sellCount}}单</span>
        </div>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{buyer.bulletin}}</p>
        </div>
        <ul v-if="buyer.supports" class="supports">
          <li class="support-item" v-for="(item,index) in buyer.supports">
            <span class="icon" :class="classMap[buyer.supports[index].type]"></span>
            <span class="text">{{buyer.supports[index].description}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import IScroll from 'iscroll';
  import {saveToLocal, loadFromLocal} from 'common/js/store';
  import star from 'components/star/star';
  import split from 'components/split/split';

  export default {
    props: {
      buyer: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          console.log(this.buyer.id);
          console.log(loadFromLocal(this.buyer.id, 'favorite', false));
          return loadFromLocal(this.buyer.id, 'favorite', false);
        })()
      };
    },
    mounted() {
      this._initScroll();
    },
    watch: {
      buyer() {
        this._initScroll();
        this.$nextTick(() => {
          this.favorite = loadFromLocal(this.buyer.id, 'favorite', false);
        });
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        // console.log(this.favorite);
        saveToLocal(this.buyer.id, 'favorite', this.favorite);
      },
      _initScroll() {
        // console.log(this.$refs.buyer);
        this.$nextTick(() => {
          this.scroll = new IScroll(this.$refs.buyer, {
            click: true
          });
        });
      }
    },
    components: {
      star,
      split
    }
  };
</script>

<style lang="scss">
  @import "../../common/sass/mixin.scss";

  .buyer{
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      position: relative;
      padding: 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .desc{
        padding-bottom: 18px;
        font-size: 0;
        .star{
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text{
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark{
        display: flex;
        padding-top: 18px;
        .block{
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child{
            border: none;
          }
          h2{
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content{
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress{
              font-size: 24px;
            }
          }
        }
      }
      .favorite{
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
        .icon-favorite{
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color: #d4d6d9;
          &.active{
            color: rgb(240, 20, 20);
          }
        }
        .text{
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin{
      padding: 18px 18px 0 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .content-wrapper{
        padding: 0 12px 16px 12px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .content{
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .supports{
        .support-item{
          padding: 16px 12px;
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 0;
          &:last-child{
            
          }
        }
        .icon{
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-image('decrease_4');
          }
          &.discount{
            @include bg-image('discount_4');
          }
          &.guarantee{
            @include bg-image('guarantee_4');
          }
          &.invoice{
            @include bg-image('invoice_4');
          }
          &.special{
            @include bg-image('special_4');
          }
        }
        .text{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
    .pics{
      padding: 18px;
      .title{
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child{
              margin: 0;
            }
          }
        }      
      }
    }
    .info{
      padding: 18px 18px 0 18px;
      color: rgb(7, 17, 27);
      .title{
        padding-bottom: 12px;
        line-height: 14px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 14px;
      }
      .info-item{
        padding: 16px 12px;
        line-height: 16px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
        &:last-child{
          
        }
      }
    }
  }
</style>