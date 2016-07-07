/**
 * Rate Component for uxcore
 * @author quanyun.mqy
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

import classnames from 'classnames';
import Tooltip from 'uxcore-tooltip';

class Rate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hover: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        hover: nextProps.value
      });
    }
  }

  handleItemHover(i) {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      hover: i
    });
  }

  handleItemLeave() {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      hover: this.props.value
    });
  }

  handleItemClick(v, disabled) {
    if (this.props.disabled) {
      return;
    }

    this.props.onChange(v);
  }

  // when tipShow === 'always', render the tip
  renderAlwaysTip() {
    let t = this;
    return (
      <div className={`${t.props.prefixCls}-always-tip-container`}>
        {
          t.state.hover === 0 ? '点击星星进行评分' : t.props.scoreTips[parseInt(t.state.hover) - 1]
        }
      </div>
    );
  }

  render() {
    let t = this;
    let classes = classnames(t.props.prefixCls, {
      [t.props.className]: !!t.props.className,
      ['disabled']: !!t.props.disabled
    });

    return (
      <div className={classes} onMouseLeave={this.handleItemLeave.bind(this)}>
        {
          // 根据totalScore,造一个数组，仅用于执行map方法
          new Array(t.props.total).fill(1).map((v, k) => {
            return (
              <div className={classnames(`${t.props.prefixCls}-item`, {
                  'active': (k + 1) <= t.state.hover
                })} key={k + 1} onClick={t.handleItemClick.bind(t, k + 1)}
                   onMouseEnter={t.handleItemHover.bind(t, k+1)}>
                {
                  t.props.tipShow === 'hover' && t.props.scoreTips[k] ?
                    <Tooltip placement="top" trigger="hover" overlay={t.props.scoreTips[k]}>
                      <i className="kuma-icon kuma-icon-wujiaoxing"></i>
                    </Tooltip> :
                    <i className="kuma-icon kuma-icon-wujiaoxing"></i>
                }
              </div>
            );
          })
        }
        {
          t.props.tipShow === 'always' ? t.renderAlwaysTip() : ''
        }
      </div>
    );
  }
}

Rate.defaultProps = {
  prefixCls: 'kuma-rate',
  disabled: false,
  total: 5,
  value: 0,
  scoreTips: [],
  tipShow: 'hover',
  onChange: ()=> {}
};


// http://facebook.github.io/react/docs/reusable-components.html
Rate.propTypes = {
  /**
   * @title 类名前缀
   */
  prefixCls: React.PropTypes.string,
  /**
   * @title class
   * @description 自定义样式的class
   */
  className: React.PropTypes.string,
  /**
   * @title 是否禁用
   */
  disabled: React.PropTypes.bool,
  /**
   * @title icon个数
   * @description 总共有多少个icon,即总分为多少
   */
  total: React.PropTypes.number,
  /**
   * @title 初始值
   */
  value: React.PropTypes.number.isRequired,
  /**
   * @title tip
   * @description 每个star的描述文字，不传就不会显示tip。数组元素个数必须和totalScore一致
   */
  scoreTips: React.PropTypes.arrayOf(React.PropTypes.string),
  /**
   * @title tip的显示方式
   * @description 可选值:hover/always.hover:当hover的时候显示,always:总是显示在底部
   */
  tipShow: React.PropTypes.string,
  /**
   * @title 回调函数
   * @description 会返回选中的分数onChange(currentValue)，从1开始计数
   */
  onChange: React.PropTypes.func.isRequired
};

Rate.displayName = "uxcore-rate";

module.exports = Rate;
