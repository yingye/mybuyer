<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
    	<ul>
    		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
    			<span class="text">
    				<span></span>{{item.name}}
    			</span>
    		</li>
    	</ul>
    </div>
	  <div class="foods-wrapper" ref="foodsWrapper">
		<ul>
			<li v-for="item in goods" class="food-list food-list-hook">
				<h1 class="title">{{item.name}}</h1>
				<ul>
					<li v-for="food in item.foods" class="food-item">
						<div class="icon">
							<img :src="food.icon">
						</div>
						<div class="content">
							<h2 class="name">{{food.name}}</h2>
							<p class="desc">{{food.description}}</p>
							<div class="extra">
								<span class="count">月售{{food.sellCount}}件</span><span>好评率{{food.rating}}%</span>
							</div>
							<div class="price">
								<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
							</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food" @addCart="addCartParent"></cartcontrol>
              </div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	  </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :deliveryPrice="buyer.deliveryPrice" :min-price="buyer.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import IScroll from 'iscroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  const ERR_OK = 0;

  export default{
    props: {
      buyer: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.$http.get('/api/goods').then((reponse) => {
        reponse = reponse.body;
        if (reponse.errno === ERR_OK) {
          this.goods = reponse.data;
          this.$nextTick(() => {
            this.initScroll();
            this.getHeight();
          });
        }
      });
    },
    methods: {
      selectMenu(index, event) {
        // pc bug ?
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      _drop(target) {
        // 触发shopcart组件中的drop方法
        this.$refs.shopcart.drop(target);
      },
      initScroll() {
        this.menuScroll = new IScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new IScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scrollEnd', (pos) => {
          this.scrollY = Math.abs(Math.round(this.foodsScroll.y));
        });
      },
      getHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      addCartParent(target) {
        this._drop(target);
      }
    },
    components: {
      shopcart,
      cartcontrol
    }
  };
</script>

<style lang="scss">
  @import "../../common/sass/mixin.scss";

  .goods{
  	display: flex;
  	position: absolute;
  	top: 174px;
  	bottom: 46px;
  	width: 100%;
  	overflow: hidden;
  	.menu-wrapper{
  	  flex: 0 0 80px;
  	  width: 80px;//安卓兼容性
  	  background: #f3f5f7;
  	  .menu-item{
  	  	width: 56px;
  	  	height: 54px;
  	  	@include border-1px(rgba(7,17,27,0.1));
  	  	padding: 0 12px;
  	  	line-height: 14px;
  	  	display: flex;
    		align-items: center;
  	  	.text{
  	  		width: 56px;
  	  		vertical-align: middle;
  	  		font-size: 12px;
  	  	}
  	  }
  	  .current{
  	  	position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
        .text{
          @include border-1px-none();
        }
  	  }
  	}
  	.foods-wrapper{
  		flex: 1;
  		.food-list{
  			.title{
  				height: 26px;
  				padding-left: 14px;
  				border-left: 2px solid #d9dde1;
  				line-height: 26px;
  				font-size: 12px;
  				color: rgb(147,153,159);
  				background: #f3f5f7;
  			}
  			.food-item{
  				display: flex;
  				margin: 18px 18px 0;
  				padding-bottom: 18px;
  				@include border-1px(rgba(7,17,27,0.1));
  				&:last-child{
  					@include border-1px-none();
  				}
  				.icon{
  					flex: 0 0 57px;
  					margin-right: 10px;
  					&>img{
  						width: 57px;
  						height: 57px;
  					}
  				}
  				.content{
  					flex: 1;
  					.name{
	            margin: 2px 0 8px 0;
	            //height: 14px;
	            line-height: 14px;
	            font-size: 14px;
	            color: rgb(7, 17, 27);
              //省略号
              //overflow: hidden;
              //text-overflow: ellipsis;
              //white-space: nowrap;
            }
	          .desc, .extra{
	            line-height: 10px;
	            font-size: 10px;
	            color: rgb(147, 153, 159);
	          }
	          .desc{
	            line-height: 12px;
	            margin-bottom: 8px;
	          }
	          .extra{
	            .count{
	              margin-right: 12px;
	            }
	          }
	          .price{
	            font-weight: 700;
	            line-height: 24px;
	            .now{
	              margin-right: 8px;
	              font-size: 14px;
	              color: $ghsPurple;;
	            }
	            .old{
	              text-decoration: line-through;
	              font-size: 10px;
	              color: rgb(147, 153, 159);
	            }
	          }
            .cartcontrol-wrapper{
              position: absolute;
              right: 0;
              bottom: 12px;
            }
  				}
  			}
  		}
  	}
  }
</style>