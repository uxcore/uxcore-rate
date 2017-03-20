/**
 * Rate Component for uxcore
 * @author quanyun.mqy
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

import classnames from 'classnames';
import Tooltip from 'uxcore-tooltip';
import React from 'react';

const makeNewArray = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(1);
  }
  return arr;
};

class Rate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hover: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        hover: nextProps.value,
      });
    }
  }

  handleItemHover(i) {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      hover: i,
    });
  }

  handleItemLeave() {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      hover: this.props.value,
    });
  }

  handleItemClick(v) {
    if (this.props.disabled) {
      return;
    }

    this.props.onChange(v);
  }

  // when tipShow === 'always', render the tip
  renderAlwaysTip() {
    const t = this;
    return (
      <div className={`${t.props.prefixCls}-always-tip-container`}>
        {
          t.state.hover === 0 ? '点击星星进行评分' : t.props.scoreTips[parseInt(t.state.hover, 10) - 1]
        }
      </div>
    );
  }

  render() {
    const t = this;
    const classes = classnames(t.props.prefixCls, {
      [t.props.className]: !!t.props.className,
      disabled: !!t.props.disabled,
      [`${t.props.prefixCls}-${t.props.type}`]: true,
    });

    return (
      <div className={classes} onMouseLeave={this.handleItemLeave.bind(this)}>
        {
          makeNewArray(t.props.total).map((v, k) => (
            <div
              className={classnames(`${t.props.prefixCls}-item`, {
                active: (k + 1) <= t.state.hover,
              })}
              key={k + 1}
              onClick={t.handleItemClick.bind(t, k + 1)}
              onMouseEnter={t.handleItemHover.bind(t, k + 1)}
            >
              {
                t.props.tipShow === 'hover' && t.props.scoreTips[k] ?
                  <Tooltip placement="top" trigger="hover" overlay={t.props.scoreTips[k]}>
                    <i className="kuma-icon kuma-icon-wujiaoxing" />
                  </Tooltip> :
                    <i className="kuma-icon kuma-icon-wujiaoxing" />
              }
            </div>
            ))
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
  onChange: () => {},
  type: 'normal',
};


// http://facebook.github.io/react/docs/reusable-components.html
Rate.propTypes = {
  type: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  total: React.PropTypes.number,
  value: React.PropTypes.number.isRequired,
  scoreTips: React.PropTypes.arrayOf(React.PropTypes.string),
  tipShow: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
};

Rate.displayName = 'uxcore-rate';

module.exports = Rate;
