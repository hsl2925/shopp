<template>
	<div id="search_more">
		<!-- 搜索 -->
		<div class="header-search">
			<div class="search">
				<van-icon class="icon" color="rgb(96, 98, 102)" name="arrow-left" size="1.3rem" @click="toIndex()" />
				<div class="search-icon">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/search.png"
						alt="">
					<input type="text" v-model="searchText" placeholder="请输入您想要的宝贝">
				</div>
			</div>
			<div class="search-btn">
				<p @click="searchProduct()">搜索</p>
			</div>
		</div>
		<!-- 搜索历史 -->
		<div class="search_history">
			<div class="title">
				<span class="history">搜索历史</span>
				<span @click="removeHistoryProduct()"><img
						src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/ICON_delete@2x.png"
						alt="" /></span>
			</div>
			<div class="history_content">
				<ul>
					<li v-for="keyword in searchHistory" :key="keyword" @click="handleKeywordClick(keyword)">{{keyword}}
					</li>
				</ul>
			</div>
		</div>
		<!-- 猜你想搜 -->
		<div class="search_history">
			<div class="title">
				<span class="history">猜你想搜</span>
				<span @click="refreshBrowser()"><img
						src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/changeBatch.png"
						alt="" /></span>
			</div>
			<div class="history_content">
				<ul>
					<li v-for="s in guessList" :key="s" @click="wantSearch(s)">{{s}}</li>
				</ul>
			</div>
		</div>
		<!-- 热门产品 -->
		<div class="hot_product">
			<div class="hot_header">
				<div class="left">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/Frame@2x.png"
						alt="" />
					<span class="name">
						热门产品
					</span>
				</div>
				<div class="right" @click="refreshBrowser()">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/changeBatch.png"
						alt="" />
				</div>
			</div>
			<div class="hot_content">
				<ul>
					<li v-for="v in searchList" :key="v.shopId">
						<div class="images">
							<div class="overlay1" v-if="v.watermarkImgList[0] === ''">
								<img class="top" :src="v.image" alt="" />
							</div>
							<div class="overlay2" v-else>
								<img class="bottom" v-for="(img, index) in v.watermarkImgList" :src="img" :key="index"
									alt="" />

								<img class="top1" :src="v.image" alt="" />
							</div>
						</div>
						<div class="msg">
							<span class="productName">{{v.productName}}</span>
							<span class="price"><i>￥</i>{{v.price}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import {
		Dialog
	} from 'vant'
	Vue.use(Dialog)

	export default {
		data() {
			return {
				searchList: [],
				guessList: [],
				searchText: '', // keyword
				searchHistory: [], // 搜索历史列表
			}
		},
		created() {
			this.getSearchList()
			this.getGuessSearch()
		},
		computed: {
			filterImgList() {
				return this.searchList.filter(item => {
					// 对 watermarkImgList 进行过滤
					return item.watermarkImgList !== undefined && item.watermarkImgList !== null && item
						.watermarkImgList !== ''
				})
			}
		},
		mounted() {
			this.loadSearchHistory() // 加载搜索历史数据
		},
		methods: {
			// 获取热门产品数据
			getSearchList() {
				axios({
					url: '/search/getHotProducts?topNum=50&randomSize=6&isFirst=false'
				}).then(res => {
					const data = res.data.data

					data.forEach(item => {
						item.watermarkImgList = item.watermarkImgList.split(",")
					})

					this.searchList = data

				}).catch(error => {
					console.log(error)
				})
			},
			// 获取猜你想搜数据
			getGuessSearch() {
				axios({
					url: '/search/getGuessSearch?topNum=50&randomSize=10&isFirst=false'
				}).then(res => {
					this.guessList = res.data.data
					console.log(res.data.data)
				})
			},
			// 调用浏览器刷新
			refreshBrowser() {
				location.reload()
			},
			// 返回首页
			toIndex() {
				this.$router.push('/')
			},
			// 导航到搜索结果页面，并传递搜索关键字作为参数
			searchProduct() {
				const searchKeyword = this.searchText

				// 保存搜索关键词到本地存储，例如 localStorage
				this.saveSearchKeyword(searchKeyword)

				this.$router.push(`/allProduct?keyword=${searchKeyword}`)
			},
			// 搜索历史
			handleKeywordClick(keyword) {
				this.searchText = keyword // 将关键字设置为搜索输入框的值
				this.searchProduct() // 执行搜索操作
			},
			loadSearchHistory() {
				// 从本地存储加载搜索历史数据，例如 localStorage
				const searchHistory = this.getSearchHistory()

				this.searchHistory = searchHistory
			},
			saveSearchKeyword(keyword) {
				if (this.searchText.trim() === '') {
					return
				} else {
					// 将搜索关键词保存到本地存储，例如 localStorage
					const searchHistory = this.getSearchHistory()

					if (!searchHistory.includes(keyword)) {
						searchHistory.push(keyword)
						this.setSearchHistory(searchHistory)
					}
				}
			},
			getSearchHistory() {
				// 从本地存储获取搜索历史数据，例如 localStorage
				return JSON.parse(localStorage.getItem('searchHistory')) || []
			},
			setSearchHistory(searchHistory) {
				// 将搜索历史数据保存到本地存储，例如 localStorage
				localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
			},
			// 删除历史搜索数据
			removeHistoryProduct() {
				Dialog.confirm({
						title: '温馨提示',
						message: '您确定要清空搜索记录吗？',
					})
					.then(() => {
						// 删除整个数组
						this.searchHistory.splice(0, this.searchHistory.length)
						// 清空本地存储中的搜索历史
						localStorage.removeItem('searchHistory')
					})
					.catch(() => {
						// 取消
					})
			},
			// 点击搜索猜你想搜数据
			wantSearch(s) {
				this.searchText = s
				this.searchProduct()
			}
		}
	}
</script>

<style lang="scss" scoped>
	#search_more {
		background-color: #fff;
		height: 10000px;
	}

	.header-search {
		height: 44px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		background-color: #fff;

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

	// 搜索历史
	.search_history {
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 20px;
			padding-left: 10px;
			padding-right: 20px;

			.history {
				font-size: 12px;
				font-weight: 600;
				color: #000;
			}

			img {
				width: 16px;
				height: 16px;
			}
		}

		.history_content {
			margin-top: 20px;

			ul {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin: 0 15px;
				width: 100%;

				li {
					margin: 5px 5px;
					padding: 5px 15px;
					font-size: 13px;
					color: #6e6d76;
					background-color: #f2f5f7;
				}
			}
		}
	}

	// 热门产品
	.hot_header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px 15px;

		.left {
			img {
				width: 16px;
				height: 16px;
			}

			.name {
				font-size: 12px;
			}
		}

		.right {
			img {
				width: 16px;
				height: 16px;
			}
		}
	}

	.hot_product {
		margin: 10px 20px;
		background-color: #f2f5f7;
		border-radius: 5px;

		.hot_content {

			ul {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				flex-wrap: wrap;
				padding: 0 5px;

				li {
					width: 31%;
					padding-left: 6px;

					.images {
						width: 104px;
						height: 110px;

						.overlay1 {
							position: relative;
							width: 104px;
							height: 110px;

							.top {
								position: absolute;
								width: 100%;
								height: 100%;
							}
						}

						.overlay2 {
							position: relative;
							width: 104px;
							height: 110px;

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

					.msg {
						.productName {
							display: -webkit-box;
							-webkit-box-orient: vertical;
							overflow: hidden;
							-webkit-line-clamp: 2;
							font-size: 12px;
							color: #6e6d76;
							margin-top: 5px;
						}

						.price {
							font-weight: 600;
							font-size: 14px;
							padding: 10px 0;
							display: inline-block;
							margin-bottom: 5px;

							i {
								font-size: 12px;
							}
						}
					}
				}
			}
		}
	}
</style>