import React, { Component } from 'react';
import './App.css';
// import React16Circle from './component/react16circle'
// import SnapshotSample from './component/SnapshotSample'
// import IndexPage from './component/pureComponent'
import WrappedComponent from './component/WrappedComponent' //其实就是HOC组件,命名为WrappedComponent
class Parent extends Component {
  componentDidMount() {
    // console.log(this.refs) //指向HOC
    // let instance = this.refs.wrapper.getWrappedInstance();
    // console.log(instance) //指向WrappedComponent
    //另一种方法
    console.log(this.wrapper) //指向WrappedComponent
    console.log(typeof WrappedComponent.doTest) //拿不到低阶组件的自定义函数
  }

  render() {
    return <WrappedComponent
      // ref='wrapper'
      getInstance={e => this.wrapper = e}
      withRef
      name="Zlq"
    />
  }
}
const buildClass = (name) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      console.log(name + ' constructor');
    }
    componentDidCatch(error, info) { // 获取到javascript错误

    }
    // componentWillMount() {
    //   console.log(name + ' componentWillMount');
    // }

    // componentWillReceiveProps(nextProps) {
    //   console.log(name + ' componentWillReceiveProps(nextProps)');
    // }

    static getDerivedStateFromProps(props, state) {
      console.log(name + " getDerivedStateFromProps")
      return state;
    }
    componentDidMount() {
      console.log(name + ' componentDidMount');
    }
    shouldComponentUpdate(nextProps, nextState) {
      console.log(name + ' shouldComponentUpdate(nextProps, nextState)');
      return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState) { // 组件更新前触发
      console.log(name + " getSnapshotBeforeUpdate")
    }
    // componentWillUpdate(nextProps, nextState) {
    //   console.log(name + ' componentWillUpdate(nextProps, nextState)');
    // }

    componentDidUpdate(prevProps, prevState) {
      console.log(name + ' componetDidUpdate(prevProps, prevState)');
    }
    componentWillUnmount() {
      console.log(name + ' componentWillUnmount');
    }
  }
}
class ParentComponent extends buildClass('parent') {
  constructor(props) {
    super(props);
  }
  state = {
    showChild: false,
    name: "parent",
    count: 0
  }

  unload = () => {
    this.setState({
      showChild: true
    })
  }
  render() {
    console.log('parent render');
    let { showChild, count } = this.state
    return <div>
      {
        !showChild && <button onClick={this.unload}>挂载child组件</button>
      }
      {showChild ?
        <div>
          <button>卸载child组件</button><br/>
          <button>修改child组件的props.count</button><br/>
          ==============
          <Child count={count} />
        </div> : null}
      {/* <Child /> */}

    </div>
  }

}
class Child extends buildClass('child') {
  constructor(props) {
    super(props);
  }
  state = {
    number: 0
  }

  render() {
    let { number } = this.state
    let { count } = this.props
    console.log('child render');
    return <div>
      props.count:{count}<br />
      <button>修改child组件的number</button><br />
      state.number:{number}
    </div>
  }

}

// export default Parent;
// export default IndexPage;
// export default React16Circle;

// export default SnapshotSample;
export default ParentComponent;