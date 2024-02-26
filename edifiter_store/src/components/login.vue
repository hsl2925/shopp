<template>
	<div id="login">
		<div class="login_msg">
			<div class="img">
				<img src="https://edifier-shop-oss.edifier.com/edifier-shop-image/app/assets/static/images/loginLogo-noBg.png"
					alt="" />
			</div>
			<van-cell-group>
				<div class="phone">
					<img src="https://edifier-shop.oss-cn-beijing.aliyuncs.com/edifier-shop-image/admin/2023-05-02/71a8d06beec34262a3d63956305e7ce0_phone.png"
						alt="" />
					<van-field v-model="phone" placeholder="请输入您的手机号" />
				</div>
				<div class="code">
					<img src="https://edifier-shop.oss-cn-beijing.aliyuncs.com/edifier-shop-image/admin/2023-05-02/875a6ea7ab92495cba4bf06ff239974f_code.png"
						alt="" />
					<van-field v-model="code" placeholder="请输入验证码" />
					<div class="getCode">
						<span @click="sendCode()">获取验证码</span>
					</div>
				</div>
			</van-cell-group>
			<van-button type="primary" size="large" color="#333333" @click="login()">登录</van-button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import {
		Toast
	} from 'vant'
	Vue.use(Toast)

	export default {
		data() {
			return {
				code: '',
				phone: ''
			}
		},
		created() {

		},
		methods: {
			sendCode() {
				axios({
					url: 'http://localhost:3000/sendCode',
					method: 'POST',
					data: {
						phoneNumber: this.phone
					}
				}).then(res => {
					console.log(res.data)
					// 处理响应数据
				})
			},
			login() {
				axios({
					url: 'http://localhost:3000/login',
					method: 'POST',
					data: {
						phoneNumber: this.phone,
						code: this.code // 将字段名从 generatedCode 修改为 code
					}
				}).then(res => {
					console.log(res)
					if (res.status === 200) {
						console.log(res.data.message)
						Toast.success('登录成功')
						
						this.$router.push('/profile')

					} else if (res.status === 401) {
						console.log(res.data.message)
						Toast.fail('验证码错误，请重新输入')
					}
				}).catch(error => {
					console.error(error)
					Toast.fail('验证码错误，请重新输入')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#login {
		height: 100vh;
		background-color: #fff;
		text-align: center;
	}

	.login_msg {
		padding-top: 160px;

		.img {
			margin-bottom: 20px;

			img {
				width: 124px;
				height: 102px;
			}
		}

		.van-cell-group {
			margin: 0 30px;
		}

		.van-cell-group .van-cell {
			margin: 10px 0;
		}

		.van-cell-group .van-cell::after {
			border: 0;
		}

		.van-hairline--top-bottom::after,
		.van-hairline-unset--top-bottom::after {
			border-width: 0;
		}

		.phone {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #dddddd;

			img {
				width: 21px;
				height: 28px;
			}
		}

		.code {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #dddddd;

			img {
				width: 23px;
				height: 26px;
			}

			.getCode {
				padding: 15px 5px;
				margin-top: 15px;
				width: 100%;
				background-color: #c5aa7b;
				color: #fff;
				font-size: 14px;
			}
		}
	}

	.van-button {
		margin-top: 50px;
		height: 53px;
		width: 90%;
	}
</style>