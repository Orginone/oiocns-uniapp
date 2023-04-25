<template>
	<view>
		<headbar :localList="'办事'" :color="false" :left="'more'" :url="'back'" right></headbar>
		<personList :listInfo='listInfo' :title="'个人'" :chat="false"  :localList="'办事'" :url="url"></personList>
		<personList :listInfo='listInfo2' :title="'组织'" :chat="false" :localList="'办事'"  :url="url"> ></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'/pages/work/page2/page2',
				listInfo:[
					{
						name:'加好友'
					},
					{
						name:'加单位'
					},
					{
						name:'加群'
					},
					{
						name:'办事'
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
					}				
				]
			};
		}
	}
</script>

<style lang="scss" scoped>

</style>
