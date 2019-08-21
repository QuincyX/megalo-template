<template lang='pug'>
.inputComponent
  .label {{label}}
  input.input(v-model="value" :type="type" :placeholder="placeholder" :maxlength="maxlength" @input="handleInput")
  slot.rightIcon(name="rightIcon")
  .rightButton(v-if="rightButton" @click="handleRightButtonClick") {{rightButton}}

</template>

<script>
export default {
	props: {
		label: {
			type: String
		},
		value: {
			type: String
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		},
		maxlength: {
			type: Number,
			default: 0
		},
		rightButton: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			value: ''
		}
	},
	computed: {},
	watch: {},
	methods: {
		handleInput(val) {
			this.$emit('input', val.detail.value)
		},
		handleRightButtonClick() {
			this.$emit('rightButton')
		}
	},
	mounted() {}
}
</script>

<style lang='less' scoped>
.inputComponent {
	padding: 7px 15px;
	display: flex;
	color: #495060;
	background: #fff;
	align-items: center;
	line-height: 1.4;
	font-size: 14px;
	overflow: hidden;
	.label {
		min-width: 65px;
		padding-right: 10px;
		vertical-align: top;
	}
	.input {
		flex: 1;
		line-height: 1.6;
		padding: 4px 0;
		min-height: 22px;
		height: auto;
		vertical-align: top;
	}
	.rightIcon {
		vertical-align: top;
	}
	.rightButton {
		background: @primary;
		color: #fff;
		border-radius: 10px;
		font-size: 12px;
		padding: 3px 7px;
	}
}
</style>
