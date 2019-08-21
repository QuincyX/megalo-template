<config lang="json">
{
  navigationBarTitleText: "文章详情",
  usingComponents: {
    "i-message": "/static/iview/message/index",
  }
}
</config>

<template lang="pug">
.article
  .content(v-html="html.detail")
  i-message#message
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { route } from '@/utils/mixin.js'
export default {
	mixins: [route],
	data() {
		return {
			html: {
				title: '',
				detail: ''
			}
		}
	},
	computed: {
		...mapGetters([])
	},
	watch: {},
	methods: {
		async getArticle(id) {
			this.html = await this.$http.post('/article/' + id)
		}
	},
	mounted() {
		if (this.route.query.id) {
			this.getArticle(this.route.query.id)
		}
	}
}
</script>
