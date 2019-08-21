export const sampleMixin = {
  data() {
    return {
      status: 'ok'
    }
  },
  mounted() {
    console.log('Vue mixin status:', this.status)
  }
}
export const globalMixin = {
  data() {
    return {}
  },
  mounted() {
    console.log('Vue global mixin ok')
  }
}
