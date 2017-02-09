<template>
  <div class="commentselect">
    <div class="comment-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{'active':selectTypeTemp===2}">{{desc.all}}<span
          class="count">{{comments.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{'active':selectTypeTemp===0}">{{desc.positive}}<span
          class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{'active':selectTypeTemp===1}">{{desc.negative}}<span
          class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContentTemp}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      comments: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data() {
      return {
        onlyContentTemp: this.onlyContent,
        selectTypeTemp: this.selectType
      };
    },
    computed: {
      positives() {
        return this.comments.filter((comment) => {
          return comment.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.comments.filter((comment) => {
          return comment.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        this.selectTypeTemp = type;
        this.$emit('selectType', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        this.onlyContentTemp = !this.onlyContentTemp;
        this.$emit('toggleContent', this.onlyContentTemp);
      }
    }
  };
</script>

<style lang="scss">
  @import "../../common/sass/mixin.scss";

  .commentselect{
    .comment-type{
      padding: 18px 0;
      margin: 0 18px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;
      .block{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        line-height: 16px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77, 85, 93);
        &.active{
          color: #fff;
        }
        .count{
          margin-left: 2px;
          font-size: 8px;
        }
        &.positive{
          background: rgba(126, 26, 131, 0.2);
          &.active{
            background: $ghsPurple;
          }
        }
        &.negative{
          background: rgba(77, 85, 93, 0.2);
          &.active{
            background: rgb(77, 85, 93);
          }
        }
      }
    }
    .switch{
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;
      &.on{
        .icon-check_circle{
          color: $ghsPink;
        }
      }
      .icon-check_circle{
        display: inline-block;
        vertical-align: top;
        margin-right: 4px;
        font-size: 24px;
      }
      .text{
        display: inline-block;
        vertical-align: top;
        font-size: 12px;
      }
    }
  }
</style>