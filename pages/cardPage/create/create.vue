<template>
	<view class="baseLayout">
		<!-- 头部说明区 -->
		<view class="topArea">
			<view class="top">
				<view class="title">
					<text v-show="!confirm">生成助记词</text>
					<text v-show="confirm">验证助记词</text>
				</view>
				<!-- 切换菜单 -->
				<view class="switchBar" v-show="!confirm">
					<switchBar :menuList="['中文','ENGLISH']" size="28" @change="change"></switchBar>
				</view>
			</view>
			<view class="bottom">
				<text v-if="!confirm">请务必妥善保存助记词，确定之后将进行校验</text>
				<text v-if="confirm">验证您备份的助记词</text>
			</view>
		</view>
		<!-- 助记词选择 -->
		<view class="wordArea" v-if="!confirm">
			<view class="wordItem" v-for="item,index in chineseWords" :key="index" v-if="!language" @click="selectWord(item)" :class="confirmWords.includes(item)?'active':''">
				{{item}}
			</view>
			<view class="wordItemEng" v-for="item,index in englishWords" :key="index" v-if="language" @click="selectWord(item)" :class="confirmWords.includes(item)?'active':''">
				{{item}}
			</view>
		</view>
		<!-- 助记词选择Plus -->
		<view class="wordArea" v-if="confirm">
			<view class="wordItem" v-for="item,index in confirmWords" :key="index" v-if="!language">
				{{item}}
			</view>
			<view class="wordItemEng" v-for="item,index in confirmWords" :key="index" v-if="language">
				{{item}}
			</view>
		</view>
		<!-- 提示区域 -->
		<view class="warningArea">
			<view v-if="!confirm">
				<view class="first">• 妥善保管助记词至隔离网络的安全地方。可用另一离线设备拍照保存，或正确抄写助记词并存放至安全位置。</view>
				<view class="second">• 请勿将助记词在联网环境下分享和存贮，比如邮件、相册、社交应用等。</view>
				<view class="third">• 请勿直接截图保存，如果有人获取你的助记词将直接获取您的资产！</view>
			</view>
			<view v-if="confirm">
				<view class="first" style="padding-left: 8upx;">请按照正确的顺序点击每个文字</view>
			</view>
		</view>
		<!-- 提示区域 -->
		<view class="clickArea" v-if="confirm">
			<view class="clickItem" v-for="item,index in confirmWordsPlus" :key="index" v-if="!language" @click="confirmSelect(item)" :class="confirmSelectWords.includes(item)?'active':''"> 
				{{item}}
			</view>
			<view class="clickItemEng" v-for="item,index in confirmWordsPlusEng" :key="index" v-if="language" @click="confirmSelect(item)" :class="confirmSelectWords.includes(item)?'active':''">
				{{item}}
			</view>
			
		</view>
		<!-- 按钮区域 -->
		<view class="btnArea" v-if="!confirm">
			<view class="change">
				更换助记词
			</view>
			<view class="next" @click="turnConfirm">
				下一步 ({{count}})s
			</view>
		</view>
		<!-- 按钮区域2 -->
		<view class="btnArea" v-if="confirm">
			<view class="change">
				创建找回钱包
			</view>
			<view class="next" @click="createWallet">
				创建助记词钱包
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				language:0,//语言模式
				chineseWords: '发都遇南玩城问拖屋球币密贴雪赞要王很'.split(''), //中文助记词
				englishWords: ['lesson', 'giraffe', 'bounce', 'health', 'annual', 'dirt',
					'gadget', 'brush', 'lamp', 'author', 'really', 'cousin'
				], //英文助记词
				confirmWords: [], //验证助记词
				confirmSelectWords: [], //验证选中助记词
				confirmWordsEng: ['lesson', 'giraffe',  'annual', 'dirt'], //验证助记词
				confirmWordsPlus: '球币密贴雪赞要王很发都遇南玩城问拖屋'.split(''), //验证助记词（顶真）
				confirmWordsPlusEng: ['lesson', 'giraffe', 'bounce', 'health', 'annual', 'dirt',
					'gadget', 'brush', 'lamp', 'author', 'really', 'cousin'
				], //验证助记词英语（顶真）
				count: 30, //倒计时
				confirm:0,//确认模式切换标识
			}
		},
		methods:{
			change(e){
				this.language = e
				this.confirmWords = []
			},
			//下一步
			turnConfirm(){
				if(!this.confirmWords.length){
					return uni.showToast({
						title:'请选择助记词',
						icon:'none'
					})
				}
				this.confirm=!this.confirm
				
			},
			//选中选择助记词
			selectWord(item){
				if(this.confirmWords.includes(item)){
					this.confirmWords = this.confirmWords.filter(it =>{
						return item!= it
					})
				}else{
					this.confirmWords.push(item)
				}
			},
			//选中验证选中助记词
			confirmSelect(item){
				if(this.confirmSelectWords.includes(item)){
					this.confirmSelectWords = this.confirmSelectWords.filter(it =>{
						return item!= it
					})
				}else{
					this.confirmSelectWords.push(item)
				}
			},
			// 创建助记词钱包
			createWallet(){
				console.log(this.confirmWords,this.confirmSelectWords);
				if(this.confirmWords.join(',') !==this.confirmSelectWords.join(',')){
					return uni.showToast({
						title:'请按顺序选择助记词',
						icon:'none'
					})
				}else{
					uni.showToast({
						title:'创建成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack()
					},1000)
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.baseLayout {
		height: 100%;
		width: 100%;
		padding: 0 60upx;
		padding-bottom: 80upx;
		overflow: auto;
		.topArea {
			.top {
				padding-top: 100upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					font-size: 60upx;
					letter-spacing: 0.05em;
				}
			}

			.bottom {
				font-size: 28upx;
				color: #9A9A9A;
			}
		}

		.wordArea,.clickArea {
			margin-top: 40upx;
			width: 100%;
			padding: 40upx 20upx;
			padding-bottom: 10upx;
			background-color: #EDEFFC;
			border-radius: 24upx;
			display: flex;
			flex-wrap: wrap;
			
			.wordItem,.clickItem {
				margin-bottom: 30upx;
				height: 83upx;
				width: 83upx;
				margin-right: 16upx;
				border-radius: 16upx;
				font-size: 48upx;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				filter: drop-shadow(0px 6upx 6upx rgba(138, 138, 138, 0.18));
				&:nth-child(6n+3){
					margin-right: 34upx;
				}
				&:nth-child(6n+6){
					margin-right: 0;
				}
			}			
			.wordItemEng,.clickItemEng {
				margin-bottom: 30upx;
				height: 83upx;
				width: 180upx;
				margin-right: 26upx;
				border-radius: 16upx;
				font-size: 38upx;
				background-color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				filter: drop-shadow(0px 6upx 6upx rgba(138, 138, 138, 0.18));
				&:nth-child(3n+3){
					margin-right: 0;
				}
			}
			
			.active{
				background-color: $main-blue;
				color: #fff;
			}
		}
		
		.clickArea{
			background-color: transparent;
			padding: 0;
			.clickItem{
				height: 90upx;
				width: 90upx;
				filter:none;
			}
			.clickItemEng{
				width: 190upx;
				filter:none;
			}
			.clickItem,.clickItemEng{
				border: 2upx solid #d6d6d6;
			}
		}
		
		.warningArea{
			margin-top: 60upx;
			.first,.second,.third{
				font-size: 28upx;
				color: #9A9A9A;
				margin-bottom: 40upx;
				line-height: 1.5;
				letter-spacing: 0.05em;
			}
			.third{
				color: #F16565;
			}
		}
		.btnArea{
			margin-top: 120upx;
			display: flex;
			justify-content: space-between;
			font-size: 32upx;
			.change,.next{
				color: $main-font;
				border: 2upx solid #95C6FF;
				width: 47%;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 55upx;
			}
			.next{
				color: #fff;
				background-color: $main-blue;
			}
			
		}
	}
</style>