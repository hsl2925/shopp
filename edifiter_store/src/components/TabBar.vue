<template>
	<div>
		<div class="tab-bar">
			<div class="tab-bar-item" @click="homeClick()">
				<img v-if="!ishome" src="@/assets/images/tabbar/index.png" alt="" />
				<img v-else src="@/assets/images/tabbar/index_active.png" alt="" />
				<div :class="{ active: ishome }">首页</div>
			</div>
			<div class="tab-bar-item" @click="categoryClick()">
				<img v-if="!isActive" src="@/assets/images/tabbar/category.png" alt="" />
				<img v-else src="@/assets/images/tabbar/category_active.png" alt="" />
				<div :class="{ active: isActive }">分类</div>
			</div>
			<div class="tab-bar-item" @click="strollClick()">
				<img v-if="!isStroll" src="@/assets/images/tabbar/icon-strollfill.png" alt="" />
				<img v-else src="@/assets/images/tabbar/icon-strollfill.png" alt="" />
				<div :class="{ active: isStroll }">逛逛</div>
			</div>
			<div class="tab-bar-item" @click="shopcartClick()">
				<img v-if="!iscart" src="@/assets/images/tabbar/cart.png" alt="" />
				<img v-else src="@/assets/images/tabbar/cart_active.png" alt="" />
				<div :class="{ active: iscart }">购物车</div>
			</div>
			<div class="tab-bar-item" @click="profileClick()">
				<img v-if="!isprofile" src="@/assets/images/tabbar/user.png" alt="" />
				<img v-else src="@/assets/images/tabbar/user_active.png" alt="" />
				<div :class="{ active: isprofile }">我的</div>
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
		computed: {
			ishome() {
				return this.$route.path == ("/")
			},
			isActive() {
				return this.$route.path == "/category"
			},
			isStroll() {
				return this.$route.path == "/stroll"
			},
			iscart() {
				return this.$route.path == ("/cart")
			},
			isprofile() {
				return this.$route.path == ("/profile")
			}
		},
		methods: {
			homeClick() {
				if (this.$route.path !== "/") {
					this.$router.replace("/")
				}
			},
			categoryClick() {
				if (this.$route.path !== "/category") {
					this.$router.replace("/category")
				}
			},
			strollClick() {
				if (this.$route.path !== "/stroll") {
					this.$router.replace("/stroll")
				}
			},
			shopcartClick() {
				if (this.$route.path !== "/cart") {
					this.$router.replace("/cart")
				}
			},
			profileClick() {
				if (this.$route.path !== "/profile") {
					this.$router.replace("/profile")
				}
			}
		}
	}
</script>

<style scoped>
	.tab-bar {
		display: flex;
		background-color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		border-top: 1px solid #f5f5f5;
		z-index: 9999;
	}

	.tab-bar-item {
		flex: 1;
		text-align: center;
		height: 51px;
		font-size: 12px;
		color: #b2b2b2;
		/* font-size: 0.2rem; */
	}

	.tab-bar-item img {
		width: 24px;
		height: 24px;
		margin-top: 3px;
		vertical-align: middle;
		margin-bottom: 2px;
	}

	.active {
		color: #000;
	}
</style>