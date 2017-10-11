/**
 * Rate Component for uxcore
 * @author quanyun.mqy
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

import classnames from 'classnames';
import Tooltip from 'uxcore-tooltip';
import Icon from 'uxcore-icon';
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

  componentDidMount() {
    if (this.props.total !== 5) {
      setTimeout(() => {
        // iconfont 会在 didMount 之后才加载进来，因此这里做了一个延时
        this.resizeAlwaysTip();
      }, 100);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        hover: nextProps.value,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.total !== this.props.total) {
      this.resizeAlwaysTip();
    }
  }

  resizeAlwaysTip() {
    if (this.alwaysTip) {
      const tipWidth = this.star0.offsetWidth * parseInt(this.props.total, 10);
      this.alwaysTip.style.width = `${tipWidth}px`;
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
      <div className={`${t.props.prefixCls}-always-tip-container`} ref={(c) => { this.alwaysTip = c; }}>
        {
          t.state.hover === 0 ? this.props.placeholder : t.props.scoreTips[parseInt(t.state.hover, 10) - 1]
        }
      </div>
    );
  }

  render() {
    const t = this;
    const classes = classnames(t.props.prefixCls, {
      [t.props.className]: !!t.props.className,
      disabled: !!t.props.disabled,
      [`${t.props.prefixCls}-${t.props.size}`]: true,
    });

    return (
      <div className={classes} onMouseLeave={this.handleItemLeave.bind(this)}>
        {
          makeNewArray(t.props.total).map((v, k) => {
            const isActive = t.props.activeAll
              ? ((k + 1) <= t.state.hover)
              : (k + 1) === t.state.hover;
            let icon = (
              <Icon
                name={`${isActive ? 'caozuo-xingji-full' : 'caozuo-xingji-line'}`}
                className={classnames({
                  [`${t.props.prefixCls}-icon-active`]: isActive,
                })}
              />
            );
            if (t.props.icons[k]) {
              icon = React.cloneElement(
                (isActive && t.props.activeIcons[k]) ? t.props.activeIcons[k] : t.props.icons[k],
                {
                  className: classnames({
                    [`${t.props.prefixCls}-icon-active`]: isActive,
                  }),
                });
            }
            return (
              <div
                className={classnames(`${t.props.prefixCls}-item`, {
                  active: (k + 1) <= t.state.hover,
                })}
                key={k + 1}
                ref={(c) => { this[`star${k}`] = c; }}
                onClick={() => { t.handleItemClick(k + 1); }}
                onMouseEnter={() => { t.handleItemHover(k + 1); }}
              >
                {
                t.props.tipShow === 'hover' && t.props.scoreTips[k] ?
                  <Tooltip placement="top" trigger="hover" overlay={t.props.scoreTips[k]}>
                    {icon}
                  </Tooltip> :
                    icon
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
  onChange: () => {},
  size: 'normal',
  icons: [],
  activeIcons: [],
  activeAll: true,
  placeholder: '点击星星进行评分',
};


// http://facebook.github.io/react/docs/reusable-components.html
Rate.propTypes = {
  size: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  total: React.PropTypes.number,
  value: React.PropTypes.number.isRequired,
  scoreTips: React.PropTypes.arrayOf(React.PropTypes.string),
  tipShow: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  icons: React.PropTypes.array,
  activeAll: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
};

Rate.displayName = 'uxcore-rate';

module.exports = Rate;
