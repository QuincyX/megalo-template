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
  .content(v-html="articleDetail.content")
  i-message#message
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['articleDetail'])
  },
  watch: {},
  methods: {
    ...mapActions(['getArticleDetail'])
  },
  mounted() {
    if (this.$route.query.id) {
      this.getArticleDetail(this.$route.query.id)
    }
  }
}
</script>
