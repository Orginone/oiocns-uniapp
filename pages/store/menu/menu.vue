<template>
	<view>
		<headbar :localList="'仓库'" ></headbar>
		<personList :listInfo="listInfo" :title="'个人'"   :url="'/pages/warehouse/page2/page2'" ></personList>
		<personList :listInfo="listInfo2" :title="'组织'"   :url="'/pages/warehouse/page2/page2'" ></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[
					{
						name:'应用'
					},
					{
						name:'文件'
					},
					{
						name:'数据'
					}					
				],
				listInfo2:[
					{
						name:'杭州电子科技大学'
					},
					{
						name:'浙江省财政厅'
					},
					{
						name:'浙江省教育局'
					},
					{
						name:'浙江省资源局'
					}					
				]
			};
		},
		onShow() {
			
		}
		
	}
</script>

<style lang="scss">
page{
	background-color: #f2f4f9;
}
</style>
