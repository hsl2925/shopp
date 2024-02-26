<template>
	<div class="card">
		<div class="header">
			<van-checkbox v-model="checked"></van-checkbox>
			<van-image :src="data.image" />
		</div>
		<div class="content">
			<p>{{data.productName}}</p>
			<!-- <p>{{data.sku}}</p> -->
			<div class="action">
				<span><i>¥</i>{{data.price}}</span>
				<van-stepper theme="round" input-width="30px" button-size="22px" v-model="num" />
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ["data", "index"],
		data() {
			return {
				checked: this.data.checked,
				num: this.data.num,
				skuId: this.index
			}
		},
		methods: {
			updateCheckedAndNum() {
				// 通知外层组件, 更新价格
				this.$emit('update-price',
					this.checked,
					this.num,
					this.index
				)
			}
		},
		// 监听变化，同步组件数据
		watch: {
			'data.checked': function(newCheckedValue) {
				this.checked = newCheckedValue
			},
			'checked': function() {
				this.updateCheckedAndNum()
			},
			'num': function() {
				console.log(this.num)
				this.updateCheckedAndNum()
			}
		}
	}
</script>

<style lang="scss" scoped>
	$borderRadius: 8px;

	.card {
		background-color: white;
		padding: 12px;
		padding-top: 0;
		padding-top: 24px;
		display: flex;
		border-radius: $borderRadius;

		.header {
			display: flex;
			align-items: center;
		}

		.content {
			font-size: 13px;

			p {
				padding: 2px 0;
			}

			p:nth-child(2) {
				color: rgb(136, 136, 136);
			}

			padding-left: 10px;
		}

		.van-image {
			height: 89px;
			width: 89px;
			border: .5px solid #f2f5f7;
			margin-left: 10px;
			display: inline-block;
		}

		.action {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 0px;
			font-size: 18px;
			font-weight: 600;

			span {
				i {
					font-size: 13px;
					padding-right: 5px;
				}
			}
		}
	}

	.van-stepper ::v-deep .van-stepper__plus {
		color: #8f8f96;
		background-color: #f2f5f7;
	}

	.van-stepper ::v-deep .van-stepper__minus {
		color: #8f8f96;
		background-color: #f2f5f7;
		border: 1px solid #8f8f96;
	}

	.van-stepper ::v-deep .van-stepper__input {
		font-size: 13px;
		margin: 0;
		font-weight: 400;
	}
</style>