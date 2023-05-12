<template>
	<view class="baseLayout">
		<view class="empty topHide"></view>
		<uni-section title="付款账户" type="line" class="topHide"></uni-section>
			<view class="select">
				<!-- 下拉菜单 -->
				<view class="selected" v-if="select" >
					<view class="img"></view>
					<view class="name">{{select.name}}</view>
					<view class="balance">账户余额：￥{{select.balance}}</view>
					<view class="pull" @click="showList = !showList" >
						<img src="@/static/basePlus/pull.png" :class="{'active':showList}">
					</view>
				</view>
				<!-- 下拉列表 -->
				<view class="accountList":class="{'activeList':!showList}" >
					<view class="listItem" v-for="item,index in accountList" :key="index" @click="getListItem(item)">
						<view class="img"></view>
						<view class="name">{{item.name}}</view>
						<view class="balance">账户余额：￥{{item.balance}}</view>
					</view>
				</view>
			</view>
		
		<uni-section title="付款金额" type="line" class="interval">
			<view class="cash">
				<input type="text" v-model="cash" placeholder="输入金额" placeholder-style="fontSize:28upx;">
			</view>
		</uni-section>
		<uni-section title="付款方" type="line" class="interval">
			<template v-slot:right>
				<view style="display: flex;align-items: center;">
					<img src="@/static/basePlus/scan.png" alt="" style="width: 30upx;height: 30upx;">
				</view>
			</template>
		</uni-section>
		<view class="target">
			<input type="text" v-model="target" placeholder="搜索或输入地址" placeholder-style="fontSize:28upx;">
		</view>
		</uni-section>
		<uni-section title="转账备注 (选填)" type="line" class="interval">
			<view class="remarks">
				<input type="text" v-model="remarks" placeholder="输入备注" placeholder-style="fontSize:28upx;">
			</view>
		</uni-section>
		<view class="confirm">
			确认转账
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '', //付款账户
				cash: '', //付款金额
				target: '', //付款方
				remarks: '', //转账备注
				showList: false, //列表展示标识
				select: {
					name: 'ETH',
					balance: 125.3
				},
				accountList: [{
					name: 'ETH',
					balance: 125.3
				}, {
					name: 'AXA',
					balance: 125.3
				}, {
					name: 'UWU',
					balance: 125.3
				}]
			};
		},
		methods: {
			change(e) {
				console.log(e);
			},
			// 选择菜单选项
			getListItem(item) {
				this.select = item
				this.showList = false
			}

		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-section .uni-section-header__decoration {
		background-color: $main-blue;
		width: 6upx !important;
		height: 28upx !important;
	}

	.baseLayout {
		width: 100%;
		height: 100%;
		padding: 50upx 30upx;
		padding-top: 0;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow: hidden;
		.interval {
			margin-top: 20upx;
		}
		.topHide{
			position: relative;
			z-index: 100;
		}
		.empty{
			height: 50upx;
			width: 100%;
			background-color: #fff;
		}
		.select {
			margin: 0 auto;
			width: 95%;
			position: relative;
			
			.img {
				width: 60upx;
				height: 60upx;
				background-color: #d9d9d9;
				border-radius: 50%;
				margin-right: 16upx;
			}

			.name {
				font-size: 32upx;
				margin-right: 16upx;
			}

			.balance {
				font-size: 24upx;
				color: #808080;
			}

			.selected {
				display: flex;
				height: 70upx;
				align-items: center;
				border-bottom: 2upx solid #BDBDBD;
				padding-left: 10upx;
				position: relative;
				background-color: #fff;
				z-index: 100;
				.pull {
					height: 100%;
					flex: 1;
					display: flex;
					justify-content: flex-end;
					padding-right: 10upx;
					align-items: center;

					img {
						width: 18upx;
						height: 18upx;
						transition: 0.3s ease-in-out;
					}

					.active {
						transform: rotate(180deg);
					}
				}

			}

			.accountList {
				display: flex;
				flex-direction: column;
				border: 2upx solid #BDBDBD;
				border-top: none;
				background-color: #fff;
				position: absolute;
				z-index: 99;
				width: 100%;
				top: 100%;
				transition: 0.3s ease-in-out;

				.listItem {
					padding-left: 10upx;
					display: flex;
					height: 80upx;
					align-items: center;

					&:active {
						background-color: #edeffc;
					}
				}
			}
			
			.activeList{
				transform: translateY(-100%);
			}

		}

		.cash {
			margin: 0 auto;
			width: 95%;
			height: 70upx;
			border-radius: 8upx;
			background-color: #f6f7ff;
			display: flex;
			align-items: center;
			padding-left: 20upx;

			input {
				font-size: 32upx;
				border-radius: 8upx;
				background-color: #f6f7ff;

				&::placeholder {
					color: #BFBFBF;
				}
			}
		}

		.remarks,
		.target {
			margin: 0 auto;
			width: 93%;
			padding-bottom: 10upx;
			border-bottom: 2upx solid #BDBDBD;
		}

		.confirm {
			margin: 0 auto;
			margin-top: 120upx;
			width: 85%;
			height: 100upx;
			background: #3D5ED1;
			border-radius: 60upx;
			color: #f6f7ff;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34upx;
			letter-spacing: 0.1em;
		}

	}
</style>