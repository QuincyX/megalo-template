<config lang="json">
{
  navigationBarTitleText: "测试页面",
  usingComponents: {

  }
}
</config>

<template lang="pug">
.page
  .card
    .item
      .label less
      .content.colorText status OK!
    .item
      .label 全局过滤器
      .content {{time}} => {{time|formatDate}}
    .item
      .label 路由方法
      .content(@click="$router.push('/')") 点击回到首页
    .item
      .label Vue mixin
      .content status: {{status}}
    .item
      .label 信息提示
      .content
        .btn(@click="$toast.success('这是一条成功提醒')") toast
        .btn(@click="$message.success('这是一条成功提醒')") message
        .btn(@click="handleLoading") loading
    .item
      .label 持久化vuex
      .content(@click="$store.commit('countPlus')") count：{{count}}
    .item
      .label v-html
      .content(v-html="html")
    .item
      .label UI组件
      .content
        i-button(type="success" shape="circle" size="small" @click="$message.success('iview weapp 组件调用成功')") iview 按钮
  .listContent
    .item(v-for="i in 20" :key="i") list item {{i}}
  i-message#message
  i-toast#toast
  q-loading(v-if="loading" message="2s后自动关闭")

</template>

<script>
import { mapGetters } from 'vuex'
import { sampleMixin } from '@/utils/mixin'
import qLoading from '@/components/loading'
export default {
	components: { qLoading },
	mixins: [sampleMixin],
	data() {
		return {
			time: Date.now(),
			html: '<span style="font-size:20px;color:yellow;">html ok!</span>',
			loading: false
		}
	},
	computed: {
		...mapGetters(['count'])
	},
	methods: {
		async handleLoading() {
			this.loading = true
			await this.$sleep().then(() => {})
			this.loading = false
		}
	},
	mounted() {}
}
</script>

<style lang="less" scoped>
.card {
	.debug;
	padding: 1em;
	.item {
		padding: 1em 0;
		.border-bottom;
		.label {
			.inline;
			.vtop;
			padding-right: 1em;
			text-align: right;
			width: 8em;
			&:after {
				content: '：';
				display: inline;
			}
		}
		.content {
			.inline;
			.btn {
				.inline;
				.color;
				margin-right: 20px;
			}
		}
	}
}
.listContent {
	.item {
		padding: 5px;
		.border-bottom;
		.center;
	}
}
.colorText {
	animation: colorText 2s infinite;
}
@keyframes colorText {
	0% {
		color: #fff;
	}
	20% {
		color: yellow;
	}
	50% {
		color: blue;
	}
	80% {
		color: green;
	}
	100% {
		color: #fff;
	}
}
</style>
