<template>
	<view class="listArea">
		<!-- 标头 -->
		<view class="title" v-if="title">
			<view class="shape"> </view>
			{{ title }}
		</view>
		<!-- 列表区 -->
		<view class="itemArea">
			<view class="listItem" v-for="item, index in listInfo" :key="index" @click="turnDetailPage(item)">
				<view class="box"></view>
				<view class="name">{{ item.name }}</view>
				<view class="right">
					<img :src="'../../static/svg/add.svg'" alt="" v-if="icon.includes('add') || item.name == '发起办事'"
						@click.stop="turnAddPage(item)">
					<view class="dotPlus">
						<img :src="'../../static/base/dotPlus.png'" alt="" v-if="icon.includes('dotPlus')">
					</view>
					<img src="../../static/base/right.png" alt="" v-if="icon.includes('right')">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "personList",
	props: {
		listInfo: {
			default: () => {
				return []
			}
		},
		localList: {
			default: ''
		},
		title: {
			default: ''
		},
		chat: {
			default: false
		},
		url: {
			default: '/pages/warehouse/page2/page2'
		},
		icon: {
			default: 'right'
		}
	},
	data() {
		return {

		};
	},
	methods: {
		turnAddPage(item) {
			uni.navigateTo({
				url: '/pages/work/addPage/addPage' + '?data=' + JSON.stringify(item)
			})
		},
		turnDetailPage(item) {
			if (Object.keys(item).includes('url')) {
				let itemPlus = { ...item }
				let turnUrl = itemPlus.url
				delete itemPlus.url
				uni.navigateTo({
					url: turnUrl + '?data=' + JSON.stringify(itemPlus)
				})
				return
			}
			if (item.name == '发起办事') {
				uni.navigateTo({
					url: '/pages/work/page5/page5' + '?data=' + JSON.stringify(item)
				})
			} else {
				uni.navigateTo({
					url: this.url + '?data=' + JSON.stringify(item)
				})
			}

		}
	}
}
</script>

<style lang="scss">
.listArea {
	width: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;

	.title {
		padding: 10upx 30upx;
		display: flex;
		align-items: center;
		align-items: center;
		background-color: transparent;
		font-size: 30upx;
		line-height: 1.5;
		.shape {
			width: 6upx;
			height: 30upx;
			background-color: #3d5ed1;
			margin-right: 14upx;
		}

	}

	.itemArea {
		box-sizing: border-box;

		.listItem {
			display: flex;
			padding: 16upx 30upx;
			align-items: center;
			box-sizing: border-box;
			background-color: #fff;

			&:active {
				background-color: #edeffc;
				border-radius: 10upx;
			}

			.box {
				width: 84upx;
				height: 84upx;
				background-color: #3D5ED1;
				margin-right: 25upx;
				border-radius: 8upx;
			}

			.name {
				font-size: 32upx;
			}

			.right {
				flex: 1;
				display: flex;
				justify-content: flex-end;
				transform: translateY(2upx);

				img {
					margin-left: 28upx;
					height: 28upx;
					width: 28upx;
				}

				.dotPlus {
					img {
						height: 30upx;
						width: 8upx;
					}
				}
			}
		}
	}


}</style>