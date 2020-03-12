// module.exports = {
//   lintOnSave: false,
//   devServer: {
//     proxy: {
//       '/api': {
//         target: 'http://douban.uieee.com/v2/', //你要访问的服务器域名
//         changeOrigin: true, //允许跨域
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   }
// }

// module.exports = {
//   lintOnSave: false,
//   devServer: {
//     proxy: {
//       '/': {
//         target: 'http://douban.uieee.com/v2/', //你要访问的服务器域名
//         changeOrigin: true, //允许跨域
//         pathRewrite: {
//           '^/': ''  
//         }
//       }
//     }
//   }
// }

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {  //遇到/api的接口都会走此代理,因此在调用接口时，需要在url中增加/api标识  代码会将 /api/movie/top250 请求代理到 http://douban.uieee.com/api/movie/top250。
        target: 'http://douban.uieee.com/', //你要访问的服务器域名
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': 'v2/'  // 将接口中的/api替换成'v2/'
        } //http://douban.uieee.com/api/movie/top250 ==>> http://douban.uieee.com/v2/movie/top250
      }
    }
  }
}
