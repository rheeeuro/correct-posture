"use strict";

var path = require("path");

var autoprefixer = require("autoprefixer");

var ExtractCSS = require("extract-text-webpack-plugin");

var MODE = process.env.WEBPACK_ENV;
var ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
var OUTPUT_DIR = path.join(__dirname, "static");
var config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [{
      test: /\.(js)$/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: /\.(scss)$/,
      use: ExtractCSS.extract([// 추출
      {
        loader: "css-loader" // css를 가져와줌

      }, {
        loader: "postcss-loader",
        // 특정 plugin들을 css에 대해 실행 (호환성)
        options: {
          plugins: function plugins() {
            return [autoprefixer({
              browsers: "cover 99.5%"
            })];
          }
        }
      }, {
        loader: "sass-loader" // sass, scss를 css로 바꿔준다.

      }])
    }]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [new ExtractCSS("styles.css")]
};
module.exports = config; // entry: 파일들이 어디에서 왔는가?
// output: 그걸 어디에 넣을 것인가?
// __dirname: 현재 프로젝트 디렉토리(어디서든 접근 가능한 Node.js 전역변수)