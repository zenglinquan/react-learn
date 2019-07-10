/**
 * 发布订阅者模式,
 * 每一个订阅者都是相互独立的只和发布者有关系，
 * 与发布者是一对多的关系，也可以是一对一的关系。
 */
function pubSub() {
  var topics = {};
  console.log(this.name, "this")
  function subScribe(topic, fn) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    //并未去重,如果去重的话[...new Set(arr)]这种方式只能去重基本数值类型,fn是函数引用类型
    topics[topic].push(fn);
  }
  function publish(topic, ...args) {
    // console.log(topics[topic].length)
    if (!topics[topic]) return;
    // 迭代相同topic值对应的函数
    for (let fn of topics[topic]) {
      fn(...args)
    }

  }
  return {
    subScribe, publish
  }
}
pubSub.prototype.name = "pubSub";
var pubSub1 = new pubSub();
pubSub1.subScribe('add', function (a, b) {
  console.log(a + b)
})
pubSub1.subScribe('minus', function (a, b) {
  console.log(a - b)
})
// pubSub1.subScribe('minus', function (a, b) {
//   console.log(a - b - 1)
// })

pubSub1.publish('add', 10, 1)
pubSub1.publish('minus', 10, 1)
pubSub1.publish('minus', 9, 1)
console.log('------------------')

/**
 * 发布订阅者模式
 * 对象写法
 */
console.log("==================================")
const event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function () {
    const key = Array.prototype.shift.call(arguments)
    const fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments)
    }
  },
  remove: function (key, fn) {
    const fns = this.clientList[key]
    if (!fns) {
      return false
    }
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (let l = fns.length - 1; l >= 0; l--) {
        const _fn = fns[l]
        if (_fn === fn) {
          fns.splice(l, 1)
        }
      }
    }
  }
}
const installEvent = (obj) => {
  for (let i in event) {
    obj[i] = event[i]
  }
}
const events = {}
installEvent(events)
// 订阅信息
events.listen('newMessage', fn = (say) => {
  console.log('say:listen:' + say)
})
// 发布信息
events.trigger('newMessage', 'hello')
events.remove('newMessage', (say) => {
  console.log('say:remove:' + say)
})

/**
 * 观察者模式
 */
//观察者 ->可理解为订阅者
class Observer {
  update() {
    console.log('update')
  }
}
class Observer1 {
  update() {
    console.log('update1')
  }
}
//目标 -> 可理解为发布者
class Subject {
  constructor() {
    this.subs = [];
  }
  //添加订阅者，这里其实是添加观察者，观察者可理解为订阅者
  addSub(subScribe) {
    this.subs.push(subScribe);
    console.log(this.subs)
  }
  notify() {
    this.subs.forEach(sub => { sub.update() })
  }
}

let subject = new Subject();
let observer = new Observer();
let observer1 = new Observer1();
//目标添加观察者了
subject.addSub(observer);
subject.addSub(observer1);
//目标发布消息调用观察者的更新方法了
subject.notify();   //update






