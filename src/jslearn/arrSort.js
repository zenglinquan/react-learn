//一行代码实现数组顺序随机打乱
var a = [1, 2, 3, 4].sort((a, b) => Math.random() > .5 ? -1 : 1)
console.log(a)