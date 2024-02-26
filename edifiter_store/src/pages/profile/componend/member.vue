<template>
	<div>
		<div class="memberContent">
			<div class="memberHead">
				<van-icon color="white" name="arrow-left" @click="toProfile()" />
				<div class="title">会员权益</div>
			</div>
			<div class="member">
				<div class="memberImg">
					<van-swipe :loop="false" :show-indicators="false" :width="330">
						<van-swipe-item class="no-bullet" v-for="item in memberList" :key="item">
							<div class="img1" style="padding-left: 10px;"><img :src="item.memberLevelBackground" />
								<div class="text1">当前等级</div>
								<div class="img2"><img :src="item.memberLevelIcon" /></div>
								<span><img
										src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/user/icon-yiwen.png" /></span>
								<div class="grow">当前成长值1，距下一级还需3799></div>
							</div>
						</van-swipe-item>
					</van-swipe>
				</div>
			</div>
			<div class="quanyi">
				<div class="iconTitle">我的权益</div>
				<div class="icon">
					<img
						src="https://edifier-shop-oss.edifier.com/edifier-shop-image/admin/2023-05-09/52efd3c7975048d7a6795a728b9277e3_e1a0637a7c334437b647d4ff9214e84c_%E6%9D%83%E7%9B%8A%E5%9B%BE%E6%A0%87@2x(1).png" />
					<p>普通权益</p>
				</div>
			</div>
			<div class="questionContent">
				<div class="jifen">
					<p class="questionTitle">如何获得更多积分？</p>
					<span>每月5号更新</span>
				</div>
				<div class="questionList">
					<div class="question">
						<p class="first">评价获积分</p>
						<p class="last">评价送积分<span>每评价一单积分+20</span></p>
					</div>
					<div class="question">
						<p class="first">购买获积分</p>
						<p class="last">购买获积分<span>每购买1元积分+1</span></p>
					</div>
					<div class="question">
						<p class="first">收藏获积分</p>
						<p class="last">收藏获积分<span>每购买1元积分+1</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		created() {
			this.getMemberList()
		},
		data() {
			return {
				memberList: []
			}
		},
		methods: {
			getMemberList() {
				axios({
					url: "http://localhost:3000/members"
				}).then(res => {
					this.memberList = res.data.data
					console.log(res.data)
				})
			},
			toProfile() {
				this.$router.push('/profile')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.memberContent {
		width: 100%;
		height: 850px;
		background-color: #fff;
		overflow-x: hidden;
	}

	.memberHead {
		width: 100%;
		height: 42px;
		background-color: #25242b;
		display: flex;
		align-items: center;
		border: none;
		z-index: 999;
		padding: 0 10px;
	}

	.title {
		width: 90%;
		font-size: 16px;
		font-weight: 600;
		text-align: center;
		color: white;
	}

	.member {
		width: 100%;
		height: 178px;
		border: none;
		background-color: #25242b;
		display: flex;
		justify-content: center;
	}

	.memberImg {
		width: 90%;
		padding-top: 20px;
	}

	.img1 {
		position: relative;
	}

	.img1 img {
		width: 100%;
	}

	.img2 {
		position: absolute;
		left: 20px;
		top: 40px;
	}

	.img2 img {
		width: 50%;
	}

	.img1 span {
		width: 5%;
		position: absolute;
		right: 15px;
		top: 10px;
	}

	.img1 span img {
		width: 100%;
	}

	.text1 {
		position: absolute;
		left: 12px;
		top: 6px;
		font-size: 12px;
		color: #cfae7c;
	}

	.grow {
		position: absolute;
		font-size: 12px;
		color: #cfae7c;
		left: 20px;
		top: 110px;
	}

	.quanyi {
		width: 100%;
		height: 120px;
		background-color: #25242b;
	}

	.iconTitle {
		font-size: 13px;
		color: #fed392;
		padding-top: 10px;
		padding-left: 20px;
	}

	.icon {
		width: 100%;
		padding-left: 35px;
		padding-top: 10px;

	}

	.icon img {
		width: 11%;
		margin-left: 5px;
	}

	.icon p {
		font-size: 13px;
		color: #fed392;
		padding-top: 5px;
	}

	.questionContent {
		width: 100%;
	}

	.jifen {
		display: flex;
		justify-content: space-between;
		align-items: center;

		margin: 20px;
	}

	.jifen span {
		font-size: 12px;
		color: gray;
	}
	
	.questionList  {
		margin: 0 20px 10px;
	}

	.questionTitle {
		font-size: 16px;
		font-weight: 700;
	}
	.question {
		background-color: #f2f5f7;
		padding: 15px 20px;
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.first {
		font-size: 14px;
		font-weight: 600;
		padding-bottom: 3px;
	}

	.last {
		font-size: 12px;
		color: gray;
	}

	.last span {
		font-size: 12px;
		font-weight: 500;
		color: #000;
		padding-left: 5px;
	}
</style>