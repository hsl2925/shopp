<template>
	<div>
		<div class="addressContent">
			<div class="address">
				<van-icon name="arrow-left" @click="toAddress()" />
				<p class="head">{{ isNew ? '添加收货地址' : '编辑收货地址' }}</p>
			</div>
		</div>
		<div class="address_message">
			<van-field v-model="addressList.name" @input="handleInput" placeholder="请填写收货人姓名" label="收货人" />
			<van-field v-model="addressList.phone" @input="handleInput" placeholder="请填写收货人手机号码" type="tel"
				label="手机号码" />
			<van-field v-model="addressList.city" @input="handleInput" placeholder="省市区县，乡镇等" label="所在地区" />
			<van-field v-model="addressList.cityNum" @input="handleInput" placeholder="小区，楼栋号，门牌号等" label="详细地址" />
		</div>
		<div class="newAddress">
			<div class="add_address" @click="saveAddress()">
				<span>{{ isNew ? '保存' : '更新' }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue';
	import {
		Toast
	} from 'vant';
	Vue.use(Toast)

	export default {
		data() {
			return {
				addressList: {
					name: '',
					phone: '',
					city: '',
					cityNum: '',
					id: 0,
				},
				isValid: false,
				addressId: '',
				isNew: true, // 是否为新增操作
				ressListUpdate: []
			}
		},
		// 编辑地址
		created() {
			if (this.$route.query.id) {
				// 编辑操作，将路由查询参数中的数据赋值给表单字段
				axios({
					url: "http://localhost:3000/addressList/" + this.$route.query.id,
				}).then(res => {
					this.ressListUpdate = res.data.data
					this.addressList.name = this.ressListUpdate.name
					this.addressList.phone = this.ressListUpdate.phone
					this.addressList.city = this.ressListUpdate.city
					this.addressList.cityNum = this.ressListUpdate.cityNum
				})
				this.isNew = false

			} else {
				axios({
					url: "http://localhost:3000/addressList"
				}).then(res => {
					this.addressListLen = res.data.data
					this.addressList.id = this.addressListLen.length + 1
				})
			}
		},
		methods: {
			toAddress() {
				this.$router.push('/address')
			},
			handleInput() {
				if (this.addressList.name && this.addressList.phone && this.addressList.city && this.addressList.cityNum) {
					this.isValid = true
				} else {
					this.isValid = false
				}
			},
			saveAddress() {
				if (this.isNew) { // 如果是新增操作
					// 发送API请求保存新增的地址信息
					console.log("执行这个新增操作");
					if (!this.isValid) {
						console.error('Missing address information')
						return
					}

					axios.post('http://localhost:3000/addressList', this.addressList)
						.then(res => {
							console.log('Address added successfully:', res.data)
							// 返回地址列表
							this.$router.push('/address')
						})
						.catch(error => {
							console.error(error)
						})
				} else { // 如果是编辑操作
					console.log("执行这个编辑操作")
					// 编辑操作
					axios({
							url: "http://localhost:3000/addressList/" + this.ressListUpdate.id,
							data: {
								name: this.addressList.name,
								phone: this.addressList.phone,
								city: this.addressList.city,
								cityNum: this.addressList.cityNum
							},
							method: 'put'
						})
						.then(response => {
							Toast.success("修改成功！");
							console.log('Address updated successfully:', response.data)
							// 编辑保存后返回到地址列表页
							this.$router.push('/address')
						})
						.catch(error => {
							console.error(error)
						})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addressContent {
		width: 100%;
		margin-bottom: 8px;
	}

	.address {
		width: 100%;
		height: 44px;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.head {
		width: 90%;
		font-size: 16px;
		box-sizing: border-box;
		text-align: center;
		color: rgb(96, 98, 102);
	}

	.address_message {
		margin: 0 8px;
	}

	.van-cell {
		padding: 12px 0 12px 15px;
		font-size: 12px;
		font-weight: 500;
		color: #181818;
	}

	.newAddress {
		height: 53px;
		width: 100%;
		background-color: #fff;
		position: fixed;
		bottom: 0;
	}

	.add_address {
		padding: 8px 0;
		background-color: #000;
		text-align: center;
		margin: 10px 20px;
	}

	.newAddress span {
		color: #fff;
		font-size: 14px;
	}
</style>