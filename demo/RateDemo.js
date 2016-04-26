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
        <span className="rate-label">这里是label:</span>
        <Rate className="rate-demo" score={this.state.score} scoreTips={this.scoreTips} onChange={this.onChange.bind(this)}/>
      </div>
    );
  }
}

module.exports = Demo;
