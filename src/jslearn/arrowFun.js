
((n) => {
  console.log(n)
})(111)
const a = (n) => {
  console.log(n)
}
console.log(a.length)
console.log(a.constructor)

/**
 * 箭头函数不绑定arguments,取而代之用rest参数…解决，
 * 以下代码请在浏览器环境中测试，node结果会不同
 *  
 */

const A = () => {
  // console.log(arguments)
}
// new A() //TypeError: A is not a constructor
const B = (...args) => {
  // console.log(args)
}
A()
B()


var obj = {
  age: 18,
  a: function () {
    console.log(this.age)//18
  },
  c: () => {
    console.log(this)//window
    console.log(this.age)//undefined
  },
  d: function () {
    return () => {
      console.log(this)//obj{}
      console.log(this.age)//18
    }
  }
}
obj.a()
obj.c()
obj.d()()
obj.d().call({ age: 20 })
console.log(obj.d().length, 'len')

const C = (...args) => {
  console.log(args)
}
C.call(null, 1)//[ 1 ]
C.call(this, 1)//[ 1 ]
C.call(1, 1, 2, 3)//[ 1, 2, 3 ]
C.apply(1, [1, 2, 3])//[ 1, 2, 3 ]

var obj1 = {
  age: 18,
  a: function (add) {
    return (() => add + this.age)();
  },
  b: function (add) {
    var fn = v => v + this.age;
    var o = { age: 20 }
    return fn.call(o, add)
  }
}
console.log(obj1.a(1))//19
console.log(obj1.b(1))

// console.log(C.prototype)//undefined