<template>
	<div>
		<!-- 搜索 -->
		<div class="header-search">
			<div class="search">
				<van-icon class="icon" color="rgb(96, 98, 102)" name="arrow-left" size="1.3rem" @click="toIndex()" />
				<div class="search-icon">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/search.png"
						alt="">
					<input type="text" placeholder="请输入关键字" @click="toIndexSearch()">
				</div>
			</div>
			<div class="search-btn">
				<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/message.png" alt="" />
			</div>
		</div>
		<!-- 轮播图 -->
		<van-swipe :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="item in swiperList" :key="item.id">
				<img :src="item.imgUrl" alt="" />
			</van-swipe-item>
		</van-swipe>
		<!-- 小列表 4-->
		<div class="reassure">
			<ul>
				<li v-for="item in reassureList" :key="item.id">
					<img :src="item.reassureUrl" alt="" />
					<span>{{ item.name }}</span>
				</li>
			</ul>
		</div>
		<!-- 小列表 10-->
		<div class="diamond">
			<ul>
				<li v-for="item in diamondList" :key="item.id">
					<img :src="item.imgUrl" alt="" />
					<p>{{ item.name }}</p>
				</li>
			</ul>
		</div>
		<!-- 福利专区 -->
		<div class="welfare">
			<div class="welfare_header">
				<ul>
					<li>
						<div class="left">
							<div class="left_title">
								<h3>新人有礼 福利专区</h3>
								<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/app-assets/newuser/next-newuser.png"
									alt="" />
							</div>
							<p>专属红包 | 新人特惠 | 超值购物</p>
						</div>
						<div class="right">
							<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/app-assets/couponcenter/5hb.png"
								alt="" />
						</div>
					</li>
				</ul>
			</div>
			<div class="welfare_list">
				<div class="list_content">
					<ul>
						<li v-for="item in welfareList" :key="item.id">
							<img :src="item.imgUrl" alt="" />
							<span class="new_person">{{item.newPersonPrice}}</span>
							<div class="all_price">
								<span>
									<i>{{item.currentTag}}</i>
									{{item.newPrice}}
								</span>
								<span class="old_price"><i>{{item.currentTag}}</i>{{item.oldPrice}}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 甄选推荐轮播图 -->
		<div class="recommend">
			<div class="recommend_title">
				<h4>甄选推荐</h4>
				<span>更多<van-icon name="arrow" /></span>
			</div>
			<van-swipe :autoplay="3000" indicator-color="black">
				<van-swipe-item v-for="item in recommendList" :key="item.id">
					<img :src="item.image" alt="" />
					<div class="product_name">{{item.productName}}</div>
					<div class="store_price">
						<span class="price">￥{{item.price}}</span>
						<span class="now_buy">立即购买</span>
					</div>
				</van-swipe-item>
			</van-swipe>
		</div>
		<!-- 精品系列 categoryList-->
		<div class="boutique">
			<div class="boutique_list">
				<div class="boutique_header" v-for="item in imgList" :key="item.id">
					<div class="header_top">
						<h4>{{ item.names }}</h4>
						<span>更多<van-icon name="arrow" /></span>
					</div>
					<div class="boutique_content">
						<ul>
							<li v-for="v in item.productList" :key="v.id"
								@click="productId(v.shopId, v.productId, v.skuId)">
								<div class="images">
									<div class="overlay1" v-if="v.watermarkImgList[0] === ''">
										<img class="top" :src="v.image" alt="" />
									</div>
									<div class="overlay2" v-else>
										<img class="bottom" v-for="(img, index) in v.watermarkImgList" :src="img"
											:key="index" alt="" />

										<img class="top1" :src="v.image" alt="" />
									</div>
								</div>
								<div class="line">
									<div class="line_all">
										<div class="miaoshu">
											<span class="product_name">{{v.productName}}</span>
											<span class="product_brief">{{v.productBrief}}</span>
										</div>
										<div class="discount">
											<div class="reduce_price" v-if="v.downPrice !==0">立减{{v.downPrice}}元</div>
											<div class="null" v-else></div>
										</div>
										<div class="price">
											<span class="delivery"><i>￥</i>{{v.deliveryPrice}}</span>
											<span class="original"><i>￥</i>{{v.originalPrice}}</span>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- 底部导航 -->
		<TabBar />
	</div>
</template>

<script>
	import axios from 'axios'
	import TabBar from '@/components/TabBar.vue'

	export default {
		components: {
			TabBar
		},
		data() {
			return {
				swiperList: [],
				reassureList: [],
				diamondList: [],
				welfareList: [],
				recommendList: [],
				categoryList: [],
				imgList: [] // 处理后的watermarkImgList
			}
		},
		created() {
			this.getSwiperData()
			this.getReassureData()
			this.getDiamondData()
			this.getWelfareData()
			this.getSwiperRecommendData()
			this.getCategoryData()
		},
		computed: {
			// 对 productList 数据进行过滤
			filterImgList() {
				return this.imgList.filter(item => {
					return item.productList.filter(product => product.watermarkImgList !== '' && product
						.watermarkImgList !== null).length === item.productList.length
				})
			}
		},
		methods: {
			// 轮播图
			getSwiperData() {
				axios({
					url: "/banner/getList"
				}).then(res => {
					this.swiperList = res.data.data
				})
			},
			// 原装正品
			getReassureData() {
				axios({
					url: "http://localhost:3000/reassureList"
				}).then(res => {
					this.reassureList = res.data.data
				})
			},
			// 列表
			getDiamondData() {
				axios({
					url: "/diamondPosition/getList"
				}).then(res => {
					this.diamondList = res.data.data
				})
			},
			// 福利专区
			getWelfareData() {
				axios({
					url: "http://localhost:3000/welfareList"
				}).then(res => {
					this.welfareList = res.data.data
				})
			},
			// 为你推荐轮播图
			getSwiperRecommendData() {
				axios({
					url: "http://localhost:3000/recommendList"
				}).then(res => {
					this.recommendList = res.data.data
				})
			},
			// 为你推荐
			getCategoryData() {
				axios({
					url: "/displayCategories/pageAndGetProducts?page=1&pageSize=999&displayType=10"
				}).then(res => {
					const data = res.data.data.list

					data.forEach(item => {
						item.productList.forEach(product => {
							product.watermarkImgList = product.watermarkImgList.split(",")
						})
					})

					this.imgList = data
					console.log(data)

				}).catch(error => {
					console.log(error)
				})
			},
			// 商品详情页跳转 传参
			productId(shopId, productId, skuId) {
				this.$router.push(`/productId?shopId=${shopId}&productId=${productId}&skuId=${skuId}`)
			},
			// 跳转搜索
			toIndexSearch() {
				this.$router.push('/indexSearch')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header-search {
		height: 44px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 20px;
		left: 0;
		z-index: 9991;
		opacity: 0.6;

		.search {
			width: 85%;
			height: 85%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.search-icon {
				display: flex;
				width: 100%;
				height: 100%;
				align-items: center;
				background-color: #f0f3f4;
				padding: 0px 10px;
				font-size: 0.8rem;
				border: none;

				img {
					width: 8%;
				}
			}

			.icon {
				padding: 7px 7px 7px 12px;
			}

			input {
				border: none;
				width: 100%;
				height: 100%;
				background-color: #f0f3f4;
				padding: 0px 10px;
			}
		}

		.search-btn {
			img {
				width: 29px;
				height: 29px;
			}
			margin-right: 20px;
		}
	}

	// 轮播图
	.my-swipe .van-swipe-item {
		color: #fff;
		font-size: 20px;
		text-align: center;
	}

	.van-swipe-item img {
		width: 100%;
		height: 19.875rem;
	}

	.my-swipe ::v-deep .van-swipe__indicator {
		width: 6px;
		height: 6px;
		border-radius: 0 !important;
		background-color: #fff;
	}

	// 小列表4
	.reassure {
		ul {
			display: flex;
			padding: 13px 0;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-bottom: 1px solid #f4f6f8;

			li {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				img {
					width: 0.75rem;
					height: 0.75rem;
				}

				span {
					padding-left: 0.3125rem;
					font-size: 0.75rem;
					font-weight: 400;
					color: #949399;
				}
			}
		}
	}

	// 小列表 10
	.diamond {
		background-color: #fff;

		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			padding: 0.9375rem 10px 0;
			width: 95%;

			li {
				padding-bottom: 1.25rem;
				width: 19%;
				text-align: center;

				img {
					width: 49px;
					height: 49px;
				}

				p {
					font-size: 12px;
				}
			}
		}
	}

	// 福利专区
	.welfare {
		background-image: url(https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/app-assets/user/BG.png?random=0.8209637616740286);
		background-size: 100% 100%;
		background-repeat: no-repeat;

		&_header {
			height: 3.625rem;

			ul {
				padding: 10px 15px;

				li {
					display: flex;
					justify-content: space-between;

					.left {
						.left_title {
							display: flex;
							align-items: center;
						}

						p {
							font-size: 0.8125rem;
							padding-top: 0.3125rem;
						}

						img {
							width: 1rem;
							height: 1rem;
						}
					}

					.right {
						img {
							width: 6.0625rem;
							height: 3.625rem;
						}
					}
				}
			}
		}

		&_list {
			margin: 10px 10px 5px;
			height: 10.1875rem;

			.list_content {
				background-color: #fff;
				border-radius: 5px;
				padding: 5px 0 10px;

				ul {
					display: flex;
					justify-content: space-between;
					align-items: center;

					li {
						text-align: center;

						.new_person {
							padding: 2px 10px;
							font-size: 13px;
							background-color: #ededed;
							color: #606266;
						}

						img {
							width: 5rem;
							height: 5rem;
							padding-bottom: 5px;
						}

						.all_price {
							margin-top: 13px;

							.old_price {
								color: #ccc;
								font-size: 10px;
								text-decoration: line-through;
							}

							span {

								i {
									font-size: 10px;
									font-size: 0.2rem;
									font-style: normal;
								}
							}
						}
					}
				}
			}
		}
	}

	// 甄选推荐轮播图
	.recommend {
		height: 384px;
		margin: 5px 10px;

		.van-swipe {
			padding: 0 10px;
			height: 100%;
			background-color: #fff;
			margin-bottom: 20px;
			padding-bottom: 15px;

			.van-swipe-item {
				img {
					display: inline-block;
					margin-top: -10px;
					height: 300px;
					width: 20.625rem;
					box-sizing: border-box;
				}

				.product_name {
					width: 95%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 1rem;
					font-weight: 500;
					color: #000;
					margin-top: -10px;
				}

				.van-swipe__indicator {
					background-color: #b3b3b3;
				}

				.store_price {
					margin-top: 1.25rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 90%;

					.price {
						font-size: 1rem;
						font-weight: 600;
						color: #000;
					}

					.now_buy {
						background-color: #000;
						font-size: 14px;
						padding: 5px 10px;
						color: #fff;
					}
				}
			}
		}

		&_title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 10px 0;
			background-color: #fff;
		}
	}

	// 精品系列boutique
	.boutique {
		margin-top: 50px;
		padding: 0 0.625rem;

		&_header {
			.header_top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px 10px 0;
				background-color: #fff;
				margin-top: 5px;
			}

			.boutique_content {
				ul {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					width: 100%;

					li {
						width: 49.7%;
						margin-bottom: .5px;
						height: 100%;

						.images {
							width: 185px;

							.overlay1 {
								position: relative;
								width: 100%;
								height: 190px;

								.top {
									position: absolute;
									width: 100%;
									height: 100%;
								}
							}

							.overlay2 {
								position: relative;
								width: 185px;
								height: 190px;

								.bottom,
								.top1 {
									position: absolute;
									width: 100%;
									height: 100%;
								}

								.bottom {
									z-index: 999;
								}
							}

							img {
								width: 100%;
								height: 100%;
							}
						}

						.line {
							padding-bottom: 10px;
							width: 185px;
							background-color: #fff;

							.line_all {
								padding: 0 10px;

								.miaoshu {
									.product_name {
										display: -webkit-box;
										-webkit-box-orient: vertical;
										overflow: hidden;
										-webkit-line-clamp: 2;
										font-size: 13px;
										color: #666;
									}

									.product_brief {
										padding: 10px 0;
										width: 100%;
										display: inline-block;
										white-space: nowrap;
										overflow: hidden;
										text-overflow: ellipsis;
										font-size: 11px;
										color: #666;
									}
								}

								.discount {
									.reduce_price {
										border: 0.5px solid #e87948;
										color: #e87948;
										font-size: 11px;
										display: inline-block;
										padding: 0 2px;
									}

									.null {
										border: 0;
										font-size: 11px;
										display: inline-block;
										padding: 0 2px;
									}
								}

								.price {
									margin-top: 10px;

									.delivery {
										padding-right: 5px;
										font-size: 1.125rem;
										font-weight: 700;
										color: #000;

										i {
											font-size: 0.75rem;
											font-style: normal;
										}
									}

									.original {
										padding-left: 5px;
										font-size: 0.625rem;
										color: #ccc;
										text-decoration: line-through;

										i {
											font-style: normal;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>