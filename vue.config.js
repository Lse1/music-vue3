// const jsdom = require('jsdom')
// const { JSDOM } = jsdom
module.exports = {
  publicPath: '/',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  }
  // // 以下代码是安装了预渲染的插件之后自动添加的
  // pluginOptions: {
  //   prerenderSpa: {
  //     registry: undefined,
  //     renderRoutes: [
  //       '/',
  //       '/recommend',
  //       '/video',
  //       '/singer',
  //       '/rank',
  //       '/search',
  //       '/account',
  //       '/detail',
  //       '/video',
  //       '/videoplayer',
  //       '/seemore'
  //     ],
  //     useRenderEvent: true,
  //     headless: true,
  //     onlyProduction: true,
  //     postProcess: route => {
  //       // console.log(route)
  //       const reg = /<meta name="viewport".*user-scalable=no">/gi
  //       const res = route.html.match(reg)
  //       route.html = route.html.replace(res[1], '')

  //       // // 1.根据字符串创建一个网页
  //       // const html = new JSDOM(route.html)
  //       // // 2.从创建好的网页中拿到document对象
  //       // const dom = html.window.document
  //       // // 3.找到对应的元素, 删除对应的元素
  //       // const loadingEle = dom.querySelector('.container')
  //       // dom.body.removeChild(loadingEle)

  //       // route.html = html.serialize()
  //       return route
  //     }
  //   }
  // }
}
