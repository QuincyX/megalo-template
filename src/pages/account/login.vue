<config lang="json">
{
  navigationBarTitleText: "账号登录",
  usingComponents: {
    "i-button": "/static/iview/button/index",
  }
}
</config>

<template lang="pug">
.page
  .form
    .inputItem
      q-input(v-model="form.mobile" label="手机号：" placeholder="请输入手机号" type="text" :maxlength="11")
    .inputItem(v-if="loginType==='password'")
      q-input(v-model="form.password" label="密码：" placeholder="请输入密码" :type="isShowPassword?'text':'password'" :maxlength="24")
        i.iconfont.leftIcon(slot="rightIcon" @click="switchPasswordVisible" :class="isShowPassword?'iconeye-line':'iconeye-close-line'")
    .inputItem(v-else)
      q-input(v-model="form.code" label="验证码：" placeholder="请输入验证码" type="text" :maxlength="4" :rightButton="smsCountdown===0?'验证码':smsCountdown+'s后重发'" @rightButton="handleGetCode")
    i-button(@click="handleLogin" type="primary") 登录
    .switch
      .btn(@click="handleSwitchPassword" v-if="loginType==='sms'") 使用密码登录
      .btn(@click="handleSwitchSms" v-if="loginType==='password'") 使用手机验证码登录

</template>

<script>
import { mapGetters } from 'vuex'
import qInput from '@/components/input'
export default {
	components: { qInput },
	data() {
		return {
			form: {
				mobile: '',
				password: '',
				code: ''
			},
			formError: {
				mobile: false,
				password: false
			},
			isShowPassword: false,
			loginType: 'password',
			showAgreement: false,
			smsCountdown: 0,
			countdownInstance: null
		}
	},
	computed: {
		...mapGetters(['image', 'icon', 'isWeixin']),
		eyeIcon() {
			if (this.isShowPassword) {
				return 'closed-eye'
			} else {
				return 'eye'
			}
		}
	},
	methods: {
		handleRegister() {
			this.$router.push('/account/register?c=' + this.$mp.query.c)
		},
		handleMobileChange(val) {
			this.form.mobile = val.detail.value
		},
		handlePasswordChange(val) {
			this.form.password = val.detail
		},
		handleCodeChange(val) {
			this.form.code = val.detail
		},
		switchPasswordVisible() {
			this.isShowPassword = !this.isShowPassword
		},
		handleSwitchPassword() {
			this.loginType = 'password'
			this.isShowPassword = false
			this.form.code = ''
		},
		handleSwitchSms() {
			this.loginType = 'sms'
			this.form.password = ''
		},
		afterLogin(val) {
			if (this.$store.getters['doctor/currentDoctorId']) {
				this.$router.push(
					'/doctor/home?id=' + this.$store.getters['doctor/currentDoctorId']
				)
			} else {
				this.$router.push(this.$mp.query.c || '/home/index')
			}
		},
		handleLogin() {
			console.log(this.form)
			this.validate()
				.then(() => {
					if (this.loginType === 'password') {
						this.$store
							.dispatch('user/loginByPhone', this.form)
							.then(res => {
								this.afterLogin(res)
							})
							.catch(err => {
								this.$notify(err.message)
							})
					} else if (this.loginType === 'sms') {
						this.$store
							.dispatch('user/loginBySms', this.form)
							.then(res => {
								this.afterLogin(res)
							})
							.catch(err => {
								this.$notify(err.message)
							})
					}
				})
				.catch(err => {
					this.$notify(err)
				})
		},
		validate() {
			return new Promise((resolve, reject) => {
				if (!this.form.mobile) {
					reject('手机号码不能为空')
				} else if (this.form.mobile.length !== 11) {
					reject('请输入11位手机号码')
				} else if (this.loginType === 'password' && !this.form.password) {
					reject('密码不能为空')
				} else if (this.loginType === 'sms' && !this.form.code) {
					reject('验证码不能为空')
				} else {
					resolve()
				}
			})
		},
		handleGetCode() {
			if (this.smsCountdown === 0) {
				if (this.form.mobile == '' || this.form.mobile.length != 11) {
					this.$notify('手机号格式不对')
				} else {
					this.$http
						.post('/seller/sendCode', { mobile: this.form.mobile })
						.then(res => {
							this.startLoop()
						})
						.catch(err => {
							this.$notify(err.message)
						})
				}
			}
		},
		startLoop() {
			if (this.countdownInstance) {
				this.countdownInstance = null
			}
			this.smsCountdown = 60
			this.countdownInstance = setInterval(() => {
				if (this.smsCountdown > 0) {
					this.smsCountdown--
				} else {
					clearInterval(this.countdownInstance)
				}
			}, 1000)
		}
	},
	mounted() {
	}
}
</script>
<style lang="less" scoped>
.page {
	.center;
	background: @white;
	padding: 2em;
}
.header {
	.btn {
		text-align: right;
		color: @primary;
	}
	.msg {
		.size(12px);
		.hh(30px);
		.bold;
	}
}
.form {
	text-align: left;
}
.inputItem {
	.lh(16px);
	.size(15px);
	position: relative;
	margin-bottom: 1em;
	.leftIcon {
		margin-right: 0.5em;
	}
	&:after {
		content: '';
		display: inline-block;
		width: 100%;
		height: 1px;
		background: @border;
		position: absolute;
		bottom: 0;
		left: 0;
	}
}
.switch {
	.color;
	.hh(20px);
	display: flex;
	justify-content: space-between;
}
.moreLogin {
	.text {
		.em {
			.inline;
			.color;
		}
	}
}
</style>
