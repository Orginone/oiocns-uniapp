<template>
	<view class="BaseLayout">
        <headbar :localList="'组织,浙江省财政厅'" :left="'none'"></headbar>
        <personList :listInfo='listInfo' icon="dotPlus" :localList="'仓库'" :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[
          {
						name:'组织详情',
            url:'pages/setting/company/detail',
					},
					{
						name:'权限标准',
            url:'pages/setting/authority/index',
					},
					{
						name:'数据标准'
					},
					{
						name:'内部机构',
						url:'/pages/setting/agency/agency',
					},
          {
						name:'组织集群'
					},
          {
						name:'单位岗位'
					},
          {
						name:'外部群组'
					}					
				],
			};
		},
		watch:{
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>