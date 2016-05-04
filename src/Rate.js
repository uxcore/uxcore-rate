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
  }

  handleItemClick(v, disabled) {
    if (disabled) {
      return;
    }
    this.props.onChange(v);
  }

  render() {
    let t = this;
    let classes = classnames(t.props.prefixCls, {
      [t.props.className]: !!t.props.className,
      ['disabled']: !!t.props.disabled
    });

    return (
      <div className={classes}>
        {
          // 根据totalScore,造一个数组，仅用于执行map方法
          new Array(t.props.total).fill(1).map((v, k) => {
            return (
              <div className={classnames(`${t.props.prefixCls}-item`, {
                  'active': (k + 1) <= t.props.value
                })} key={k + 1} onClick={t.handleItemClick.bind(t, k + 1, t.props.disabled)}>
                {
                  t.props.scoreTips[k] ?
                    <Tooltip placement="top" trigger="hover" overlay={t.props.scoreTips[k]}>
                      <i className="kuma-icon kuma-icon-wujiaoxing"></i>
                    </Tooltip> :
                    <i className="kuma-icon kuma-icon-wujiaoxing"></i>
                }
              </div>
            );
          })
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
  onChange: ()=> {
  }
};


// http://facebook.github.io/react/docs/reusable-components.html
Rate.propTypes = {
  /**
   * @title 类名前缀
   */
  prefixCls: React.PropTypes.string,
  /**
   * @title class
   * @description 自定义样式的class名称
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
   * @description 鼠标悬停在star上面显示的tip，不传入就不会显示tip。数组元素个数必须和totalScore一致
   */
  scoreTips: React.PropTypes.arrayOf(React.PropTypes.string),
  /**
   * @title 回调函数
   * @description 会返回选中的分数onChange(currentValue)，从1开始计数
   */
  onChange: React.PropTypes.func.isRequired
};

Rate.displayName = "uxcore-rate";

module.exports = Rate;
