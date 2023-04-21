<template>
	<view>
		<headbar :localList='localList'></headbar>
		<!-- 切换栏 -->
		<view class="switchBar">
			<view :class="selectIndex==0?'active':'item'" @click="selectIndex = 0">会话</view>
			<view :class="selectIndex==1?'active':'item'"  @click="selectIndex = 1">待办</view>
			<view :class="selectIndex==2?'active':'item'" @click="selectIndex = 2">发起</view>
			<view :class="selectIndex==3?'active':'item'"  @click="selectIndex = 3">通信录</view>
		</view>
		<!-- 列表 -->
		<personList :listInfo='listInfo' :title="'个人'" :chat="false"></personList>
		<personList :listInfo='listInfo2' :title="'单位'" :chat="false"></personList>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				localList:[],
				listInfo:[
					{
						name:'特别关注'
					},
					{
						name:'常用联系人'
					},
					{
						name:'我的好友'
					},
					{
						name:'我的群组'
					},
				],
				listInfo2:[
					{
						name:'杭州电子科技大学'
					},
					{
						name:'浙江申财政厅'
					},
					{
						name:'浙江省教育资源局'
					},
					{
						name:'我的群组'
					},
				],
				selectIndex:0,//切换标识
			};
		},
		onLoad() {			
			console.log(1);
			uni.removeStorageSync('localList')
			this.localList.push('通讯录')
			uni.setStorageSync('localList',this.localList)
		},
		methods:{
			turnDetailPage(item){
				uni.navigateTo({
					url:'/pages/warehouse/page2/page2?data='+JSON.stringify(item)
				})
			}
		}
	}
</script>

<style lang="scss">
	.switchBar{
		padding: 20upx 40upx;
		font-size: 32upx;
		display: flex;
		margin-bottom: 20upx;
		border-bottom: 2upx solid #e7e7e7;
		.item{
			margin: 0 30upx;
			line-height: 1.6;
			border-bottom:4upx solid transparent ;
		}
		.active{
			margin: 0 30upx;
			line-height: 1.6;
			color: #3d5ed1;
			border-bottom:4upx solid #3d5ed1 ;
		}
	}
	
	.listArea{
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 40upx;
		box-sizing: border-box;
		.total{
			margin-bottom: 20upx;
		}
		.itemArea{
			box-sizing: border-box;
			.listItem{
				display: flex;
				margin-bottom: 28upx;
				align-items: center;
				box-sizing: border-box;
				.box{
					width: 84upx;
					height: 84upx;
					background-color:#3D5ED1;
					margin-right: 25upx;
					border-radius: 8upx;
				}
				.name{
					font-size: 32upx;
				}
				.right{
					flex: 1;
					display: flex;
					justify-content: flex-end;
					transform: translateY(2upx);
					img{
						height: 28upx;
					}
				}
			}
		}
		
		
	}
</style>