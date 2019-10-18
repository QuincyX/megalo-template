<template lang='pug'>
.inputComponent(:class="{'alignRight':(align==='right'),'noBorder':!border}")
  .label(v-if="label") {{label}}
  .content(v-if="type==='text'" :class="{hasRightBtn:rightButton}")
    input(type="text" v-model="text"
      :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled"
      @input="handleTextChange"
    )
    .rightButton(v-if="rightButton" @click="handleRightButtonClick") {{rightButton}}
  .content(v-else-if="type==='number'")
    input(type="number" v-model="number"
      :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled"
      @input="handleNumberChange"
    )
  .content(v-else-if="type==='mobile'")
    input(type="number" v-model="number"
      :placeholder="placeholder||'请输入手机号'" :maxlength="11" :disabled="disabled"
      @input="handleNumberChange"
    )
  .content.password(v-else-if="type==='password'")
    input(type="text" v-model="text"
      :password="!isShowPassword" :placeholder="placeholder || '请输入密码'" :maxlength="24" :disabled="disabled"
      @input="handleTextChange"
    )
    .i-icon(:class="passwordRightIcon" @click="isShowPassword=!isShowPassword")
  .content(v-else-if="type==='textarea'")
    textarea.textarea(v-model="textarea"
      :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled"
      @input="handleTextareaChange"
    )
  .content(v-else-if="type==='date'")
    picker.picker(mode="date" v-model="date"
      start="1930-01-01" :end="endDate" :disabled="disabled"
      @change="handleDateChange"
    )
      span {{date || placeholder}}
  .content(v-else-if="type==='region'")
    picker.picker(mode="region" v-model="region"
      :disabled="disabled"
      @change="handleRegionChange"
    )
      span {{region[0]}}，{{region[1]}}，{{region[2]}}
  .content(v-else-if="type==='picker'")
    picker.picker(mode="selector" v-model="pickerIndex"
      :disabled="disabled" :range="pickerListObject" range-key="label"
      @change="handlePickerChange"
    )
      span {{currentPicked || placeholder}}
  .content(v-else-if="type==='gender'")
    radio-group.radioGroup(@change="handleGenderChange")
      radio.radio(:disabled="disabled" value="male" :checked="gender==='male'")
        span 男
      radio.radio(:disabled="disabled" value="female" :checked="gender==='female'")
        span 女
  .content.cell(v-else-if="type==='cell'" @click="handleClick")
    .cellValue {{value | sliceString(15) || placeholder}}
    .i-icon.i-icon-narrow(v-if="isLink")

</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    isShowPassword: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: -1
    },
    rightButton: {
      type: String,
      default: ''
    },
    genderFormat: {
      type: String,
      default: 'number'
    },
    align: {
      type: String,
      default: 'left'
    },
    border: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pickerList: {
      type: Array,
      default: []
    },
    to: {
      type: String,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      number: 0,
      text: '',
      textarea: '',
      date: '1980-06-15',
      gender: 'male',
      pickerIndex: 0,
      region: [],
      endDate: Date.now()
    }
  },
  computed: {
    passwordRightIcon() {
      return this.isShowPassword ? 'iconEye' : 'iconEyeClose'
    },
    pickerListObject() {
      if (this.pickerList && this.pickerList.length) {
        let a = this.pickerList[0]
        if (typeof a != 'object') {
          return this.pickerList.map((i, n) => {
            return { label: i, value: n }
          })
        } else {
          return this.pickerList
        }
      }
    },
    currentPicked() {
      if (this.pickerListObject && this.pickerListObject.length) {
        const c = this.pickerListObject[this.pickerIndex]
        if (c) {
          return c.label
        } else {
          return '请选择'
        }
      }
    }
  },
  watch: {
    value(val) {
      this.initValue()
    }
  },
  methods: {
    handleClick() {
      if (this.type === 'cell' && this.isLink) {
        if (this.to) {
          this.$router.push(this.to)
        } else {
          this.$emit('click')
        }
      }
    },
    handleTextChange(e) {
      this.text = e.detail.value
      this.$emit('input', e.detail.value)
    },
    handleNumberChange(e) {
      this.number = e.detail.value
      this.$emit('input', e.detail.value)
    },
    handleTextareaChange(e) {
      this.textarea = e.detail.value
      this.$emit('input', e.detail.value)
    },
    handleDateChange(e) {
      this.date = this.$options.filters.formatDate(e.detail.value)
      this.$emit('input', this.date)
      this.$emit('change', this.date)
    },
    handleGenderChange(e) {
      this.gender = e.detail.value
      if (this.genderFormat === 'string') {
        this.$emit('input', e.detail.value)
        this.$emit('change', e.detail.value)
      } else if (this.genderFormat === 'number') {
        this.$emit('input', e.detail.value === 'male' ? 0 : 1)
        this.$emit('change', e.detail.value === 'male' ? 0 : 1)
      } else {
        this.$emit('input', {
          string: e.detail.value,
          number: e.detail.value === 'male' ? 0 : 1
        })
        this.$emit('change', {
          string: e.detail.value,
          number: e.detail.value === 'male' ? 0 : 1
        })
      }
    },
    handleRegionChange(e) {
      this.region = e.detail.value
      this.$emit('input', e.detail.value)
      this.$emit('change', e.detail.value)
    },
    handlePickerChange(e) {
      if (this.pickerList.length) {
        this.pickerIndex = e.detail.value
        const c = this.pickerListObject[this.pickerIndex]
        if (c) {
          this.$emit('input', c.label)
          this.$emit('change', c)
        }
      }
    },
    handleRightButtonClick() {
      this.$emit('rightButton')
    },
    handleRightIconClick() {
      this.$emit('rightIcon')
    },
    initValue() {
      if (this.type === 'number') {
        this.number = Number(this.value)
      } else if (this.type === 'gender') {
        if (this.genderFormat === 'string') {
          this.gender = this.value
        } else if (this.genderFormat === 'number') {
          if (this.value == 1) {
            this.gender = 'female'
          } else if (this.value == 0) {
            this.gender = 'male'
          } else {
            this.gender = 'un'
          }
        }
      } else if (this.type === 'textarea') {
        this.textarea = this.value
      } else if (this.type === 'date') {
        if (this.value) {
          this.date = this.$options.filters.formatDate(this.value)
        } else {
          this.date = ''
        }
        this.$emit('input', this.date)
      } else if (this.type === 'mobile') {
        this.number = Number(this.value)
      } else if (this.type === 'password') {
        this.password = this.value
      } else if (this.type === 'picker') {
        if (this.pickerListObject && this.pickerListObject.length)
          this.pickerIndex = this.pickerListObject.findIndex(
            o => o.label === this.value
          )
      } else {
        this.text = this.value
      }
    }
  },
  mounted() {
    this.initValue()
  }
}
</script>

<style lang='less' scoped>
.inputComponent {
  padding: 11px 15px;
  display: flex;
  background: @white;
  .size();
  .oh;
  .borderBottom;
  .label {
    color: @textTitle;
    min-width: 5em;
    padding-right: 10px;
  }
  .content {
    flex: 1;
    color: @textPrimary;
    input {
      .vtop;
    }
    .textarea {
      border: 1px dashed @border;
      width: calc(100% - 10px);
      background: @background;
      .radius;
      text-align: left;
    }
    .picker {
      height: auto;
    }
    .radioGroup {
      display: flex;
      .radio {
        .marginRight;
      }
    }
  }
  .cell {
    display: flex;
    .cellValue {
      flex: 1;
      text-align: right;
      color: @textGrey;
    }
    .i-icon {
      color: @textGrey;
      transform: rotate(90deg);
    }
  }
  .password {
    display: flex;
    .i-icon {
      padding: 5px;
    }
    input {
      flex: 1;
    }
  }
  .hasRightBtn {
    display: flex;
    align-items: center;
    input {
      flex: 1;
    }
    .rightButton {
      background: @primary;
      color: #fff;
      border-radius: 10px;
      font-size: 12px;
      padding: 3px 7px;
    }
  }
}
.noBorder {
  border: none;
}
.alignRight {
  .content {
    text-align: right;
  }
  .radioGroup {
    justify-content: flex-end;
  }
}
</style>
