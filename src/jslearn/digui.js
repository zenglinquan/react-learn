//普通递归 
function f(x) {
  if (x === 1) return 1;
  return 1 + f(x - 1);
}
//尾递归
function f(x) {
  if (x === 1) return 1;
  return f(x - 1)
}
// 阶乘
function factorial(n) {
  if (n === 1) return n;
  return n * factorial(n - 1);
}
// 阶乘改版
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total)
}
var a = factorial(5, 1)
console.log(a) // 120

// 尾递归函数
function sum(x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  } else {
    return x;
  }
}
// var b = sum(1, 1000000)//RangeError: Maximum call stack size exceeded
// console.log(b)

// 尾递归优化
// 蹦床函数（trampoline）可以将递归执行转为循环执行。
/**
 * 下面就是蹦床函数的一个实现，它接受一个函数f作为参数。
 * 只要f执行后返回一个函数，就继续执行。
 * 注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，
 * 这样就避免了递归执行，从而就消除了调用栈过大的问题。
 * 然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。
 * @param {*} f 
 */
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

/**
 * @param {*} x:初始值 
 * @param {*} y:递归次数
 * sum2函数的每次执行，都会返回自身的另一个版本
 */

// 改写sum
function sum2(x, y) {
  if (y > 0) {
    return sum2.bind(null, x + 1, y - 1);
  } else {
    return x;
  }
}

var c = trampoline(sum2(1, 100000))
console.log(c) //100001

console.log("tcotcotco")
function tco(f) {
  var value, active = false, accumulated = [];
  return function accumulator() {
    // console.log(arguments)
    accumulated.push(arguments);
    // console.log(accumulated[0])
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
        // value = f.call(this, ...accumulated.shift()); // 等价于上句
        // console.log(value) // undefined
      }
      active = false;
      return value;
    }
  }
}
var sum3 = tco(function(x, y) {
  if (y > 0) {
    return sum3(x + 1, y - 1)
  } else {
    return x;
  }
});
var d = sum3(1,100000)
console.log(d)

