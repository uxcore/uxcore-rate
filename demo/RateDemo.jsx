/**
 * Rate Component Demo for uxcore
 * @author quanyun.mqy
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const Icon = require('uxcore-icon');
const Rate = require('../src/');

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      total: 5,
      value: 0,
    };
    this.scoreTips = [
      '不给力啊',
      '还成吧',
      '哎呦，不错哦',
      '嗯，很给力',
      '哇，超出期望啊',
    ];
  }

  onChange(val) {
    console.log(val);
    this.setState({
      value: val,
    });
  }

  render() {
    return (
      <div>
        <div className="rate-demo-wrp demo-tip-hover-show">
          <h2>悬浮 Tip</h2>
          <span className="rate-label">请打分:</span>
          <Rate
            className="rate-demo"
            total={this.state.total}
            value={this.state.value}
            scoreTips={this.scoreTips}
            onChange={this.onChange.bind(this)}
            activeAll={false}
            icons={[
              <Icon name="xiaolian-line" />,
              <Icon name="kulian-line" />,
            ]}
            activeIcons={[
              <Icon name="xiaolian-full" />,
              <Icon name="kulian-full" />,
            ]}
          />
        </div>
        <div className="rate-demo-wrp demo-tip-always-show">
          <h2>下方 Tip</h2>
          <span className="rate-label">请打分:</span>
          <Rate
            className="rate-demo"
            placeholder="您对这个产品是否满意"
            total={this.state.total}
            value={this.state.value}
            scoreTips={this.scoreTips}
            tipShow="always"
            onChange={this.onChange.bind(this)}
          />
        </div>
        <div className="rate-demo-wrp demo-type-large">
          <h2>大尺寸</h2>
          <span className="rate-label">请打分:</span>
          <Rate
            className="rate-demo"
            size="large"
            total={this.state.total}
            value={this.state.value}
            scoreTips={this.scoreTips}
            tipShow="always"
            onChange={this.onChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

module.exports = Demo;
