<template>
	<view class="BaseLayout">
		<input type="text" placeholder="搜索账号" placeholder-class="place" />
		<view class="selectAll" v-if="edit">
			<view class="select">
				<img src="../../../static/base/unselect.png" alt="" v-if="!selectAll" @click="selectAll = !selectAll">
				<img src="../../../static/base/selected.png" alt="" v-if="selectAll" @click="selectAll = !selectAll">
				<view class="text">已选中{{selectedNum}}项</view>
			</view>
			<view class="finish" @click="edit=!edit">
				完成
			</view>
		</view>
		<view class="selectCards">
			<view class="listItem" v-for="item,index in list" :key="index">
				<view class="select" v-if="edit">
					<img src="../../../static/base/unselect.png" alt="" v-if="!list[index].select" @click="list[index].select=true;selectedNum++">
					<img src="../../../static/base/selected.png" alt="" v-if="list[index].select"  @click="list[index].select=false;selectedNum--">
				</view>
				<view class="card">
					<view class="top">
						<view class="account">账号:{{item.account}}</view>
						<view class="ico">
							<img src="../../../static/base/pen.png" alt="">
						</view>
					</view>
					<view class="middle">
						<view class="username">昵称:{{item.username}}</view>
						<view class="name">姓名:{{item.name}}</view>
					</view>
					<view class="bottom">
						<view class="phone">手机号:{{item.phone}}</view>
						<view class="more">
							<view class="text">更多信息</view>
							<view class="arrow"></view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view class="funcArea">
			<view class="plus" v-if="edit">
				<view class="item">变更部门</view>
				<view class="item">岗位设置</view>
				<view class="item">部门设置</view>
				<view class="item">停用</view>
				<view class="item">移出单位</view>
			</view>
			<view class="edit" v-if="!edit" @click="edit=!edit">
				编辑
			</view>
		</view>
		<view class="bar"> </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchIndex: 0,
				checkAll: false,
				edit:false,
				selectAll:false,
				selectedNum:0,
				list: [{
						name: 'apple',
						checked: false,
						account: 'superfish058',
						username: '黑暗皇子',
						name: '张三(黑化)',
						phone: 15855648879,
						select:false,

					},
					{
						name: 'banner',
						checked: false,
						disabled: false,
						account: 'superfish058',
						username: '黑暗皇黄黄黄子',
						name: '张三(黑化)',
						phone: 15855648879,
						select:false
					},
					{
						name: 'orange',
						checked: false,
						disabled: false,
						account: 'superfish058',
						username: '黑暗皇子',
						name: '张三(黑化)',
						phone: 15855648879,
						select:false,
					},
					{
						name: 'orange',
						checked: false,
						disabled: false,
						account: 'superfish058',
						username: '黑暗皇黑黑黑Hier子',
						name: '张三(黑化)',
						phone: 15855648879,
						select:false,
					},
					{
						name: 'orange',
						checked: false,
						disabled: false,
						account: 'superfish058',
						username: '黑暗皇子',
						name: '张三(黑化)',
						phone: 15855648879,
						select:false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: 'orange',
			};
		},
		watch:{
			selectAll(newValue){
				if(newValue==true){
					this.list = this.list.map(item =>{
						item.select = true
						return item
					})
				}else{
					this.list = this.list.map(item =>{
						item.select = false
						return item
					})
				}
				this.selectedNum = 0
				this.list.forEach(item =>{
					if(item.select){
						this.selectedNum ++
					}
				})
			}
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			checkboxChange(e) {
				// console.log(e);

			},
			// 选中任一radio时，由radio-group触发
			checkboxGroupChange(e) {
				console.log(e);
				console.log(e.findIndex(item => item == 'all'));
			},
			checkAlls() {
				console.log(this.checkAll, '/////////');
				this.list.map(val => {
					val.checked = !this.checkAll;
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.BaseLayout{
		background-color: #f2f4f9;
		padding-top: 20upx;
	}
	
	.place {
		color: #C4C7D1;
		font-size: 20upx;
	}

	input {
		background-color: #fff;
		position: relative;
		margin: 0 auto;
		
		width: 95%;
		border: 1upx solid rgba(0, 0, 0, 0.1);
		text-align: center;
		height: 50upx;

	}

	.select {
		img {
			width: 36upx;
			height: 36upx;
		}
	}

	.selectAll {
		height: 100upx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;

		.select {

			margin-left: 20upx;
			height: 100%;
			display: flex;
			align-items: center;

			img {
				margin-right: 40upx;
			}

			.text {
				font-size: 28upx;
				color: #0F39D1;
			}
		}

		.finish {
			height: 100%;
			display: flex;
			align-items: center;
			font-size: 28upx;
			color: #F76C6F;
			margin-right: 3.5%;
		}
	}

	.selectCards {
		display: flex;
		flex-direction: column;
		margin-top: 10upx;
		box-sizing: border-box;

		.listItem {
			display: flex;
			flex-wrap: wrap;
			height: 210upx;
			margin-bottom: 30upx;
			margin-right: 3%;
			padding-left: 3%;
			.select {
				margin-right: 40upx;
				margin-left: 20upx;
				height: 100%;
				display: flex;
				align-items: center;
			}

			.card {
			
				box-sizing: border-box;
				flex: 1;
				background: #FFFFFF;
				border-radius: 6rpx 6rpx 6rpx 6rpx;
				padding: 30upx 34upx;
				font-size: 28upx;
				color: #333333;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.top {
					display: flex;
					justify-content: space-between;
					align-items: center;

					img {
						width: 48upx;
						height: 48upx;
						transform: translateY(6upx);
					}
				}

				.middle {
					display: flex;
					position: relative;
					align-items: center;
					transform: translateY(-6upx);

					.username {
						position: absolute;
						left: 0;
						width: 50%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.name {
						position: absolute;
						left: 50%;
					}
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					font-size: 26upx;

					.phone {
						color: #5E6066;
					}

					.more {
						color: #154AD8;
						display: flex;

						.arrow {
							margin-left: 8upx;
							width: 12upx;
							height: 12upx;
							border-bottom: 3upx solid #154AD8;
							border-right: 3upx solid #154AD8;
							transform: translateY(10upx) rotate(45deg);
						}
					}

				}

			}
		}
		padding-bottom: 110upx ;
	}
	
	.funcArea{
		width: 95%;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 20upx;
		height: 90upx;
		background-color: #fff;
		font-size: 24upx;
		color: #0F39D1;
		.plus,.edit{
			display: flex;
			height: 100%;
			padding: 26upx 0;
			.item{
				flex: 1;
				border-right: 1.5upx solid #D4D4D4;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				&:last-child{
					color: #F76C6F;
					border-right: none;
				}
			}
		}
		.edit{
			display: flex;
			justify-content: flex-end;
			margin-right: 3.5%;
		}
	}
	.bar{
			position: fixed;
			bottom: 0;
			height: 20upx;
			background-color: #f2f4f9;
			width: 100%;
		}
</style>