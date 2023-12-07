<template>
	<view class="BaseLayout">
		<view class="head-flex">
			<input class="search-input" @input="searchCompany"  placeholder="请输入群组名称" v-model="inputcontent" type="text" name="" id="">
			<button class="search-btn" @click="getList">搜索</button>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in showList"  :class="selected == item.id ? 'selected' : ''" :key="index" @click="handleSelect(item.id)">
				<view class="team-name">{{item.name}} <view class="team-create">{{item.code}}</view> </view>
				<view class="team-remark">简介:{{item.remark}}</view>
			</view>
		</view>
		<view class="foot">
			<button class="search-btn" @click="addTeam">添加</button></button>
		</view>
	</view>
</template>

<script>
	// import { kernelApi } from "common/app";

	export default {
		data() {
			return {
				inputcontent:'',//输入内容
				selected:-1,
				showList:[],
			};
		},
		onLoad(option) {			

		},
		watch:{
			
		},
		methods: {
			handleSelect(id) {
				if (this.selected === id) {
					// 取消选中
					this.selected = -1
				} else {
					// 选中
					this.selected = id;
				}
			},
			searchCompany(e){
				this.inputcontent = e.detail.value
			},
			async getList(){
				const res = await kernelApi.searchTargets({
					name: this.inputcontent,
					typeNames: ["群组"],
					page: {"offset":0,"limit":65535,"filter":""},
				});
				if (res.success) {
					this.showList = res.data.result || [];
				}
			},
			async addTeam(){
				if(this.selected != -1){
					this.userInfo = JSON.parse(uni.getStorageSync('currentUser'))
					let res = await kernelApi.applyJoinTeam({
							id: this.selected,
							subId: this.userInfo.id,
					});
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					})
				}else{
					uni.showToast({
						title: '请选择加入的群组',
						icon: 'none',
						duration: 2000
					})

				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.head-flex{
	display: flex;
	
	.search-btn{
		background: #096dd9;
		color: #fff;
		border-radius: 10upx;
		height: 60upx;
		line-height: 60upx;
		margin-top: 20upx;
		margin-right: 20upx;
		font-size: 24upx;
	}
}
.search-input{
	border: 1px solid #ddd;
	padding:0 10upx;
	margin: 20upx;
	border-radius: 10upx;
	height: 60upx;
	line-height: 60upx;
	flex: 1;
}
.item{
	margin: 20upx;
	border: 1px solid #eee;
	border-radius: 10upx;
	padding: 20px;
	.team-name{
		font-size: 26upx;
		color: #333;
		display: flex;
		.team-create{
			margin-left: 10upx;
			color: #096dd9;
			background: #e6f7ff;
			border-color: #91d5ff;
			border-radius: 5upx;
			padding: 0 10upx;
		}
	}
	.team-remark{
		font-size: 28upx;
		margin: 10upx;
	}
}
.selected{
	border: 1px solid #096dd9;
}
.list{
	padding-bottom: 100upx;
}
.foot{
	border-top: 1px solid #eee;
	width: 100%;
	height: 100upx;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	bottom: 0;
	.search-btn{
		width: 320upx;
		text-align: center;
		background: #096dd9;
		color: #fff;
		border-radius: 10upx;
		height: 60upx;
		line-height: 60upx;
		font-size: 24upx;
	}
}
</style>