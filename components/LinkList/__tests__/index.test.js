import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';

import LinkList from '../';
import { defaultProps } from './__mocks__/index.mock';

describe('<LinkList />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(<LinkList {...defaultProps} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('when not authenticated', () => {
    const wrapper = shallow(
      <LinkList {...defaultProps} authenticated={false} />
    );
    const html = wrapper.html();

    expect(html).toEqual(expect.stringContaining('Main Page'));
    expect(html).toEqual(expect.stringContaining('Create'));
    expect(html).toEqual(expect.stringContaining('SignIn'));
    expect(html).toEqual(expect.stringContaining('SignUp'));
    expect(html).not.toEqual(expect.stringContaining('LogOut'));
  });

  it('when authenticated', () => {
    const wrapper = shallow(<LinkList {...defaultProps} authenticated />);
    const html = wrapper.html();

    expect(html).toEqual(expect.stringContaining('Main Page'));
    expect(html).toEqual(expect.stringContaining('Create'));
    expect(html).not.toEqual(expect.stringContaining('SignIn'));
    expect(html).not.toEqual(expect.stringContaining('SignUp'));
    expect(html).toEqual(expect.stringContaining('LogOut'));
  });
});
