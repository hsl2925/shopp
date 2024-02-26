<template>
	<div style="background: #f8f8f8;">
		<div v-if="Goodshop">
			<div class="header">
				<!-- 顶部搜索 -->
				<div class="header-search">
					<div class="search">
						<van-icon class="icon" color="rgb(96, 98, 102)" name="arrow-left" size="1.3rem"
							@click="toIndexSearch()" />
						<div class="search-icon">
							<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/search.png"
								alt="">
							<input type="text" v-model="searchKeyword" @input="filterResults" :placeholder="place">
						</div>
					</div>
					<div class="search-btn">
						<p @click="filterResults()">搜索</p>
					</div>
				</div>
				<!-- 商品 店铺 -->
				<div class="header-Goodshop">
					<div :class="Goodshop ? 'active' : ''" class="goods" @click="goods()">商品</div>
					<div :class="Goodshop ? '' : 'active'" class="shop" @click="store()">店铺</div>
				</div>
				<div class="header-condition">
					<p style="margin-left:1.5rem ;">销量</p>
					<p style="margin-left:1.5rem ;">价格</p>
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/checkListMode.png"
						alt="">
					<div class="line"></div>
					<div class="screen">
						筛选
						<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/filterIcon.png"
							alt="">
					</div>
				</div>
			</div>
			<div class="goods-list" v-if="filteredResults && filteredResults.length > 0 || initialization">
				<div class="goods">
					<div class="good">
						<ul>
							<li v-for="item in goodsList" :key="item.skuId">
								<!-- 搜索有数据 -->
								<div class="filterProduct" v-if="item.productName.includes(searchKeyword)">
									<div class="goodImg">
										<img class="firstImage"
											src="https://edifier-shop-oss.edifier.com/edifier-shop-image/business/2023-12-15/d4e59d796200451085edc239c9058940_返场.png"
											alt="">
										<img :src="item.image" alt="">
									</div>
									<div class="goodTitle">
										<p>{{ item.productName }}</p>
										<div style="padding: 0.3125rem 0rem;"></div>
										<div class="good-users">
											<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/Frame@2x.png"
												alt="">
											{{ item.users }}人付款
										</div>
										<div style="height: 22px;"></div>
										<div class="good-price">
											￥<p>{{ item.price }}</p>
											<p>￥{{ item.originalPrice }}</p>
										</div>
										<div class="good-shop">
											<p>漫步者官方在线商城</p>
											<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/right-tri.png"
												alt="">
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 搜索无商品时显示 -->
			<div class="noStore" v-else>
				<div class="nullstore">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/admin/2023-05-02/8b3138e354d94cb1ac5d32cb50f3d088_searchEmpty.png"
						alt="" />
					<p class="searchNull">搜索不到你要找的宝贝呢</p>
					<p>换个词试试吧～</p>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="header">
				<div class="header-search">
					<div class="search">
						<van-icon class="icon" color="rgb(96, 98, 102)" name="arrow-left" size="1.3rem" />
						<div class="search-icon">
							<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/search.png"
								alt="">
							<input type="text" placeholder="请输入您想要的宝贝">
						</div>
					</div>
					<div class="search-btn">
						<p>搜索</p>
					</div>
				</div>
				<div class="header-Goodshop">
					<div :class="Goodshop ? 'active' : ''" class="goods" @click="goods()">商品</div>
					<div :class="Goodshop ? '' : 'active'" class="shop" @click="store()">店铺</div>
				</div>
			</div>
			<div class="Store">
				<div class="Store-list" v-for="(item, index) in officialStore" :key="index">
					<div class="Store-header">
						<div class="Store-logo">
							<img :src="item.logo" alt="">
							<p>{{ item.storeName }}</p>
						</div>
						<p class="Store-Title">进店</p>
					</div>
					<div class="Store-img">
						<img :src="item.shopCover" alt="">
					</div>
				</div>
				<div class="Store-bottom">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/admin/2023-05-02/1f17f1556fea442795790691751baee8_reachBottom.png"
						alt="">
					<p>这里到底了哦~~</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				Goodshop: true,
				goodsList: [],
				officialStore: [],
				searchKeyword: this.$route.query.keyword || '', // 获取搜索关键字参数并设置默认值
				filteredResults: [], // 初始化过滤后的结果为空数组
				searchStoreData: [],
				searchGoods: [],
				place: '',
				initialization: true
			}
		},
		created() {
			this.goods()
			this.filterResults()
		},
		computed: {

		},
		methods: {
			goods() {
				this.Goodshop = true
				axios({
					url: "http://localhost:3000/allGoods"
				}).then(res => {
					this.goodsList = res.data.data
					console.log(this.goodsList)
				})
			},
			store() {
				this.Goodshop = false

				axios({
					url: "https://mall-app.edifier.com/search/shop?pageSize=20&page=1"
				}).then(res => {
					this.officialStore = res.data.data.list
				})
			},
			toIndexSearch() {
				this.$router.push('/indexSearch')
			},
			// 搜索结果
			async filterResults() {
				if (this.searchKeyword === '') { // 判空
					this.searchKeyword = this.place
					this.goods() // 搜索为空显示所有商品
					return // 结束方法，不执行后续的异步请求
				}
				axios({
					url: "http://localhost:3000/allGoods?searchKeyword=" + this.searchKeyword
				}).then(res => {
					this.goodsList = res.data.data
					this.initialization = false
					// console.log(this.goodsList)

					if (this.goodsList && this.goodsList.length > 0) {
						this.filteredResults = this.goodsList.filter(good => {
							return good.productName.includes(this.searchKeyword)
						})
					} else {
						this.filteredResults = null
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		box-sizing: border-box;
		background-color: #fff;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 9992;
		width: 100%;

		.header-search {
			height: 44px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			text-align: center;

			.search {
				width: 80%;
				height: 80%;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.search-icon {
					display: flex;
					width: 100%;
					height: 100%;
					align-items: center;
					background-color: #f0f3f4;
					border-radius: 5px;
					padding: 0px 10px;
					font-size: 0.8rem;
					border: none;

					img {
						width: 8%;
					}
				}

				.icon {
					padding: 7px 7px 7px 12px
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
				height: 36px;
				border: none;
				font-size: 1rem;
				display: flex;
				align-items: center;
				margin-right: 20px;
			}
		}

		.header-Goodshop {
			display: flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 41px;

			.goods,
			.shop {
				height: 80%;
				display: flex;
				font-size: 0.875rem;
				align-items: center;
			}

		}

		.header-condition {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			text-align: center;
			height: 2.5625rem;
			margin: 0px 10px;

			p {
				width: 10%;
				font-size: 0.8125rem;
				color: #6e6d76;
			}

			img {
				width: 1.5rem;
				height: 1.5rem;
				margin-left: 1.5rem;
			}

			.screen {
				font-size: 0.8125rem;
				color: #6e6d76;
				display: flex;
				align-items: center;

				img {
					width: 1.2rem;
					height: 1.2rem;
					margin: 0;
				}
			}

			.line {
				width: 0.0313rem;
				height: 1.25rem;
				margin: 0rem 1rem;
				background-color: #b9b7b7;
			}
		}
	}

	.active {
		font-weight: 700;
		border-bottom: 2px solid #000;
	}

	.goods-list {
		margin: 10px 10px 0;

		.good {
			ul {
				width: 100%;

				li {
					.filterProduct {
						display: flex;
						padding: 1rem 0.5rem;
						margin-bottom: 1px;
						background-color: #fff;
					}

					.goodImg {
						width: 40%;
						position: relative;

						img {
							width: 92%;
						}

						.firstImage {
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							z-index: 1;
						}
					}

					.goodTitle {
						width: 60%;
						display: flex;
						flex-direction: column;

						p {
							font-size: 0.8125rem;
							overflow: hidden;
							text-overflow: ellipsis;
							font-weight: 500;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}

					.good-users {
						display: flex;
						align-items: center;
						font-size: 0.625rem;
						color: #ff4a3e;
						background-color: #fff1f0;
						border-radius: 2px;
						padding: 0.25rem 0.25rem 0.25rem 0rem;
						width: fit-content;
						flex-direction: row;

						img {
							width: 1rem;
							height: 1rem;
						}
					}

					.good-price {
						display: flex;
						align-items: center;
						font-size: 0.625rem;

						p:first-child {
							font-size: 15px;
							font-weight: 700;
							color: #181818;
						}

						p:last-child {
							font-size: 0.625rem;
							color: #ccc;
							margin-left: 0.3125rem;
							text-decoration: line-through;
						}
					}

					.good-shop {
						display: flex;
						align-items: center;
						background: #f2f5f7;
						width: fit-content;
						border-radius: 0.75rem;
						padding: 0.25rem 0.25rem 0.25rem 0.5rem;

						p {
							font-size: 0.625rem;
						}

						img {
							width: 1rem;
							height: 1rem;
						}
					}
				}
			}
		}
	}

	.Store {
		padding: 0 0.625rem;

		.Store-list {
			background-color: #fff;
			margin-top: 0.75rem;
			padding: 1rem 0.75rem;

			.Store-header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 0.5rem;

				.Store-logo {
					display: flex;
					align-items: center;

					p {
						font-size: 0.875rem;
					}

					img {
						width: 2.3125rem;
						height: 2.3125rem;
						margin-right: 0.5rem;
					}
				}


				.Store-Title {
					width: 3.875rem;
					height: 1.5rem;
					text-align: center;
					line-height: 1.5rem;
					border-radius: 0.0625rem;
					background: #000;
					color: #fff;
					font-size: 0.75rem;
				}

			}

			.Store-img {
				img {
					width: 100%;
					border-radius: 0.125rem;
				}
			}
		}

		.Store-bottom {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 3.875rem;

			img {
				width: 21%;
			}

			p {
				margin: 0.625rem 0rem;
				color: #ccc;
				font-size: 0.875rem;
			}
		}
	}

	.noStore {
		position: relative;
		height: 85vh;
		text-align: center;

		.nullstore {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			img {
				width: 3.625rem;
				height: 3.125rem;
			}

			p {
				font-size: 13px;
				color: #999;
			}

			.searchNull {
				margin: 5px 0;
				padding-top: 10px;
			}
		}
	}
</style>