const fs = require('fs');
const path = require('path');
const webpack = require('webpack');


/**
 * 遍历当前路径下所有文件夹，将文件夹中的 app.ts 文件作为入口文件
 */
function getEntry() {
  const entry = fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);

    // 判断是否是文件夹
    if (fs.statSync(fullDir).isDirectory()) {
      const entry = path.join(fullDir, 'index.js');

      // 判断 app.ts 文件是否存在
      if (fs.existsSync(entry)) {
        entries[dir] = [entry];
      }
    }
    return entries;
  }, {})
  // console.log('entry', entry)
  return entry
}

module.exports = {
  mode: 'production',
  entry: getEntry(),
  // entry: path.join(__dirname, 'example1/index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: "/"
  },
}