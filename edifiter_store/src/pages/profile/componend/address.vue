<template>
	<div>
		<div class="addressContent">
			<div class="address">
				<van-icon name="arrow-left" @click="goProfile()" />
				<p class="head">收货地址</p>
			</div>
			<!-- 非空地址 -->
			<div v-if="showFirstDiv">
				<van-swipe-cell v-for="(v,index) in addressList" :key="v.id">
					<div class="address_content" >
						<div class="ship" v-if="showFirstDiv">
							<div class="name_tel">
								<span class="name">{{ v.name }}</span>
								<span class="phone">{{ v.maskedPhoneNumber }}</span>
							</div>
							<div class="add">
								<span>{{ v.city }}<i>{{ v.cityNum }}</i></span>
							</div>
						</div>
						<van-icon name="edit" @click="editAddress(v.id)" />
					</div>
					<template #right>
						<van-button @click="del(v.id, index)" square text="删除" type="danger" class="delete-button" />
					</template>
				</van-swipe-cell>
			</div>
			<!-- 空地址 -->
			<div class="addressImg" v-else>
				<img
					src="https://edifier-shop-oss.edifier.com/edifier-shop-image/admin/2023-05-02/7614e58e3f2b42a087b428a6c2b02fff_noAddress.png" />
				<p style="color: gray; margin-top: 20px;">你还没有添加地址哦～</p>
			</div>
			<!-- 新建收货地址 -->
			<div class="newAddress">
				<div class="add_address" @click="addAddress()">
					<span>新建收货地址</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import { Toast,SwipeCell} from 'vant';

Vue.use(Toast)
Vue.use(SwipeCell)

export default {
	data() {
		return {
			addressList: [],
			isShowModule: false
		}
	},
	created() {
		this.addList()
	},
	computed: {
		showFirstDiv() {
			return this.addressList.length > 0
		}
	},
	methods: {
		goProfile() {
			this.$router.push("/profile")
		},
		// 新增地址页面 
		addAddress() {
			this.$router.push('/add_address') // 跳转到编辑页面，不传递参数表示新增操作
		},
		addList() {
			axios({
				url: "http://localhost:3000/addressList"
			}).then(res => {
				this.addressList = res.data.data
				console.log(res.data)

				// 加密
				this.addressList.forEach(item => {
					if (item.phone.length >= 7) {
						const maskedDigits = item.phone.slice(0, 3)
						const lastFourDigits = item.phone.slice(-4)
						const maskedLength = item.phone.length - 7
						const maskedDigitsStr = "*".repeat(maskedLength)
						item.maskedPhoneNumber = maskedDigits + maskedDigitsStr + lastFourDigits
					} else {
						item.maskedPhoneNumber = item.phone
					}
				})
			})
		},
		// 编辑地址
		editAddress(id) {
			// 跳转到编辑页面，并将要编辑的地址 id 作为参数传递
			console.log(id);
			this.$router.push('/add_address?id=' + id)
		},
		// 删除地址
		del(id,index){
			console.log("id="+id+"index="+index);
			axios({
				url:"http://localhost:3000/addressList/"+id,
				method:"delete",
			}).then(res => {
				console.log(res);
				Toast.success("删除成功！");
				// 更新当前网页
				this.addressList.splice(index, 1);
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.van-swipe-cell__right .delete-button {
	height: 100%;
}
.addressContent {
	width: 100%;
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
	font-weight: 600;
	box-sizing: border-box;
	text-align: center;
}

.addressImg {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 200px;
}

.newAddress {
	height: 53px;
	width: 100%;
	background-color: #fff;
	position: fixed;
	bottom: 0;

	.add_address {
		padding: 8px 0;
		background-color: #000;
		text-align: center;
		margin: 10px 20px;
	}
}

.newAddress span {
	color: #fff;
	font-size: 14px;
}

.address_content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #fff;
	margin: 10px 10px;
	padding: 15px;

	.ship {
		.name_tel {
			.name {
				font-size: 16px;
				font-weight: 600;
				color: #000;
			}

			.phone {
				font-size: 14px;
				padding-left: 10px;
				font-weight: 400 !important;
				color: #949399;
				letter-spacing: 0.1rem;
			}
		}

		.add {
			padding-top: 10px;
			font-size: 12px;
			color: #949399;
		}
	}
}
</style>