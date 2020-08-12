// 本地启动一个webpack server

const Webpack = require('webpack');
const  WebpackDevServer =require('webpack-dev-server')
const webpackConfig =require('./webpack.config')
const path =require('path')
function startServer(){
  const port=8008;
  const host = '127.0.0.1'
  const devServer={
    port,
    host,

    publicPath: '/build/',
    open: true,
    stats: {
      assets: true, // 输出打包的资源信息
      modules: false,
      version: true,
      providedExports:true,
      children:false,
    },
  }
  const compiler = Webpack(webpackConfig)
  compiler.run(err => {
    if (err) {
      console.log('build err', err)
      process.exit(1)
    }
  })
  // const server = new WebpackDevServer(compiler, devServer)

  // server.listen(port, host, () => {
  //   console.log(`Starting server on http://localhost:${port}`)
  // })
}

startServer()