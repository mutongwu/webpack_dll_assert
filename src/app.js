const _  = require('lodash');
const p1 = require('./page1/index.js')
// const p2 = require('./page2/index.js')
// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import './index.scss'

// Vue.use(ElementUI);

p1();
// p2();
console.log('log app.js');
console.log(_.partition([1, 2, 3, 4], n => n % 2));

// new Vue({
//   el: '#app',
//   template:`<div><i class="el-icon-edit"></i>
//   <el-button type="primary" icon="el-icon-search">搜索</el-button>
//   </div>`,
//   data: {
//     groceryList: [
//       { id: 0, text: '蔬菜' },
//       { id: 1, text: '奶酪' },
//       { id: 2, text: '随便其它什么人吃的东西' }
//     ]
//   }
// })