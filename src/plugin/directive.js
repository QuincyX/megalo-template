const randomColorList = [
  '#e74c3c',
  '#e67e22',
  '#f1c40f',
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6'
]
function randomColor() {
  return randomColorList[
    Math.round(Math.random() * (randomColorList.length - 1))
  ]
}
export default {
  install: (Vue, options) => {
    Vue.directive('randomColor', (el, val) => {
      el.style.color = randomColor()
      el.onclick = () => {
        el.style.color = randomColor()
      }
    })
    Vue.directive('randomColorBg', (el, val) => {
      el.style.color = '#fff'
      el.style.backgroundColor = randomColor()
      el.onclick = () => {
        el.style.backgroundColor = randomColor()
      }
    })
    Vue.directive('hashTo', (el, val) => {
      el.onclick = () => {
        document.body.scrollTop = document.querySelector(val.value).offsetTop
      }
    })
  }
}
