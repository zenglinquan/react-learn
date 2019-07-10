import React, { PureComponent, Component } from 'react';

/**
 * PureComponent :基本数据类型，值相同就不调用render,
 * 更新的是引用类型的，地址一旦改变就会render
 */
/* class IndexPage extends PureComponent{
// class IndexPage extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false
    };
    console.log('constructor');
  }
  changeState = () => {
    this.setState({
      isShow: true
    })
  };
  render() {
    console.log('render');
    return (
      <div>
        <button onClick={this.changeState}>点击</button>
        <div>{this.state.isShow.toString()}</div>
      </div>
    );
  }
} */

class IndexPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      arr: ['1'],
      obj: {
        name: "zlq"
      }
    };
    console.log('constructor');
  }
  //PureComponent中页面会警告,不建议在PureComponent中使用
  // shouldComponentUpdate(){
  //   return false;
  // }
  changeState = () => {
    let { arr } = this.state;
    arr.push('2') 
    var obj = {
      name: "zl"
    }
    this.setState({
      // obj
      // obj:{name:"Z"}
      arr // pureComponent下不会重新render
      // arr: [...arr, '2']
    })
  };
  render() {
    console.log('render');
    let { arr, obj } = this.state
    return (
      <div>
        <button onClick={this.changeState}>点击</button>
        <div>
          {arr.map((item) => {
            return item;
          })}
          {obj.name}
        </div>
      </div>
    );
  }
}

export default IndexPage;
