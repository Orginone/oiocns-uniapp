<template>
	<view class="baseLayout">
		<!-- 搜索框 -->
		<view class="search">
			<view class="img">
				<img src="@/static/basePlus/search.png" alt="">
			</view>
			<input type="text" :value="value" placeholder="请输入名称或地址">
		</view>
		<!-- 列表区 -->
		<view class="listArea">
			<view class="listItem" v-for="item,index in lists" :key="index">
				<view class="ico"></view>
				<view class="name">{{item.name}}</view>
				<view class="btn">
					<view class="add" v-if="item.type ==0">
						<img src="@/static/basePlus/addIco.png" alt="">
					</view>
					<view class="delete" v-else>
						<img src="@/static/basePlus/deleteIco.png" alt="">
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'',
				lists:[
					{
						name:'BTC',
						type:0
					},
					{
						name:'ETH',
						type:1
					}
				],
			};
		}
	}
</script>

<style lang="scss" scoped>
	.baseLayout{
		width: 100%;
		height: 100%;
		background-color: #fff;
		.search{
			margin:  0 auto;
			margin-top: 20upx;
			width: 90%;
			height: 70upx;
			border-radius: 10upx;
			padding: 16upx;
			background-color: #f0f2f7;
			display: flex;
			align-items: center;
			.img{
				height: 36upx;
				width: 36upx;
				img{
					height: 100%;
					width: 100%;
					object-fit: contain;
				}
				
				
			}
			input{
				margin-left: 20upx;
				height: 85%;
				font-size: 28upx;
				color: $main-font;
				display: flex;
				align-items: center;
				&::placeholder{
					color: #B6B7BA;
				}
			}
			
		}
		
		.listArea{
			margin-top: 40upx;
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 0 40upx;
			.listItem{
				padding: 10upx 0;
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 40upx;
				.ico{
					height: 80upx;
					width: 80upx;
					border-radius: 50%;
					background-color: #d9d9d9;
				}
				.name{
					margin-left: 30upx;
					font-size: 32upx;
					color: $main-font;
				}
				.btn{
					flex:1;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					img{
						width: 60upx;
						height: 60upx;
						transform: scale(0.8);
					}
					.delete{
						img{
							width: 84upx;
							height: 84upx;
							transform: scale(0.8) translateX(20upx);
						}
					}
				}
			}
		}
	}
</style>
