<template>
	<div id="order">
		<div class="header">
			<van-icon name="arrow-left" @click="toDetail()" />
			<h4>确认订单</h4>
		</div>
		<div class="confirmOrder">
			<div class="address">
				<div class="left">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/locate.png"
						alt="" />
					<div class="center">
						<div class="address_detail">
							<span>广东省-佛山市-南海区-桂城街道</span>
							<span style="font-size: 14px; margin-bottom: 10px;">季华东路101号</span>
						</div>
						<div class="name">
							<span>黄施丽</span>
							<span>13197607296</span>
						</div>
					</div>
				</div>
				<van-icon style="color: #ededee;" name="arrow" />
			</div>
			<div class="store">
				<div class="store_name">
					<span>
						<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/shop.png"
							alt="" />
					</span>
					<span style="font-size: 12px; margin-bottom: 5px;">
						漫步者官方在线商城
					</span>
				</div>
				<div class="product">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/business/2023-08-25/a14c46162c7046be94032fb3b686a853_新品标空白(2).png"
						alt="" />
					<div class="product_name">
						<p>漫步者花再NEW-X Pro 光冷能量音箱 潮流电竞氛围灯游戏桌面蓝牙音响</p>
						<span class="color">天空蓝</span>
						<div class="price">
							<div class="left">
								<i>￥</i>
								<span>1209</span>
							</div>
							<div class="num">x1</div>
						</div>
					</div>
				</div>
			</div>
			<div class="freight">
				<ul>
					<li>
						<span>运费</span>
						<span><i>￥</i>0</span>
					</li>
					<li>
						<span>订单备注</span>
						<span style="font-weight: 400;color: #999;">无备注<van-icon style="color: #ededee;"
								name="arrow" /></span>
					</li>
				</ul>
			</div>
			<div class="storePrice">
				<ul>
					<li>
						<span class="storeTotle">商品总价</span>
						<span><i>￥</i>1209.00</span>
					</li>
					<li>
						<span>优惠券</span>
						<div class="noyhui">
							<span>暂无优惠券可用</span>
							<van-icon style="color: #ededee;" name="arrow" />
						</div>
					</li>
					<li>
						<span>优惠合计</span>
						<div class="price">
							<span>-￥</span>
							<span>0</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="invoice">
				<span>发票</span>
				<div class="left">
					<span>不开发票</span>
					<van-icon style="color: #ededee;" name="arrow" />
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="computPrice">
				<div class="totalPrice"><span style="color: #949399;">共1件 | 合计:</span> <span class="price"><i>￥</i>1209.00</span></div>
				<div class="btn" @click="goBuy()">去付款</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			// 详情页
			toDetail() {
				this.$router.push('/productId')
			}
		}
	}
</script>

<style lang="scss" scoped>
	#order {
		height: 100vh;
		background-color: #f7f7f7;
	}

	.header {
		background-color: #fff;
		color: #181818;
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		padding: 10px 15px;

		h4 {
			text-align: center;
			width: 320px;
		}
	}

	.confirmOrder {
		margin: 0 10px;

		.address {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10px;
			background-color: #fff;
			border-radius: 5px;
			padding: 15px 15px;

			.left {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 12px;

				img {
					width: 24px;
					height: 24px;
				}

				.center {
					.address_detail {
						display: flex;
						flex-direction: column;
						padding-left: 10px;
					}

					.name {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-left: 10px;
						color: #949399;
					}
				}
			}
		}

		.store {
			margin-bottom: 10px;
			background-color: #fff;
			border-radius: 5px;
			padding: 15px 15px;

			.store_name {
				display: flex;
				align-items: center;

				span {
					img {
						width: 20px;
						height: 20px;
					}
				}
			}

			.product {
				display: flex;
				align-items: center;
				justify-content: space-between;

				img {
					width: 85px;
					height: 90px;
				}

				&_name {
					display: flex;
					flex-direction: column;

					p {
						width: 260px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 15px;
					}

					.color {
						padding: 10px 0;
						font-size: 12px;
					}

					.price {
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: 260px;

						.left {
							font-size: 15px;
							font-weight: 600;
						}

						.num {
							font-size: 10px;
						}
					}
				}
			}
		}

		.freight {
			margin-bottom: 10px;
			font-size: 12px;

			ul {
				padding: 18px 15px;
				background-color: #fff;
				border-radius: 5px;

				li:nth-child(1),
				li:nth-child(2) {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #181818;
				}

				li:nth-child(2) {
					margin-top: 20px;
				}
			}
		}

		.storePrice {
			margin-bottom: 10px;
			font-size: 12px;

			ul {
				padding: 18px 15px;
				background-color: #fff;
				border-radius: 5px;

				li:nth-child(1),
				li:nth-child(2),
				li:nth-child(3) {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #181818
				}

				li:nth-child(2) {
					margin: 20px 0;
				}

				li:nth-child(3) {
					font-size: 15px;
				}
			}
		}

		// 发票
		.invoice {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 18px 15px;
			font-size: 12px;
			background-color: #fff;
			color: #181818;
			border-radius: 5px;
		}
	}

	.footer {
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		
		.computPrice {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 15px 10px;
			
			.totalPrice {
				font-size: 12px;
				
				.price {
					font-weight: 600;
					font-size: 16px;
				}
			}
			
			.btn {
				padding: 8px 30px;
				background-color: #181818;
				border-radius: 50px;
				color: #fff;
				font-size: 13px;
			}
		}
	}
</style>