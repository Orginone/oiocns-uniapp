<template>
	<view class="baseLayout">
		<!-- 加载中 -->
		<view class="loading"  v-if="mode=='loading'">
			<view class="dots">
			  <view></view>
			  <view></view>
			  <view></view>
			  <view></view>
			  <view></view>
			</view>
			<view class="text">
				加载中，请稍后
			</view>
		</view>
		<!-- 未收藏 -->
		<view class="sub" v-if="mode=='star'">
			<view class="img">
				<img src="@/static/basePlus/star.png" alt="">
			</view>
			<view class="text">
				<view class="main">还没有收藏内容，</view>
				<view class="sub">去收藏</view>
			</view>
		</view>
		<!-- 网络丢失 -->
		<view class="sub"  v-if="mode=='net'">
			<view class="img">
				<img src="@/static/basePlus/net.png" alt="">
			</view>
			<view class="text">
				<view class="main">网络走丢了，</view>
				<view class="sub">诊断一下</view>
			</view>
		</view>
		<!-- 404 -->
		<view class="sub"  v-if="mode=='404'">
			<view class="img">
				<img src="@/static/basePlus/404.png" alt="">
			</view>
			<view class="text">
				<view class="main">页面出错了，</view>
				<view class="sub">去刷新</view>
			</view>
		</view>
		<!-- 暂无消息 -->
		<view class="sub"  v-if="mode=='noMessage'">
			<view class="img">
				<img src="@/static/basePlus/noMessage.png" alt="">
			</view>
			<view class="text">
				<view class="main">暂无消息，</view>
				<view class="sub">去创建</view>
			</view>
		</view>
		<!-- 暂无内容 -->
		<view class="sub" v-if="mode=='noContent'">
			<view class="img">
				<img src="@/static/basePlus/noContent.png" alt="">
			</view>
			<view class="text">
				<view class="main">暂无内容，</view>
				<view class="sub">去刷新</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"lostPage",
		props:{
			mode:{
				default:'net'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.baseLayout{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		
	}
	.loading{
		.dots {
		  margin: 0 auto;
		  width: 6em;
		  display: flex;
		  flex-flow: row nowrap;
		  align-items: center;
		  justify-content: space-between;
		}
		
		.dots view {
		  width: 0.8em;
		  height: 0.8em;
		  border-radius: 50%;
		  background-color: $main-blue;
		  animation: fade 0.8s ease-in-out alternate infinite;
		}
		
		.dots view:nth-of-type(1) {
		  animation-delay: -0.8s;
		}
		
		.dots view:nth-of-type(2) {
		  animation-delay: -0.6s;
		}
		.dots view:nth-of-type(3) {
		  animation-delay: -0.4s;
		}
		
		.dots view:nth-of-type(4) {
		  animation-delay: -0.2s;
		}
		
		@keyframes fade {
		  from {
		    opacity: 1;
		  }
		  to {
		    opacity: 0.3;
		  }
		}
		
		.text{
			display: flex;
			justify-content: center;
			margin-top: 20upx;
			color: $sub-font;
			font-size: 24upx;
			
		}
	}
	
	.sub{
		.img{
			display: flex;
			justify-content: center;
			width: 246upx;
			height: 212upx;
			img{
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
		.text{
			display: flex;
			font-size: 24upx;
			justify-content: center;
			margin-top: 30upx;
			.main{
				color: $sub-font;
			}
			.sub{
				color: $main-blue;
			}
		}
	}
</style>