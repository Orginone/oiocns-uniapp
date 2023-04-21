<template>
	<view>
		<headbar :localList="localList"></headbar>
		<personList :listInfo="listInfo1" :title="'岗位'" :url="'/pages/warehouse/page3/page3'" ></personList>
		<personList :listInfo="listInfo2" :title="'岗位'" :url="'/pages/warehouse/page3/page3'" ></personList>
		<personList :listInfo="listInfo3" :title="'单位群组'" :url="'/pages/warehouse/page3/page3'" ></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				localList: [], //当前页
				listInfo1: [{
						name: '资产管理学院',
					},
					{
						name: '人事管理学院'
					},
					{
						name: '财务管理学院'
					},
					{
						name: '开发管理学院'
					},
					{
						name: '自动化学院'
					}
				],
				listInfo2: [{
						name: '资产管理岗'
					},
					{
						name: '人事管理岗'
					},
				],
				listInfo3: [{
						name: '杭电软件售后资源群'
					},
					{
						name: '教学科研群'
					},
				]
			};
		},
		onLoad(options) {
			let data = JSON.parse(options.data)
			this.localList = uni.getStorageSync('localList').slice(0,2)
			this.localList[1]=(data.name)
			uni.setStorageSync('localList',this.localList)
			console.log(this.localList);
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>