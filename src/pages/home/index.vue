<config lang="json">
{
  navigationBarTitleText: "主页",
  usingComponents: {
  }
}
</config>

<template lang="pug">
.page.centerPage
  i-button(type="primary" shape="circle" size="small" v-for="(i,n) in pageList" :key="n" @click="$router.push(i.url)") {{i.name}}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			pageList: [
				{ name: 'test', url: '/test/index' },
				{ name: 'login', url: '/account/login' }
			]
		}
	},
	computed: {
		...mapGetters([])
	},
	watch: {},
	methods: {
		...mapActions([])
	},
	mounted() {}
}
</script>

<style lang="less" scoped>
</style>

