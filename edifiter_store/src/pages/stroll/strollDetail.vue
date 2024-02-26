<template>
	<div>
		<div class="header">
			<div class="header_msg">
				<van-icon name="arrow-left" />
				<img src="https://edifier-forum-oss.edifier.com/images/user/avatar371.jpg" alt="" />
				<span>木芙蓉</span>
			</div>
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
				<van-swipe-item>1</van-swipe-item>
				<van-swipe-item>2</van-swipe-item>
				<van-swipe-item>3</van-swipe-item>
				<van-swipe-item>4</van-swipe-item>
				<van-swipe-item>5</van-swipe-item>
			</van-swipe>
			<h4>又是拍，拍，拍的一天！</h4>
			<div class="bottom">
				<div class="left">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/app-assets/community/no-like2.png" alt="" />
					<span>19人点赞</span>
				</div>
				<div class="right">
					<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/app-assets/community/no-like2.png" alt="" />
					<span>我觉得不错，点个赞</span>
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
				strollDetailList: []
			}
		},
		created() {
			this.getStrollData()
		},
		methods: {
			getStrollData() {
				axios({
					url: "/strollPost/getById?id=" + this.$route.query.id
				}).then(res => {
					this.strollDetailList = res.data.data
					console.log(res.data.data)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.my-swipe .van-swipe-item {
		color: #fff;
		font-size: 20px;
		line-height: 150px;
		text-align: center;
		background-color: #39a9ed;
	}
	
	.header {
		&_msg {
			display: flex;
			align-items: center;
			
			img {
				width: 31px;
				height: 31px;
			}
		}
	}
</style>