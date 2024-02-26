<template>
	<div>
		<!-- 轮播图 -->
		<div class="swiper">
			<van-swipe class="my-swipe" @change="onChange" :autoplay="3000" indicator-color="black">
				<van-swipe-item v-for="img in productDetail.images" :key="img">
					<div class="swiper_img">
						<img class="img" :src="img" alt="" />
					</div>
				</van-swipe-item>

				<template #indicator>
					<div class="custom-indicator">{{ current + 1 }}/6</div>
				</template>
			</van-swipe>
		</div>
		<!-- 商品信息-->
		<div class="product">
			<!-- 商品描述 -->
			<div class="product_msg">
				<div class="name">{{productDetail.productName}}</div>
				<span class="brief">{{productDetail.productBrief}}</span>
			</div>
			<!-- 商品价格-->
			<div class="product_price">
				<ul>
					<div class="allprice">
						<li class="price"><i>￥</i>{{productDetail.price}}</li>
						<li class="originalPrice">原价:<span>￥{{productDetail.originalPrice}}</span></li>
					</div>
					<li class="users">已售<span>{{productDetail.users}}+</span></li>
				</ul>
				<div class="delivaly">
					<span class="free">包邮</span>
					<span class="shipping">24小时发货</span>
				</div>
			</div>
			<!-- 店铺 -->
			<div class="store">
				<div class="left">
					<img :src="productDetail.shopLogo" alt="" />
					<div class="new_product">
						<h4>{{productDetail.shopName}}</h4>
						<span class="productNumber">{{productDetail.productNumber}}件商品</span>
						<span class="shelveState">上新{{productDetail.shelveState}}件</span>
					</div>
				</div>
				<div class="goStore">
					<span>进店</span>
					<van-icon name="arrow" />
				</div>
			</div>
			<!-- 同店好货 -->
			<div class="good_store">
				<h4>同店好货</h4>
				<div class="store_list">
					<ul v-for="k in productDetail.similarProducts" :key="k">
						<li>
							<div class="bg" v-if="k.watermarkImgList === '' || !k.watermarkImgList">
								<img class="image1" :src="k.image" alt="" />
							</div>
							<div class="bg_bottom" v-else>
								<img class="image2" :src="k.image" alt="" />
								<img class="image3" :src="k.watermarkImgList" alt="" />
							</div>
							<div class="content">
								<div class="productName">
									<span>{{k.productName}}</span>
								</div>
								<div class="price">
									<i>￥</i>
									<span>{{k.price}}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="detail_store">
				<h4>详情</h4>
				<div class="text_img">
					<div class="aa" v-html="productDetail.text"></div>
				</div>

			</div>
		</div>
		<!-- 底部 -->
		<van-goods-action>
			<van-goods-action-icon icon="shop-o" text="店铺" color="black" />
			<van-goods-action-icon icon="cart-o" text="购物车" @click="goCart()" />
			<van-goods-action-icon icon="like-o" text="收藏" color="black" />
			<div class="btn">
				<button class="jiagou" @click="addCart()">加购</button>
				<button class="buy" @click="toConfirmOrder()">立即购买</button>
			</div>
		</van-goods-action>
	</div>
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import {
		Toast
	} from 'vant'
	Vue.use(Toast)

	export default {
		data() {
			return {
				productDetail: {},
				current: 0,
				cartList: []
			}
		},
		created() {
			this.getIndexProductDetail()
		},
		methods: {
			getIndexProductDetail() {
				axios({
					url: `/product/getById?shopId=${this.$route.query.shopId}&productId=${this.$route.query.productId}&skuId=${this.$route.query.skuId}`
				}).then(res => {
					this.productDetail = res.data.data
					console.log(res.data.data)
				})
			},
			onChange(index) {
				this.current = index
			},
			// 购物车页面跳转
			goCart() {
				this.$router.push('/cart')
			},
			addCart() {
				// 获取当前商品的信息
				let productInfo = {
					id: this.productDetail.skuId,
					productName: this.productDetail.productName,
					image: this.productDetail.image,
					price: this.productDetail.price,
					num: 1, // 初始数量为1
					checked: false // 默认不选中
				}
				
				// 发送 GET 请求获取购物车数据
				axios.get('http://localhost:3000/cartList').then(res => {
					let cartList = res.data.data
					console.log(res.data.data)
					let hasItem = false
					
					// 遍历购物车列表，查找是否已存在相同的商品
					for (let item of cartList) {
						if (item.id === productInfo.id) {
							// 已存在相同的商品，将商品数量加1
							item.num++
							axios({
								url: "http://localhost:3000/cartList/" + item.id,
								method: "PUT",
								data: item
							}).then(res => {
								console.log(res)
								Toast.success('购物车已存在该商品')
							})
							hasItem = true
							break
						}
					} 
					// 如果购物车列表中不存在相同的商品，则添加新商品到购物车列表中
					if (!hasItem) {
						// 发送 POST 请求添加商品到购物车列表
						axios({
							url: "http://localhost:3000/cartList",
							method: "POST",
							data: productInfo
						}).then(res => {
							console.log(res)
							Toast.success('加入购物车成功')
						})
					}
				})
			},
			// 确认订单
			toConfirmOrder() {
				this.$router.push('/confirmOrder')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		.swiper_img {
			background-color: #fff;
			padding: 0 6%;
			margin-top: -12%;

			.img {
				width: 100%;
			}
		}

		.custom-indicator {
			position: absolute;
			right: 60px;
			bottom: 20px;
			padding: 5px 15px;
			font-size: 12px;
			background: rgba(102, 102, 102);
			border-radius: 20px;
			color: #fff;
		}
	}

	.product {
		margin: 0 10px;

		// 商品描述
		&_msg {
			padding: 13px 10px;
			background-color: #fff;

			.name {
				font-size: 16px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				-webkit-line-clamp: 2;
				margin-bottom: 15px;
			}

			.brief {
				font-size: 10px;
				color: #868686;
			}
		}

		// 商品价格
		&_price {
			padding: 20px 10px;
			background-color: #fff;
			margin-top: 5px;

			ul {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.allprice {
					display: flex;
					align-items: center;

					.price {
						font-size: 25px;
						font-weight: 600;
						color: #000;
						letter-spacing: 1px;

						i {
							font-size: 12px;
						}
					}

					.originalPrice {
						padding-left: 10px;
						font-size: 13px;
						color: #38363f;

						span {
							text-decoration: line-through;
						}
					}
				}

				.users {
					color: #949399;

					span {
						padding-left: 10px;
					}
				}
			}

			.delivaly {
				margin-top: 8px;

				.free {
					font-size: 12px;
					background-color: #6e6d76;
					padding: 2px 5px;
					color: #fff;
				}

				.shipping {
					margin-left: 5px;
					font-size: 11px;
					color: #eb4a68;
					background-color: #fae7ea;
					padding: 2px 5px;
				}
			}
		}

		// 店铺
		.store {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			padding: 20px 10px;
			margin-top: 5px;

			.left {
				display: flex;
				align-items: center;
				padding-left: 10px;

				img {
					width: 49px;
					height: 49px;
				}

				.new_product {
					margin-left: 5px;

					h4 {
						margin-bottom: 5px;
					}

					.productNumber,
					.shelveState {
						font-size: 12px;
						background-color: #f0f3f4;
						padding: 2px 5px;
					}

					.shelveState {
						margin-left: 5px;
					}
				}
			}

			.goStore {
				padding: 5px 10px;
				font-size: 12px;
				background-color: #f0f3f4;
			}
		}

		// 同店好货
		.good_store {
			background-color: #fff;
			margin-top: 1px;
			width: 100%;

			h4 {
				padding-top: 15px;
				padding-left: 10px;
			}

			.store_list {
				display: flex;
				overflow-x: auto;
				align-items: center;
				justify-content: space-between;
				overflow-y: hidden;
			}

			.store_list::-webkit-scrollbar {
				display: none;
			}

			ul {
				height: 185px;

				li {
					width: 122px;
					height: 122px;

					.bg {
						position: relative;
						width: 100%;
						height: 100%;

						.image1 {
							position: absolute;
							width: 100%;
							height: 100%;
						}
					}

					.bg_bottom {
						position: relative;
						width: 100%;
						height: 100%;

						.image2,
						.image3 {
							position: absolute;
							width: 100%;
							height: 100%;
						}
					}

					.image3 {
						z-index: 999;
					}

					.content {
						padding: 0 10px;

						.productName {
							display: -webkit-box;
							-webkit-box-orient: vertical;
							overflow: hidden;
							-webkit-line-clamp: 2;
							font-size: 12px;
							color: #666;
						}

						.price {
							i {
								font-size: 10px;
							}

							span {
								font-size: 15px;
								font-weight: 600;
							}
						}
					}
				}
			}
		}

		// text
		.detail_store {
			h4 {
				margin-top: 5px;
				padding: 12px 10px;
				background-color: #fff;
			}

			.text_img ::v-deep img {
				width: 100%;
			}
		}
	}

	.van-goods-action {
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		padding: 5px 0;
		z-index: 9991;

		.jiagou {
			padding: 10px 20px;
			background: #fff;
			border: .5px solid #000;
			font-size: 14px;
			font-weight: 600;
			color: #666666;
			margin-left: 10px;
		}

		.buy {
			margin-left: 5px;
			padding: 11px 50px;
			border: 0;
			font-size: 14px;
			font-weight: 600;
			background-color: #000;
			color: #fff;
		}
	}
</style>