<template>
	<div>
		<header>
			<span class="shopCart">购物车</span>
			<span class="manner" @click="edit()">管理</span>
		</header>

		<section v-if="cartList.length == 0">
			<van-empty description="购物车空空如也" />
		</section>

		<section v-else>
			<div class="store">
				<van-checkbox v-model="selectAll" @change="selectHandle">漫步者官方在线商城</van-checkbox>
				<van-image
					src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/shop.png"
					alt="" width="24" />
				<van-icon name="arrow" />
			</div>

			<div class="cartItem">
				<carItem @update-price="updatePriceHandle" :data="item" v-for="(item, index) in cartList" :index="index"
					:key="index" />
			</div>
		</section>

		<footer v-if="isClickManagement">
			<van-checkbox v-model="selectAll" icon-size="18"><span style="font-size: .8rem;"
					@change="selectHandle">全选</span></van-checkbox>
			<div class="computPrice">
				<div class="totalPrice">共{{ totalNum }}件 | 合计: <span><i>￥</i>{{ totalPrice }}</span></div>
				<button @click="goBuy()">结算</button>
			</div>
		</footer>

		<footer v-else v-for="(item, index) in cartList" :index="index" :key="index">
			<div class="delete_btn">
				<van-checkbox v-model="selectAll" @change="selectHandle" icon-size="18"><span
						style="font-size: .8rem;">全选</span></van-checkbox>
				<div class="deleteBtn">
					<div class="delete" @click="deleteCartGoods(item.id, index)">删除</div>
				</div>
			</div>
		</footer>

		<TabBar />
	</div>
</template>

<script>
	import TabBar from '@/components/TabBar.vue'
	import carItem from '@/components/carItem.vue'
	import axios from 'axios'
	import Vue from 'vue'
	import {
		Toast
	} from 'vant'
	Vue.use(Toast)

	export default {
		components: {
			TabBar,
			carItem,
		},
		data() {
			return {
				selectAll: false,
				num: 0,
				total: 0,
				// 购物车数据
				cartList: [],
				isClickManagement: false,
				deletedProductId: null,
				selectedIds: [], // 选中的商品 id 数组
			}
		},
		created() {
			this.init()
			this.getCartData()
			this.edit()
		},
		computed: {
			totalPrice() {
				// 计算总价格
				let price = 0

				this.cartList.forEach(item => {
					if (item.checked) {
						price += item.price * item.num
					}
				})

				return price.toFixed(2)
			},
			totalNum() {
				// 计算总数量
				let num = 0
				this.cartList.forEach(item => {
					if (item.checked) {
						num += item.num
					}
				})
				return num
			}
		},
		methods: {
			init() {
				// 读取本地存储购物车
				this.getCartDataFromLocal()
			},
			// 同步数据到缓存
			saveCartDataToLocal() {
				localStorage.setItem('cart', JSON.stringify(this.cartList))
			},
			getCartDataFromLocal() {
				this.cartList = JSON.parse(localStorage.getItem('cart') || '[]')
			},
			// 检查是否全选
			checkAll() {
				this.selectAll = this.cartList.every(item => {
					return item.checked
				})
			},
			// 获取购物车数据
			getCartData() {
				axios({
					url: "http://localhost:3000/cartList"
				}).then(res => {
					this.cartList = res.data.data
					console.log(res)
				})

				this.saveCartDataToLocal()
			},
			// 选择全部
			selectHandle(e, value) {
				console.log(e, value)
				this.cartList.forEach(item => {
					item.checked = this.selectAll
				})
			},

			// 更新价格
			updatePriceHandle(checked, num, index) {
				// 修改对应数据
				this.cartList[index].checked = checked
				this.cartList[index].num = num
				this.saveCartDataToLocal()
				this.checkAll()
			},
			// 点击管理
			edit() {
				this.isClickManagement = !this.isClickManagement
			},
			// 点击删除
			deleteCartGoods(id, index) {
				axios({
					url: "http://localhost:3000/cartList/" + id,
					method: "DELETE",
				}).then(res => {
					console.log(res)
					Toast.success("删除成功！")
					this.cartList.splice(index, 1)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 44px;
		background-color: #fff;
		position: relative;

		.shopCart {
			text-align: center;
			width: 60%;
		}

		.manner {
			width: 20%;
			text-align: center;
		}
	}

	.store {
		display: flex;
		align-items: center;
		font-size: 14px;
		background-color: white;
		padding: 10px 12px;
		margin: 0 10px;
		border-radius: 4px;
		margin-top: 15px;
	}

	.cartItem {
		margin-bottom: 110px;
	}

	.card {
		margin: 0 10px;
		border-radius: 0;
	}

	footer {
		width: 100%;
		position: fixed;
		bottom: 51px;
		left: 0;
		padding: 8px 5px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;

		.computPrice {
			display: flex;
			align-items: center;
			font-size: 13px;
			color: #888;
			gap: 8px;

			.totalPrice {
				padding-right: 10px;
			}

			span {
				color: black;
				font-weight: 600;
				font-size: 20px;

				i {
					font-size: 18px;
					font-style: normal;
				}
			}

			button {
				background-color: black;
				color: white;
				padding: 11px 38px;
				border: 0;
			}
		}
	}

	footer {
		.delete_btn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 5px 10px;
			width: 100%;

			.deleteBtn {
				.delete {
					background-color: #fff;
					border-radius: 50px;
					padding: 5px 10px;
					color: #949399;
					border: 1px solid #dfdfdf;
					font-size: 13px;
				}
			}
		}
	}
</style>