import expect from 'expect.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import Rate from '../src';
import Icon from 'uxcore-icon';

Enzyme.configure({ adapter: new Adapter() });

describe('Rate', () => {
  let instance;
  it('could mount', () => {
    // const spy = sinon.spy(Rate.prototype, '');
    const icons = [<span />, <Icon />, <Icon />, undefined, undefined];
    instance = mount(<Rate icons={icons} />);
    // setTimeout(() => {
    expect(instance.state('hover')).to.equal(0);
    // }, 300);
  });
  it('could click', () => {
    let clicked = undefined;
    instance = mount(<Rate
      onChange={(i) => {
        clicked = i;
      }}
    />);
    Simulate.click(instance.instance().star3);
    expect(clicked).to.equal(4);
  });
  it('value afects hover', () => {
    instance = mount(<Rate total={10} />);
    instance.setProps({ value: 4 });
    setTimeout(() => {
      expect(instance.state('hover')).to.equal(4);
    }, 300);
  });
  it('could mount with tipsAlways', () => {
    // const spy = sinon.spy(Rate.prototype, '');
    instance = mount(<Rate tipShow="always" />);
    expect(instance.instance().alwaysTip).to.not.be(undefined);
  });
  it('could change total', () => {
    // const spy = sinon.spy(Rate.prototype, '');
    instance = mount(<Rate tipShow="always" />);
    // expect(instance.instance().alwaysTip).to.not.be(undefined);
    instance.setProps({ total: 10 });
    expect(instance.instance().star9).to.not.be(undefined);
  });
  it('could active for mouse enter/leave', () => {
    instance = mount(<Rate />);
    Simulate.mouseEnter(instance.instance().star3);
    expect(instance.state('hover')).to.equal(4);
    Simulate.mouseLeave(ReactDOM.findDOMNode(instance.instance()));
    expect(instance.state('hover')).to.equal(0);
  });
  it('disabled will active none', () => {
    instance = mount(<Rate disabled />);
    Simulate.mouseEnter(instance.instance().star3);
    expect(instance.state('hover')).to.equal(0);
    Simulate.click(instance.instance().star3);
    expect(instance.state('hover')).to.equal(0);
    Simulate.mouseLeave(ReactDOM.findDOMNode(instance.instance()));
    expect(instance.state('hover')).to.equal(0);
  });
});
