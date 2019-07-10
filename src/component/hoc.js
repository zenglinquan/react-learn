import React from 'react';
/**
 * 
 * @param {*} WrappedComponent 
 * 属性代理方式
 */
function HOCFactory(WrappedComponent) {
  return class HOC extends React.Component {
    constructor(props) {
      super(props);
      // console.log(props.ref) //undefined
      // console.log(props) 
    }
    getWrappedInstance = () => {
      if (this.props.withRef) {
        return this.wrappedInstance;
      }
    }
    setWrappedInstance = (ref) => {
      this.wrappedInstance = ref
    }
    render() {
      // console.log(this) //HOC
      let props = { ...this.props, message: "you are under control" }
      // console.log(props) //与constructor的props不同,没有ref属性
      // if (props.withRef) {
      //   props.ref = this.setWrappedInstance;
      // }
      return <WrappedComponent
        {...props}
        // ref={(e) => this.wrappedInstance = e}
        // ref={this.setWrappedInstance}
        ref={e => props.getInstance(e)}
      />
    }
  }
}

/**
 * 反向继承
 */

const HOCFactory2 = (WrappedComponent) => {
  return class extends WrappedComponent {
    render() {
      return super.render()
    }
  }
}

// export default HOCFactory;
// export default HOCFactory2;

/**
 * 属性代理的匿名函数,简写
 */
export default (WrappedComponent) => {
  return class HOC extends React.Component {
    constructor(props) {
      super(props);
      // console.log(props.ref) //undefined
      // console.log(props) 
    }
    getWrappedInstance = () => {
      if (this.props.withRef) {
        return this.wrappedInstance;
      }
    }
    setWrappedInstance = (ref) => {
      this.wrappedInstance = ref
    }
    render() {
      // console.log(this) //HOC
      let props = { ...this.props, message: "you are under control" }
      // console.log(props) //与constructor的props不同,没有ref属性
      // if (props.withRef) {
      //   props.ref = this.setWrappedInstance;
      // }
      return <WrappedComponent
        {...props}
        // ref={(e) => this.wrappedInstance = e}
        // ref={this.setWrappedInstance}
        ref={e => props.getInstance(e)}
      />
    }
  }
}
