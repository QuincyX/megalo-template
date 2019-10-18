/*
 * @Author: QuincyX (likequincy@outlook.com)
 * @Date: 2019-10-18 14:16:51
 * @Last Modified by:   QuincyX
 * @Last Modified time: 2019-10-18 14:16:51
 */
const fg = require('fast-glob')
const fs = require('fs')

class autoRouter {
  constructor(option) {
    this.option = option
  }
  async generate() {
    await this.updateMainRouter()
    if (this.option.subPackages && this.option.subPackages.length) {
      this.option.subPackages.forEach(async o => {
        await this.updateSubRouter(o)
      })
    }
    console.log('\x1B[32m自动生成路由信息成功 :)')
  }
  getPageList(cwd) {
    const patterns = ['**/*.vue', '!**/__*__.vue', '!**/coms/**']
    let pagePaths = fg.sync(patterns, {
      cwd,
      onlyFiles: true
    })
    return pagePaths.map(
      o => cwd.replace('src/', '') + '/' + o.replace('.vue', '')
    )
  }
  updateMainRouter() {
    return new Promise((resolve, reject) => {
      const pages = this.getPageList('src/pages')
      const homeIndex = pages.findIndex(
        o => o === 'pages/' + this.option.homePage
      )
      if (homeIndex > 0) {
        pages.splice(homeIndex, 1)
        pages.unshift('pages/' + this.option.homePage)
      }
      const sourceData = fs.readFileSync('src/main.js', 'utf8')
      let newString = `pages: [\n`
      pages.forEach((o, n) => {
        if (n === pages.length - 1) {
          newString += `      '${o}'\n`
        } else {
          newString += `      '${o}',\n`
        }
      })
      newString += `    ],`
      const newData = sourceData.replace(/pages:([\s\S]*?)],/, newString)
      fs.writeFileSync('src/main.js', newData)
      resolve()
    })
  }
  updateSubRouter(name) {
    return new Promise((resolve, reject) => {
      const sourceData = fs.readFileSync('src/main.js', 'utf8')
      let result
      const subPages = this.getPageList('src/pages_' + name)
      let subPagesString = `pages_${name}',
        pages: [\n`
      subPages.forEach((o, n) => {
        if (n === subPages.length - 1) {
          subPagesString += `          '${o.replace(`pages_${name}/`, '')}'\n`
        } else {
          subPagesString += `          '${o.replace(`pages_${name}/`, '')}',\n`
        }
      })
      subPagesString += `        ]`
      const reg = new RegExp('pages_' + name + '([\\s\\S]*?)]')
      result = sourceData.replace(reg, subPagesString)
      fs.writeFileSync('src/main.js', result)
      resolve()
    })
  }
}

const instance = new autoRouter({
  homePage: 'home/index',
  subPackages: []
})
instance.generate()
