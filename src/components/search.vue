<template lang='pug'>
.searchComponent(@click="handleClick")
  .input
    i-icon.icon(type="search")
    input(v-model="text" placeholder="请输入搜索内容")
  .btn(v-if="!!text" @click="handleSubmit") 搜索

</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.text)
      this.text = ''
    },
    handleClick() {
      this.$emit('click')
    }
  },
  mounted() {
    if (this.value) this.text = this.value
  },
  watch: {
    value() {
      if (this.value) this.text = this.value
    }
  }
}
</script>

<style lang='less' scoped>
.searchComponent {
  background: @white;
  .marginBottom;
  .padding;
  display: flex;
  align-items: center;
  .input {
    background: @background;
    .radius(20px);
    flex: 1;
    padding: 5px;
    display: flex;
    align-items: center;
    .iconSearch {
      padding: 0 5px;
    }
    input {
      flex: 1;
    }
  }
  .btn {
    .marginLeft;
    .radius(10px);
    padding: 3px 7px;
    background: @primary;
    color: @white;
  }
}
</style>
