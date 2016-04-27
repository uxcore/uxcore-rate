/**
 * Rate Component Demo for uxcore
 * @author quanyun.mqy
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

let classnames = require('classnames');

let Rate = require('../src');

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
