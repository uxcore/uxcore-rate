---

## uxcore-rate [![Dependency Status](http://img.shields.io/david/uxcore/uxcore-rate.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-rate) [![devDependency Status](http://img.shields.io/david/dev/uxcore/uxcore-rate.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-rate#info=devDependencies) 

## TL;DR

uxcore-rate ui component for react

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-rate
$ cd uxcore-rate
$ npm install
$ gulp server
```

## Usage

```
import Rate from 'uxcore-rage';
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 5,
      value: 3
    };
    this.scoreTips = [
      "不给力啊",
      "还成吧",
      "哎呦，不错哦",
      "嗯，很给力",
      "哇，超出期望啊"
    ];
  }
  onChange(val) {
    console.log(score);
    this.setState({
      value: val
    });
  }
  render() {
    return (
      <div className="rate-demo-wrp">
        <span className="rate-label">请打分:</span>
        <Rate className="rate-demo" total={this.state.total} value={this.state.value} scoreTips={this.scoreTips} onChange={this.onChange.bind(this)}/>
      </div>
    );
  }
}
module.exports = Demo;
```

## API

## Props

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|---|---|---|
|value|number|required|0|初始值|
|onChange|function(currentValue)|required | |回调函数，会返回选中的分数，从1开始计数|
|prefixCls|string|option|kuma-rate|类名前缀|
|className |string|option||自定义样式的class名称|
|disabled|bool|option|false|是否禁用|
|total|number|option|5|总共有多少个icon,即总分为多少|
|scoreTips|arrayOf(string)|option|[]|每个star的描述文字，不传就不会显示tip。数组元素个数必须和totalScore一致|
|tipShow|string|option|hover|描述文字的显示方式.可选值:hover/always|

