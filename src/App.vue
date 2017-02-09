<template>
  <div>
    <v-header :buyer="buyer"></v-header>
    <div class="nav">
      <div class="nav-item">
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{path:'/comments'}">评论</router-link>
      </div>
      <div class="nav-item">
        <router-link :to="{path:'/buyer'}">买手</router-link>
      </div>
    </div>
    <router-view :buyer="buyer" keep-alive></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from 'common/js/util.js';
  import header from 'components/header/header.vue';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        buyer: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/buyer').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.buyer = Object.assign({}, this.buyer, response.data);
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="scss">
  @import "common/sass/mixin.scss";

  .nav {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));
    .nav-item {
      flex: 1;
      text-align: center;
      &>a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
        &.router-link-active {
        color: $ghsPurple;
        }
      }
    }
  }
</style>
