<template>
	<div>
		<van-search v-model="value" placeholder="请输入关键词" @click="goSeach()" />
		<div class="categoryContent">
			<div class="categoryLeft">
				<van-sidebar :style="emptyStyleObject" v-model="activeKey">
					<van-sidebar-item title="新品推荐" @click="categoryRecommend()" />
					<van-sidebar-item title="全部商品" @click="categoryAll()" />
					<van-sidebar-item v-for="(item, index) in sidebar" :key="item.classifyId" :title="item.classifyName"
						@click="categoryclickList(index)" />
				</van-sidebar>
			</div>
			<div class="categoryRight">
				<div class="categoryRightImg">
					<img v-if="categoryImg.length > 0" :src="categoryImg[0].popupImg" alt="">
				</div>

				<div v-if="showRecommend">
					<van-cell style="font-weight: 700;" title="新品推荐" is-link value="更多" />
					<div class="goods">
						<div class="good" v-for="item in categoryPage" :key="item.skuId">
							<div class="goodImg">
								<img :src="item.image" alt="">
							</div>
							<div class="goodTitle">
								<span>{{ item.productName }}</span>
							</div>
						</div>
					</div>
				</div>
				<div v-else-if="!showRecommend">
					<div v-for="item in categoryList[indexNum].index" :key="item.classifyId" style="margin-top: 5px;">
						<van-cell style="font-weight: 700;" :title="item.classifyName" is-link value="更多" />
						<div class="goods">
							<div class="good" v-for="v in item.products" :key="v.skuId">
								<div class="goodImg">
									<img :src="v.image" alt="">
								</div>
								<div class="goodTitle">
									<span>{{ v.productName }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<TabBar />
	</div>
</template>

<script>
	import axios from "axios"
	import TabBar from '@/components/TabBar.vue'

	export default {
		components: {
			TabBar
		},
		data() {
			return {
				value: '',
				activeKey: 0,
				sidebar: [],
				categoryImg: [],
				categoryPage: [],
				categoryList: [],
				showRecommend: true,
				indexNum: 0,
				emptyStyleObject: {}
			}
		},
		created() {
			this.getCategoryList()
			this.categoryRecommend()
			this.getCategoryHeaderData()
		},
		methods: {
			// 获取分类页右侧分类内容
			categoryRecommend() {
				axios({
					url: " http://localhost:3000/categoryList"
				}).then(res => {
					this.categoryPage = res.data.data
					console.log(res.data)
					this.showRecommend = true
				})
			},
			// 获取分类数据
			getCategoryList() {
				axios({
					url: "/classify/getFirstClassify?classifyId="
				}).then(res => {
					this.sidebar = res.data.data
				})
			},
			// 获取分类页右边头部图片数据
			getCategoryHeaderData() {
				axios({
					url: "http://localhost:3000/categoryImg"
				}).then(res => {
					this.categoryImg = res.data.data
				})
			},
			// 搜索页跳转
			goSeach() {
				this.$router.push('/')
			},
			// 全部商品跳转
			categoryAll() {
				this.$router.push('/allProduct')
			},
			// 点击左侧导航栏更新右侧商品数据
			categoryclickList(index) {
				console.log(index)
				axios({
					url: "http://localhost:3000/categoryMoreList"
				}).then(res => {
					this.categoryList = res.data.data
					this.indexNum = index
					this.showRecommend = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.van-search .van-cell {
		padding: 5px 0;
	}

	.van-sidebar .van-sidebar-item {
		padding: 20px 0;
	}

	.van-search {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		z-index: 100;
	}

	.categoryContent {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		display: flex;
		position: relative;
		margin-top: 3.375rem;

		.categoryLeft {
			width: 25%;
			height: 100%;
			background-color: #f5f5f5;
			position: fixed;
			top: 54px;
			left: 0;
			z-index: 999;
		}
	}

	.goods {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-evenly;
		background-color: #fff;
		width: 100%;
		
		.good {
			width: 29%;
			margin-bottom: 5px;
		
			.goodImg {
				width: 100%;
		
				img {
					width: 100%;
				}
			}
		
			.goodTitle {
				span {
					width: 100%;
					display: inline-block;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 12px;
					color: #666;
				}
			}
		}
	}

	.categoryRight {
		width: 75%;
		flex: 1;
		box-sizing: border-box;
		padding: 0px 5px;
		margin-bottom: 51px;
		margin-left: 93px;

		.categoryRightImg {
			margin: 15px 0px 5px 0px;
			width: 100%;
			overflow: hidden;

			img {
				width: 100%;
				height: 8.4375rem;
			}
		}
	}

	.van-sidebar-item--select,
	.van-sidebar-item--select:active {
		font-weight: bold;
	}

	.van-sidebar-item--select,
	.van-sidebar-item--select::before {
		background-color: #000;
		height: 35%;
	}

	.van-sidebar-item--select::before {
		width: 3px;
	}

	.van-sidebar-item {
		font-size: 13px;
		background-color: #f5f5f5;
	}

	.categoryLeft .van-sidebar {
		width: 75%;
		text-align: center;
	}
</style>