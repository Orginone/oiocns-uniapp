<template>
	<view class="loginPage">
		<!-- 账号手机登录 -->
		<view class="login" v-show="stepState ==0">
			<view class="title">
				<view class="account" v-show="switchMode">
					<view class="main">账号密码登录</view>
					<view class="sub">请输入用户名和密码</view>
				</view>
				<view class="phone" v-show="!switchMode">
					<view class="main">手机号码登录</view>
					<view class="sub">未注册的手机号登录成功后将自动注册</view>
				</view>
			</view>
			<view class="login-form">
				<view class="mode1" v-if="switchMode">
					<view class="username">
						<view class="name">用户名</view>
						<view class="input"><input type="text" placeholder="请输入用户名和手机号码"></view>
					</view>
					<view class="password">
						<view class="name">密码</view>
						<view class="input"><u-input type="password" placeholder="请设置密码" :password-icon="passwordIcon"
								placeholder-style="color:#808080" /></view>
					</view>
				</view>
				<view class="mode2" v-if="!switchMode">
					<view class="select">
						<uni-data-select v-model="selectValue" :localdata="actionSheetList" :clear="false"
							@change="changeSelect"></uni-data-select>
					</view>
					<view class="input"><input type="text" placeholder="输入手机号"></view>
				</view>
			</view>
			<!-- 切换登录 -->
			<view class="switch">
				<view class="ico"><img src="../../static/base/switch.png" alt=""></view>
				<view class="item1" v-if="switchMode" @click="switchMode=!switchMode;haveCatpcha=0">手机号码登录</view>
				<view class="item2" v-if="!switchMode" @click="switchMode=!switchMode;haveCatpcha=0">
					账号密码登录
					<view class="warning">手机号码无法使用</view>
				</view>
			</view>
		</view>
		<!-- 输入验证码 -->
		<view class="captcha" v-show="stepState==1">
			<view class="title">
				<view class="back" @click="turnBack">
					<uni-icons type="arrow-left" size="30" style="color: #D8D8D8;"></uni-icons>
				</view>
				<view class="textArea">
					<view class="main">请输入验证码</view>
					<view class="sub">验证码会发送至 {{'+86'}} {{'12312341234'}}</view>
				</view>

			</view>
			<view class="input">
				<u-message-input mode="bottomLine" @finish="finishCaptcha" :maxlength="6" :focus="true" :bold="false"
					:breathe="false"></u-message-input>
			</view>
			<view class="tip">
				<view class="error" v-if="captchaRight==1">
					<view class="ico">
						!
					</view>
					请输入正确的验证码
				</view>
				<view class="success" v-if="captchaRight==2">
					<view class="ico">
						✔
					</view>
					验证完成
				</view>
			</view>
			<view class="count">
				{{countdown}}秒后重新获取
			</view>
			<view class="getCaptcha" v-if="showGetCaptcha" @click="getCaptcha">
				获取验证码
			</view>
		</view>
		<!-- 首次使用注册 -->
		<view class="signup" v-show="stepState==2">
			<view class="title">
				<view class="account">
					<view class="main">欢迎使用奥集能</view>
					<view class="sun">请完善个人信息</view>
				</view>
			</view>
			<view class="login-form">
				<view class="mode1">
					<view class="username">
						<view class="name">姓名</view>
						<view class="input"><input type="text" placeholder="请输入姓名"></view>
					</view>
					<view class="username">
						<view class="name" style="border-right: 2upx solid #9a9a9a;">{{'+86'}}</view>
						<view class="input">{{12312341234}}</view>
					</view>
					<view class="username">
						<view class="name">密码 </view>
						<view class="input"><u-input type="password" placeholder="请设置密码" :password-icon="passwordIcon"
								placeholder-style="color:#808080"></u-input></view>
					</view>
				</view>

			</view>

		</view>

		<!-- 勾选同意 -->
		<view class="nextstep">
			<view class="agree">
				<view class="tip" v-show="showtip">请勾选后再登陆</view>
				<u-checkbox v-model="checked" shape="circle"></u-checkbox>
				<view class="text">
					同意
					<view class="blue">《服务条款》</view>
					与
					<view class="blue">《隐私条款》</view>
				</view>
			</view>
			<!-- 下一步 -->
			<view :class="checked?'btn-area': 'btn-area notready'" v-if="stepState!=1">
				<view class="btns" v-if="haveCatpcha==0">
					<view class="btn1" v-show="switchMode" @click="turnPage()">
						下一步
					</view>
					<view class="btn2" v-show="!switchMode" @click="sendCaptcha()">
						发送验证码
					</view>
				</view>

				<view class="btns" v-if="stepState==2">
					<view class="btn1" @click="turnPage()">
						下一步
					</view>
				</view>

				<view class="slider" v-if="!switchMode&&haveCatpcha==1&&stepState==0">
					<moveVerify @result='verifyResult' ref="verifyElement"></moveVerify>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false, //勾选标识
				showtip: 0, //未勾选提示框
				ready: 1, //判断表示/下一步
				switchMode: 1, //账号密码登录模式
				showList: 0, //手机号前缀下拉
				selectValue: '+86', //手机号前缀下拉选择值
				haveCatpcha: 0, //是否获取验证码
				resultData: null, //滑动值对象
				sliderRes: false, //滑动通过标识
				stepState: 0, //登录进度
				captchaRight: 0, //验证码正确标识
				tureCaptcha: 111111, //正确的验证码
				countdown: 60, //倒计时
				timer: '', //定时器
				showGetCaptcha: 0, //显示重新获取
				needSet: true, //判断是否为初次使用
				passwordIcon: true, //密码可见
				actionSheetList: [{
						value: '+86',
						text: '+86'
					},
					{
						value: '+198',
						text: '+198'
					}
				]
			};
		},
		onLoad() {

		},
		destroyed() {
			clearInterval(this.timer);
		},
		methods: {
			//发送验证码
			sendCaptcha() {
				if (!this.checked) {
					return uni.showToast({
						title: '请勾选服务条款',
						icon: 'none'
					})
				} else if (!this.ready) {
					return
				}
				this.haveCatpcha = 1
			},
			//跳转页面
			turnPage() {
				if (!this.checked) {
					return uni.showToast({
						title: '请勾选服务条款',
						icon: 'none'
					})
				} else if (!this.ready) {
					return
				}
				uni.switchTab({
					url: '/pages/connect/connect'
				})
			},
			//返回上一页
			turnBack() {
				this.stepState = 0
			},
			// 选择下拉
			changeSelect(data) {
				this.selectValue = data
			},
			/* 校验结果回调函数 */
			verifyResult(res) {
				this.resultData = res;
				this.sliderRes = res.flag
				if (this.sliderRes == true) {
					setTimeout(() => {
						this.stepState = 1
						this.setCountdown()
					}, 500)
				}
			},
			/* 校验插件重置 */
			// verifyReset() {
			// 	this.$refs.verifyElement.reset();

			// 	/* 删除当前页面的数据 */
			// 	this.resultData = {};
			// }
			// 验证码输入完成
			finishCaptcha(e) {
				console.log(e);
				if (e == this.tureCaptcha) {
					this.captchaRight = 2
					if (this.needSet) {
						setTimeout(() => {
							this.stepState = 2
						}, 1000)

					} else {
						console.log('直接登录');
					}

				} else {
					this.captchaRight = 1
				}
			},
			//倒计时
			setCountdown() {
				if (this.timer) {
					return
				}
				this.countdown = 60
				this.timer = setInterval(() => {
					this.countdown--
					if (this.countdown <= 0) {
						clearInterval(this.timer);
						this.showGetCaptcha = 1
					}
				}, 1000)
			},
			//获取验证码
			getCaptcha() {
				this.timer = ''
				this.setCountdown()
				this.showGetCaptcha = 0
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.loginPage {
		width: 100%;
		height: 100%;
		padding: 0 52upx;
		display: flex;
		flex-direction: column;

		.login,
		.signup {
			width: 100%;
			margin-top: 360upx;

			.title {
				display: flex;
				flex-direction: column;

				.account,
				.phone {
					.main {
						font-size: 56upx;

					}

					.sub {
						font-size: 28upx;
						color: #9A9A9A;
					}
				}
			}

			.login-form {
				margin-top: 140upx;
				width: 100%;

				.mode1,
				.mode2 {
					width: 100%;
					display: flex;
					flex-direction: column;

					.username,
					.password {
						width: 100%;
						height: 86upx;
						display: flex;
						border-bottom: 2upx solid #9A9A9A;

						display: flex;
						align-items: center;

						.name {
							width: 105upx;
							font-size: 32upx;
						}

						.input {
							padding-left: 20upx;
							flex: 1;

							input {
								color: #000;
							}
						}
					}


				}

				.mode2 {
					height: 86upx;
					display: flex;
					flex-direction: row;
					align-items: center;
					box-sizing: border-box;

					.select {
						width: 130upx;
						height: 72upx;
						display: flex;
						align-items: center;
					}

					.input {
						flex: 1;
						height: 100%;
						margin-left: 20upx;
						border-bottom: 2upx solid #9A9A9A;
						display: flex;
						align-items: center;
					}
				}
			}

			.switch {
				display: flex;
				margin-top: 30upx;
				align-items: center;

				.ico {
					height: 32upx;
					width: 32upx;
					margin-right: 10upx;

					img {
						height: 32upx;
						width: 32upx;
					}
				}

				.item1,
				.item2 {
					color: #3D5ED1;
					font-size: 24upx;
				}

				.item2 {
					width: 100%;
					display: flex;
					justify-content: space-between;
				}
			}

		}

		.captcha {
			width: 100%;
			margin-top: 400upx;

			.title {
				display: flex;
				height: 100upx;

				.back {
					height: 94upx;
					width: 98upx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 100upx;
					border: 2upx solid #D8D8D8;
				}

				.textArea {
					display: flex;
					flex-direction: column;
					padding-left: 20upx;
					transform: translateY(-6upx);

					.main {
						font-size: 44upx;
						display: flex;
						align-items: center;
					}

					.sub {
						margin-top: 10upx;
						color: #B1B1B1;
						font-size: 28upx;
						display: flex;
						align-items: center;
					}
				}

			}

			.input {
				margin-top: 80upx;
			}

			.tip {
				font-size: 28upx;
				margin-top: 20upx;
				padding-left: 50upx;

				.error {
					display: flex;
					color: #F16565;
					align-items: center;

					.ico {
						background-color: #F16565;
					}
				}

				.success {
					align-items: center;
					display: flex;
					color: #34C04A;

					.ico {
						background-color: #34C04A;
					}
				}

				.ico {
					margin-right: 20upx;
					width: 36upx;
					height: 36upx;
					color: #fff;
					font-size: 24upx;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 4upx;
				}
			}

			.count {
				width: 100%;
				display: flex;
				justify-content: center;
				margin-top: 30upx;
				color: #B1B1B1;
				font-size: 24upx;
			}

			.getCaptcha {
				margin: 0 auto;
				margin-top: 40upx;
				width: 50%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #34C04A;
				border-radius: 10upx;
				color: #fff;
			}
		}

		.nextstep {
			flex: 1;
			flex-direction: column;
			justify-content: center;
			display: flex;
			flex-wrap: wrap;

			.agree {
				display: flex;
				position: relative;
				padding-left: 20upx;

				.tip {
					position: absolute;
					top: -90upx;
					left: -0upx;
					background-color: #7A7A7A;
					padding: 10upx 18upx 12upx 16upx;
					border-radius: 6upx;
					color: #fff;
					font-size: 24upx;
					border-color: #7A7A7A;

					&::after {
						content: '';
						position: absolute;
						width: 0;
						height: 0;
						top: 95%;
						background-color: transparent;
						left: 10%;
						border-left: 16upx solid transparent;
						border-right: 16upx solid transparent;
						border-top: 16upx solid #7A7A7A;
					}
				}

				.text {
					display: flex;

					.blue {
						color: #004DA6;
					}
				}


			}

			.btn-area {
				margin-top: 32upx;
				width: 100%;
				height: 88upx;

				.btns {
					width: 100%;
					height: 88upx;
					border-radius: 44upx;
					background-color: transparent;
					color: #fff;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #3D5ED1;
				}

				.slider {
					height: 90%;
					width: 100%;
				}

			}

			.notready {
				.btns {
					background-color: #C8E2FF;
				}
			}
		}


	}
</style>