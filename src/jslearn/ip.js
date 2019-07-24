var reg = "^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\."
+"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\."
+"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\."
+"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$"
//简化后
var reg1 = '^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])(\\.(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)){3}$'
// 此种写法有问题不能省略反斜杠
var reg2 = '^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])(\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)){3}$'
console.log(reg)
console.log(reg1)
console.log(reg2)
var pattern = new RegExp(reg)
var pattern1 = new RegExp(reg1)
var pattern2 = new RegExp(reg2)

var ip = '127.0.0.1';

console.log(pattern.test(ip))
console.log(pattern1.test(ip))
console.log(pattern2.test(ip))