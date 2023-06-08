<template>
	<view class="BaseLayout">
    <headbar :localList="'组织,浙江省财政厅'" :left="'none'"></headbar>
		<view class="main">
			<basicForm :formData="datalist" :title="title"></basicForm>
			<!-- 子表信息 -->
			<view class="formArea" v-if="type == '部门'">
				<view class="head">
					<view class="title">部门成员</view>
				</view>
				<view class="item">
					<uni-table>
						<uni-tr>
							<uni-th v-for="item,index in formTitle" :key="index" style="color: #333;font-weight: normal;">{{item.name}}</uni-th>
						</uni-tr>
						<uni-tr v-for="item,index in formList" :key="index" >
							<uni-td v-for="it,ind in Object.values(item)" :key="ind" style="color: #9A9A9A;">{{it}}</uni-td>
						</uni-tr>
					</uni-table>
					<view class="more" v-if="formTitle.length > 0" @click="getMore">更多</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			datalist:[
				{
					name:'名称',
					key:'name',
					value:''
				},
				{
					name:'代码',
					key:'code',
					value:''
				},
				{
					name:'加入',
					key:'public',
					value:''
				},
				{
					name:'归属',
					key:'belongName',
					value:''
				},
				{
					name:'创建人',
					key:'creater',
					value:''
				},
				{
					name:'创建时间',
					key:'createTime',
					value:''
				},
				{
					name:'描述信息',
					key:'remark',
					value:''
				}
			],
			formTitle:[{
					name: '账号',
					value: 'code'
				},
				{
					name: '昵称',
					value: 'name'
				},
				{
					name: '签名',
					value: 'remark'
				}],
			formList:[],
			title:'',
			type:''
		};
	},
	watch:{
		
	},
	onLoad(option){
		let key = option.data
		let type = option.type
		if(type != 'undefined'){
			this.type = '部门'
		}else{
			this.type = '单位'
			this.datalist.splice(3,1)
		}
		this.findObject(this.$store.setting.children,key)
	},
	methods: {
		findObject(arr,key){
			if(arr && arr.length >0){
				arr.forEach(element => {
					if(element.key == key){
						this.dataCompare(element)
						return
					}
					if(element.children && element.children.length>0){
						this.findObject(element.children,key)
					}
				});
			}
		},

		dataCompare(data){
			this.title = this.type + '[' + data?.item?.metadata.name + ']基本信息'
			this.datalist.forEach(element => {
				for(var item in data?.item?.metadata){
					if(element.key == item){
						element.value = data?.item?.metadata[item]
					}
					if(element.key == 'belongName'){
						element.value = data?.item?.belong.name
					}
					if(element.key == 'creater'){
						element.value = data?.item?.creater.name
					}
					if(element.key == 'public'){
						element.value = data?.item?.metadata['public']?'开放加入':'需申请加入'
					}
				}
			});
			let json = {}
			data?.item?.members.forEach(item=>{
				json.code = item.code
				json.name = item.name
				json.remark = item.remark
				this.formList.push(json)
			})
		},

		getMore(){
			uni.navigateTo({
				url: '/pages/setting/agency/detail'+'?data=' + encodeURIComponent(JSON.stringify(this.formList))
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.main{
	padding: 0 22upx;
	padding-bottom: 40upx;
}
.more{
	width: 100%;
	display: flex;
	font-size: 24upx;
	justify-content: flex-end;
}
</style>