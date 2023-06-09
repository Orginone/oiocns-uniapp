<template>
	<view class="listArea">
		<view class="total" v-if="title">{{title}}</view>
		<view class="itemArea" >
			<view class="listItem" v-for="item,index in listInfo" :key="index"  >
				<view class="box"></view>
				<view class="name" >{{item.label}}</view>
				<view class="right">
					<!-- <img src="../../static/base/chat.png" alt="" v-if="chat"> -->
					<img :src="'../../static/base/add.png'" alt=""  v-if="icon.includes('add')" >
					<view class="dotPlus">
						<img :src="'../../static/base/dotPlus.png'" alt=""  v-if="icon.includes('dotPlus')" >
					</view>
					<img src="../../static/base/right.png" alt="" @tap="turnDetailPage(item)" v-if="icon.includes('right')">
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
				settingData:{},
				list:[],
			};
		},
		// watch: {
		// 	listInfo(newVal) {
		// 		this.list = newVal;
		// 	},
		// 	deep:true
		// },
		created() {
			console.log('进入',this.listInfo)
			this.settingData = this.$store.setting 
			// let arr = []
			// this.settingData.children.forEach(element => {
			// 	let obj = {
			// 		label:element.label,
			// 		key:element.key,
			// 	}
			// 	arr.push(obj);
			// });
			// console.log('arr',arr);
			// this.list = arr;
		},
		methods: {
			turnDetailPage(item) {
				if(item){
					// console.log(JSON.parse(JSON.stringify(item)));
					if(item.itemType =='人员'){
						uni.navigateTo({
							url: '/pages/setting/person/index'+'?data=' + JSON.stringify(item.key)
						})
					}
					else if(item.itemType == '权限'){
						uni.navigateTo({
							url: '/pages/setting/authority/index'+'?data=' + JSON.stringify(item.key)
						})
					}
					else if(item.itemType == '单位'){
						uni.navigateTo({
							url: '/pages/setting/company/index'+'?data=' + JSON.stringify(item.key)
						})
					}
					else if(item.label == '内部机构'){
						uni.navigateTo({
							url: '/pages/setting/tree/index'+'?data=' + JSON.stringify(item.label)
						})
					}
					else{
						uni.navigateTo({
							url: item.url+'?data=' + JSON.stringify(item.key)
						})
					}
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