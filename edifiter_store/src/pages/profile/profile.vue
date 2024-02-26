<template>
	<div>
		<div class="profile">
			<div class="message_szhi">
				<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/user/icon-xx.png"
					alt="" />
				<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/user/icon-sz.png"
					alt="" />
			</div>
			<div class="profile_usermsg" @click="toIndex()">
				<img src="https://edifier-forum-oss.edifier.com/user/image/default_avatar.png" alt="" />
				<div class="user_msg">
					<span>Edifier84461211</span>
					<i>LV1</i>
					<div class="name">未设置签名</div>
				</div>
				<div class="jifen">
					<span>
						<i>
							<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/user/icon-qd.png"
								alt="" />
						</i>
						签到赚积分
					</span>
				</div>
			</div>
			<!-- 积分 -->
			<div class="integral">
				<ul>
					<li>
						<span class="zero">0</span>
						<span class="discount">
							积分
							<van-icon name="arrow" />
						</span>
					</li>
					<li>
						<span class="zero">0</span>
						<span class="discount">
							优惠券
							<van-icon name="arrow" />
						</span>
					</li>
					<li>
						<span class="zero">0</span>
						<span class="discount">
							收藏
							<van-icon name="arrow" />
						</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- 个人信息 information-->
		<div class="personal">
			<div class="info">
				<ul>
					<li>
						<div class="left">
							<img src="@/assets/icon/icon-wdzj.png" alt="" />
							<span>我的足迹</span>
						</div>
						<van-icon name="arrow" />
					</li>
					<li>
						<div class="left" @click="toAddress()">
							<img src="@/assets/icon/icon-dw.png" alt="" />
							<span>收货地址</span>
						</div>
						<van-icon name="arrow" />
					</li>
					<li>
						<div class="left" @click="toMember()">
							<img src="@/assets/icon/icon-hyqx.png" alt="" />
							<span>会员权益</span>
						</div>
						<van-icon name="arrow" />
					</li>
					<li>
						<div class="left">
							<img src="@/assets/icon/post.png" alt="" />
							<span>我的逛逛贴</span>
						</div>
						<van-icon name="arrow" />
					</li>
				</ul>
			</div>
			<!-- 订单 -->
			<div class="order">
				<div class="order_header">
					<h4>订单</h4>
					<van-icon name="arrow" />
				</div>
				<div class="order_list">
					<ul>
						<li>
							<img src="@/assets/order/1.png" alt="" />
							<span>待付款</span>
						</li>
						<li>
							<img src="@/assets/order/2.png" alt="" />
							<span>待发货</span>
						</li>
						<li>
							<img src="@/assets/order/3.png" alt="" />
							<span>待收货</span>
						</li>
						<li>
							<img src="@/assets/order/4.png" alt="" />
							<span>待评价</span>
						</li>
						<li>
							<img src="@/assets/order/5.png" alt="" />
							<span>售后服务</span>
						</li>
					</ul>
				</div>
			</div>
			<!-- 服务 -->
			<div class="service">
				<div class="service_header">
					<h4>服务</h4>
					<van-icon name="arrow" />
				</div>
				<div class="service_list">
					<ul>
						<li>
							<img src="@/assets/order/1.png" alt="" />
							<span>服务条款</span>
						</li>
						<li>
							<img src="@/assets/order/2.png" alt="" />
							<span>客服中心</span>
						</li>
						<li>
							<img src="@/assets/order/3.png" alt="" />
							<span>价保中心</span>
						</li>
					</ul>
				</div>
			</div>
			<!-- 图片 -->
			<div class="img">
				<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/admin/2023-11-24/a994c879077d4afc87f6e681cf910cad_X5-PRO-%E6%88%91%E7%9A%84%E8%AE%BE%E7%BD%AE%E4%B8%AD%E5%BF%83%E5%B9%BF%E5%91%8A%E4%BD%8D.png"
					alt="" />
			</div>
			<!-- 为你推荐 -->
			<div class="recommend">
				<ul>
					<li v-for="item in imgList" :key="item.id">
						<div class="imgall">
							<div class="overlay-images1" v-if="item.watermarkImgList[0] === ''">
								<img class="img1" :src="item.image" alt="" />
							</div>
							<div class="overlay-images2" v-else>
								<img class="img3" v-for="(img, index) in item.watermarkImgList" :src="img" :key="index"
									alt="" />
								<img class="img2" :src="item.image" alt="" />
							</div>
						</div>
						<div class="message">
							<div class="bot_msg">
								<div class="title">{{item.productName}}</div>
								<div class="all_price">
									<div class="left">
										<span class="price"><i>￥</i>{{item.price}}</span>
										<span class="original"><i>￥</i>{{item.originalPrice}}</span>
									</div>
									<span class="users">{{item.users}}人付款</span>
								</div>
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
				imgList: [] // 处理后的watermarkImgList
			}
		},
		created() {
			this.getPeofileRecommendData()
		},
		computed: {
			filterImgList() {
				return this.imgList.filter(item => {
					// 对 watermarkImgList 进行过滤
					return item.watermarkImgList !== undefined && item.watermarkImgList !== null && item
						.watermarkImgList !== ''
				})
			}
		},
		methods: {
			// 获取推荐商品
			getPeofileRecommendData() {
				axios({
					url: "http://localhost:3000/profileRecommendList"
				}).then(res => {
					const data = res.data.data

					data.forEach(item => {
						item.watermarkImgList = item.watermarkImgList.split(",")
					})

					this.imgList = data

				}).catch(error => {
					console.log(error)
				})
			},
			// 地址页跳转
			toAddress() {
				this.$router.push('/address')
			},
			// 会员页跳转
			toMember() {
				this.$router.push('/member')
			},
			// 登录跳转
			toIndex() {
				this.$router.push('/login')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.profile {
		.message_szhi {
			padding: 10px 0;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			img {
				padding-right: 0.9375rem;
				width: 1.5rem;
				height: 1.5rem;
			}
		}

		&_usermsg {
			display: flex;
			align-items: center;
			margin-left: 0.625rem;

			.user_msg {
				padding-left: 0.625rem;

				span {
					font-size: 16px;
					font-weight: 600;
				}

				i {
					font-size: 10px;
					color: #00a0e8;
					padding: 3px 10px;
					background-color: #d9ecf6;
					font-style: normal;
					margin-left: 0.625rem;
				}

				.name {
					padding-top: 0.3125rem;
					font-size: 12px;
					color: #949399;
				}
			}

			.jifen {
				padding-left: 40px;

				span {
					display: flex;
					align-items: center;
					padding: 5px 12px;
					border-radius: 14px 0px 0px 14px;
					background-color: #000;
					color: #fff;
					font-size: 0.75rem;

					i {
						img {
							width: 16px;
							height: 16px;
						}
					}
				}
			}

			img {
				width: 58px;
				height: 58px;
			}
		}

		// 积分
		.integral {
			ul {
				display: flex;
				align-items: center;
				justify-content: space-between;

				li {
					display: flex;
					flex-direction: column;
					text-align: center;
					margin: 25px;

					.zero {
						font-weight: 700;
					}

					.discount {
						font-size: 0.8125rem;
						color: #949399;
					}
				}
			}
		}
	}

	// 个人信息
	.personal {
		margin: 10px;

		.info {
			background-color: #fff;
			padding: 10px;

			ul {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 100%;

				li {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 154px;
					padding: 10px 10px;

					&:nth-child(-n+2) {
						border-bottom: 1px solid #e7e6e6;
					}

					&:nth-child(1),
					&:nth-child(3) {
						border-right: 1px solid #e7e6e6;
					}

					img {
						width: 1.5rem;
						height: 1.5rem;
					}

					.left {
						display: flex;
						align-items: center;

						span {
							color: #181818;
							font-size: 0.875rem;
							padding-left: 0.3125rem;
						}
					}
				}
			}
		}

		// 订单
		.order {
			margin-top: 0.625rem;
			background-color: #fff;
			padding: 12px 20px;

			&_header {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			&_list {
				margin-top: 20px;

				ul {
					display: flex;
					align-items: center;
					justify-content: space-between;

					li {
						display: flex;
						align-items: center;
						flex-direction: column;

						span {
							padding-top: 0.3125rem;
							font-size: 0.75rem;
							color: #181818;
						}

						img {
							width: 1.5rem;
							height: 1.5rem;
						}
					}
				}
			}
		}

		// 服务
		.service {
			margin-top: 0.625rem;
			background-color: #fff;
			padding: 12px 0;

			&_header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 1.25rem;
			}

			&_list {
				margin-top: 20px;
				padding-left: 16px;

				ul {
					display: flex;
					align-items: center;
					justify-content: start;

					li {
						display: flex;
						align-items: center;
						flex-direction: column;
						text-align: center;
						padding: 0 10px;

						span {
							padding-top: 0.3125rem;
							font-size: 0.75rem;
							color: #181818;
						}

						img {
							width: 1.5rem;
							height: 1.5rem;
						}
					}
				}
			}
		}

		// 图片
		.img {
			margin-top: 0.625rem;

			img {
				width: 100%;
				height: 8rem;
				vertical-align: middle;
			}
		}

		// 为你推荐
		.recommend {
			margin-top: 10px;

			ul {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 100%;

				li {
					width: 49.7%;
					margin-bottom: .5px;

					.overlay-images1 {
						position: relative;
						width: 185px;
						height: 190px;

						.img1 {
							position: absolute;
							width: 100%;
							height: 100%;
						}
					}

					.overlay-images2 {
						position: relative;
						width: 185px;
						height: 190px;

						.img2,
						.img3 {
							position: absolute;
							width: 100%;
							height: 100%;
						}

						.img3 {
							z-index: 999;
						}
					}

					img {
						width: 100%;
						height: 100%;
					}

					.message {
						width: 185px;
						background-color: #fff;

						.bot_msg {
							padding: 0 10px;

							.title {
								display: -webkit-box;
								-webkit-box-orient: vertical;
								overflow: hidden;
								-webkit-line-clamp: 2;
								font-size: 12px;
								color: #6e6d76;
							}

							.all_price {
								display: flex;
								align-items: center;
								justify-content: space-between;
								margin-top: 30px;
								padding-bottom: 5px;

								.price {
									font-weight: 600;
									font-size: 14px;
								}

								.original {
									padding-left: 5px;
									font-size: 10px;
									text-decoration: line-through;
									font-weight: 400;
									color: #949399;
								}

								.users {
									font-size: 10px;
									font-weight: 400;
									color: #949399;
								}

								i {
									font-size: 0.2rem !important;
									font-weight: 400 !important;
								}
							}
						}
					}
				}
			}
		}
	}
</style>