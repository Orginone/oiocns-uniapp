<template>
	<view class="listArea">
		<view class="total">{{title}}</view>
		<view class="itemArea" >
			<view class="listItem" v-for="item,index in listInfo" :key="index" >
				<view class="box"></view>
				<view class="name" >{{item.name}}</view>
				<view class="right" @tap="turnDetailPage(item)">
					<!-- <img src="../../static/base/chat.png" alt="" v-if="chat"> -->
					<view class="dotPlus">
						<img :src="'../../static/base/dotPlus.png'" alt="" v-if="icon=='dotPlus'" >
					</view>
					<img src="../../static/base/right.png" alt="">
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
				default:[]
			},
			title: {
				default:''
			},
			chat: {
				default: true
			},
			local:{
				default:''
			},
			url:{
				default:'/pages/warehouse/page2/page2'
			},
			icon:{
				default:''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			turnDetailPage(item) {
				uni.navigateTo({
					url: this.url+'?data=' + JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="scss">
	.listArea {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 40upx;
		box-sizing: border-box;

		.total {
			margin-bottom: 20upx;
		}

		.itemArea {
			box-sizing: border-box;

			.listItem {
				display: flex;
				margin-bottom: 28upx;
				align-items: center;
				box-sizing: border-box;

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
					.dotPlus{
						img{
							height: 28upx;
							width:6upx;
						}
					}
				}
			}
		}


	}
</style>