<template>
	<view>
		<view class="header">
			<!-- 返回 -->
			<!-- <view class="back" @tap="back()" v-if="left=='back'">
				<img :src="'../../static/base/back.png'" alt="" >
			</view> -->
			<!-- 更多 -->
			<view class="more"  v-if="left=='more'" @tap="turnUrl()">
				<img :src="'../../static/base/more.png'" alt="">
			</view>
			<!-- 文字内容 -->
			<view class="content" >
				<view class="append" v-for="item,index in localListPlus" :key="index">
					<view class="dot" v-if="index>0">
						.
					</view>
					<view class="main" v-if="color">
						{{item}}
					</view>
					<view class="main" style="color:#000000" v-if="deep">
						{{item}}
					</view>
					<view class="main" style="color:#9A9A9A" v-if="!color">
						{{item}}
					</view>
				</view>
			</view>
			<!-- 右侧标签 -->
			<view class="right">
				<view class="search">
					<img src="../../static/base/search2.png" alt="">
				</view>
				<view class="add" v-if="right">
					<img src="../../static/base/add.png" alt="">
				</view>
				<view class="dotPlus" v-if="right">
					<img src="../../static/base/dotPlus.png" alt="">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'headbar',
		props: {
			localList: {
				defalut:''
			},
			color:{
				default:true
			},
			deep:{
				default:false
			},
			left:{
				default:'back'
			},
			url:{
				default:''
			},
			right:{
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			localListPlus(){
				return this.localList.split(',')
			}
		},
		methods: {
			// 跳转路由
			turnUrl(){
				console.log(1,this.url);
				if(this.url == 'back'){
					return uni.navigateBack()
				}else{
					let arr = this.url.split('/')
					console.log(arr);
					if(arr.length==4){
						uni.switchTab({
							url:this.url
						})
					}else{
						uni.navigateTo({
							url:this.url
						})
					}
					
				}
				
			},
			// 返回上一页
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		display: flex;
		padding: 10upx 10upx;
		box-sizing: border-box;
		align-items: center;
		background-color: #fff;
		position: relative;
		z-index: 999;

		.back,.more {
			padding-left: 10upx;

			img {
				height: 40upx;
				width: 26upx;
			}
 
			transform: translateY(5upx);

		}
		.more{
			img{
				width: 46upx;
			}
		}

		.content {
			display: flex;
			margin-left: 20upx;
			color: #9A9A9A;
			font-size: 26upx;
			align-items: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			.dot {
				margin: 0 10upx;
				transform: translateY(-20upx) scale(2);

			}
			.append{
				display: flex;
				&:last-child{
					.main{
						color: #3d5ed1;
					}
				}
			}
		}

		.right {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			padding-right: 20upx;

			img {
				height: 40upx;
				width: 40upx;
				margin: 0 15upx;
			}
			.search{
				transform: translateY(2upx);
			}
			
			.dotPlus{
				img{
					width: 9upx;
				}
			}

		}
	}
</style>