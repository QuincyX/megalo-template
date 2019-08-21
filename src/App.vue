<script>
export default {
	data() {
		return {}
	},
	methods: {},
	mounted() {
		console.log('isLogin:', this.$store.getters.isLogin)
		console.log('token:', this.$store.getters.token)
		console.log('baseURL:', process.env.VUE_APP_BASEURL)
	},
	onLaunch(options) {
		console.log('App onLaunch')
	},
	onShow(options) {
		console.log('App onShow')
	},
	onHide() {
		console.log('App onHide')
	},
	onError(msg) {
		console.log('App onError')
		console.log(msg)
	}
}
</script>

<style lang="less">
@import './style/global.less';
</style>

