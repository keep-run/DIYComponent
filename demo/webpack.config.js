const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin=require('mini-css-extract-plugin')

/**
 * 遍历当前路径下所有文件夹，将文件夹中的 index.js 文件作为入口文件
 */
function getEntry() {
  const entry = fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);

    // 判断是否是文件夹
    if (fs.statSync(fullDir).isDirectory()) {
      const entry = path.join(fullDir, 'index.jsx');

      // 判断 app.ts 文件是否存在
      if (fs.existsSync(entry)) {
        entries[dir] = [entry];
      }
    }
    return entries;
  }, {})
  return entry
}

module.exports = {
  mode: 'development',
  entry: getEntry(),
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
        loader: 'babel-loader',//loader的名称（必须）
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.jsx', '.tsx', '.js', '.json'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
    alias: {
      '@': path.join(__dirname, '..', "src") // 在项目中使用@符号代替src路径，导入文件路径更方便
    }
  },

  plugins: [new MiniCssExtractPlugin({
    filename: `css/[name].[hash].css`,
  })]
}