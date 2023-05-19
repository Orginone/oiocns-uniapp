<template>
	<view class="listArea">
		<view class="total" v-if="title">{{title}}</view>
		<view class="itemArea" >
			<view class="listItem" v-for="item,index in listInfo" :key="index"  @tap="turnDetailPage(item)">
				<view class="box"></view>
				<view class="name" >{{item.name}}</view>
				<view class="right">
					<!-- <img src="../../static/base/chat.png" alt="" v-if="chat"> -->
					<img :src="'../../static/base/add.png'" alt=""  v-if="icon.includes('add')" >
					<view class="dotPlus">
						<img :src="'../../static/base/dotPlus.png'" alt=""  v-if="icon.includes('dotPlus')" >
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
				default:()=>{
					return []
				}
			},
			localList: {
				default:''
			},
			title: {
				default:''
			},
			chat: {
				default: false
			},
			url:{
				default:'/pages/warehouse/page2/page2'
			},
			icon:{
				default:'right'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			turnDetailPage(item) {
				item['localList'] = this.localList+','+item.name
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
		padding: 0 20upx;
		box-sizing: border-box;
		margin-top: 20upx;

		.total {
			padding: 0upx 30upx;
		}

		.itemArea {
			box-sizing: border-box;

			.listItem {
				display: flex;
				padding: 16upx 30upx;
				align-items: center;
				box-sizing: border-box;
				
				&:active{
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
					.dotPlus{
						img{
							height: 30upx;
							width:8upx;
						}
					}
				}
			}
		}


	}
</style>