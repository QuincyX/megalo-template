<config lang="json">
{
  navigationBarTitleText: "主页",
  usingComponents: {
  }
}
</config>

<template lang="pug">
.page
  .navList
    i-button(type="primary" shape="circle" size="mini" v-for="(i,n) in pageList" :key="n" @click="$router.push(i.url)") {{i.name}}
  .test
    input(type="number" v-model="number"
      @input="handleNumberChange"
    )
  .test
    t-input(label="test" align="right"  type="number" v-model="number")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import tInput from '@/components/input'
export default {
  components: { tInput },
  data() {
    return {
      pageList: [
        { name: 'test', url: '/test/index' },
        { name: 'login', url: '/account/login' }
      ],
      number: 0
    }
  },
  computed: {
    ...mapGetters([])
  },
  watch: {},
  methods: {
    ...mapActions([]),
    handleNumberChange({ detail }) {
      console.log(detail.value)
      this.number = detail.value
    }
  },
  mounted() {
    this.number = 100
  }
}
</script>

<style lang="less" scoped>
.navList {
  .padding;
}
.test {
  .border;
}
</style>

