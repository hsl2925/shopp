<template>
	<div>
		<div class="stroll">
			<van-search v-model="value" placeholder="请输入搜索关键词" />
			<div class="stroll_content">
				<ul>
					<li v-for="item in strollList" :key="item.id" @click="strollDetail(item.id)">
						<img :src="item.postImage" alt="" />
						<div class="header_logo">
							<div class="content" v-html="item.content"></div>
							<div class="stroll_bottom">
								<div class="logo_user">
									<img :src="item.postImage" alt="" />
									<div class="buyer">{{item.buyerUserName}}</div>
								</div>
								<span class="dianzan">
									<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/app-assets/community/no-like.png" alt="" />
									<i>5</i>
								</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- 底部导航栏 -->
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
				strollList: []
			}
		},
		created() {
			this.getStrollData()
		},
		methods: {
			getStrollData() {
				axios({
					url: "http://localhost:3000/strollList"
				}).then(res => {
					this.strollList = res.data.data
					console.log(res.data.data)
				})
			},
			// 点击跳转详情页
			strollDetail(id) {
				this.$router.push('/strollDetail?id='+id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.stroll_content {
		ul {
			column-count: 2;
			column-gap: 0;

			li {
				padding: 0 2px;

				img {
					width: 100%;
					vertical-align: middle;
				}

				.header_logo {
					.content {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						overflow: hidden;
						-webkit-line-clamp: 2;
						font-size: 13px;
						color: #393939;
						padding: 0 5px;
					}

					.stroll_bottom {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 10px 5px;
						
						.logo_user {
							display: flex;
							align-items: center;
							justify-content: space-between;
							
							img {
								width: 24px;
								height: 24px;
								border-radius: 50px;
							}
							
							.buyer {
								font-size: 12px;
								padding-left: 5px;
							}
						}
						
						.dianzan {
							display: flex;
							align-items: center;
							text-align: center;
							
							img {
								width: 16px;
								height: 16px;
							}
							
							i {
								padding-left: 0.1875rem;
								font-size: 10px;
								font-style: normal;
								color: #ccc;
							}
						}
					}


				}
			}
		}
	}
</style>