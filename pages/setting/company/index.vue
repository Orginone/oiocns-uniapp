<template>
	<view class="BaseLayout">
        <headbar :localList="'组织,浙江省财政厅'" :left="'none'"></headbar>
        <personList :listInfo='listInfo' icon="['dotPlus', 'right']" :localList="'仓库'" :url="'/pages/shop/page2/page2'"></personList>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listInfo:[
          {
						label:'组织详情',
            url:'pages/setting/company/detail',
						key:''
					},
					{
						label:'权限标准',
            url:'pages/setting/authority/index',
						key:'',
						children:{}
					},
					{
						label:'数据标准',
						key:'',
						children:{}
					},
					{
						label:'内部机构',
						url:'/pages/setting/agency/agency',
						key:'',
						children:{}
					},
          {
						label:'组织集群',
						key:'',
						children:{}
					},
          {
						label:'单位岗位',
						key:'',
						children:{}
					},
          {
						label:'外部群组',
						key:'',
						children:{}
					}					
				],
			};
		},
		watch:{
			
		},
		onLoad(option) {
			let newOption = JSON.parse(decodeURIComponent(option.data));
			newOption?.children.forEach(element => {
				this.listInfo.forEach(item => {
					if(element.label == item.label){
						item.children = element.children
						item.key = element.key
					}else{
						item.itemType == newOption.itemType
						item.key = newOption.key
					}
				})
			});
    },
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>