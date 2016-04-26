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
      score: 3
    };
    this.scoreTips = [
      "不给力啊",
      "还成吧",
      "哎呦，不错哦",
      "嗯，很给力",
      "哇，超出期望啊"
    ];
  }
  onChange(score) {
    this.setState({
      score: score
    });
  }
  render() {
    return (
      <div className="rate-demo-wrp">
        <span className="rate-label">请打分:</span>
        <Rate className="rate-demo" score={this.state.score} scoreTips={this.scoreTips} onChange={this.onChange.bind(this)}/>
      </div>
    );
  }
}
module.exports = Demo;
```

## API

- onChange(): 回调函数，会返回选中的分数onChange(currentScore)

## Props

| 配置项 | 类型 | 必填 | 默认值 | 功能/备注 |
|---|---|---|---|---|
|prefixCls |string||kuma-rate|前缀|
|className |string|||自定义样式的class名称|
|disabled|bool||false|是否禁用|
|totalScore|number||5|总共有多少个icon,即总分为多少|
|score|number||0|初始值|
|fontSize|number||16|iconfont的尺寸|
|gap|number||10|每一项的padding-let 和 padding-right的总和|
|scoreTips|arrayOf(string)||[]|鼠标悬停在star上面显示的tip，不传入就不会显示tip。数组元素个数必须和totalScore一致|


