<template>
	<view>
		<headbar :localList="localList"></headbar>
		<personList :listInfo="listInfo"  :url="'/pages/warehouse/page4/page4'"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[
					{
						name:'办公室'
					},
					{
						name:'科研室'
					},
					{
						name:'财务室'
					},
					{
						name:'科研处'
					},
					{
						name:'学生处'
					}
				],
				localList:[]
			};
		},
		onLoad(options) {
			let data = JSON.parse(options.data)
			this.localList = uni.getStorageSync('localList').slice(0,3)
			this.localList[2]=data.name
			console.log(this.localList);
			uni.setStorageSync('localList',this.localList)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">

</style>
