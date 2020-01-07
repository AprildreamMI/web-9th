const os = require('os');
const cpuStat = require('cpu-stat');
function getState () {
  const mem = os.freemem() / os.totalmem() * 100;
  cpuStat.usagePercent((err, percent) => {
    console.log(`cpu占用${percent}`);
  });
  return mem;
}

// 多个导出1 const { getState } = require("./getState")
// module.exports.getState = getState

// 多个导出2
// exports.getState = getState

// 多个导出3
// module.exports = { 
//   getState: getState
// }

// 单个导出 const getState = require("./getState")
module.exports = getState 

// 单个导出用export
// exports = getState  // 错误 !!!

// 因为exports只是module.exports的一个引用，重新给 exports = xxx
// 不会影响到module.exports