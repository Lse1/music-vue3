// 判断是否是pc
function IsPC () {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod'
  ]
  var flag = true
  for (var i = 0; i < Agents.length; i++) {
    if (userAgentInfo.indexOf(Agents[i]) !== -1) {
      flag = false
      break
    }
  }
  return flag
}

// 设置 rem 函数
function setRem () {
  // 基准大小
  // console.log(IsPC())
  if (IsPC()) {
    const baseSize = 100
    // 当前页面宽度相对于 1920 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 1920
    // 设置页面根节点字体大小, 字体大小最小为12
    const fontSize = (baseSize * Math.min(scale, 2)) > 12 ? (baseSize * Math.min(scale, 2)) : 12
    document.documentElement.style.fontSize = fontSize + 'px'
  }
}
// 初始化
setRem()
IsPC()
// 改变窗口大小时重新设置 rem,这里最好加上节流
window.onresize = function () {
  setRem()
}
