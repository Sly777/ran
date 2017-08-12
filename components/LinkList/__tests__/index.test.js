import { mount } from 'enzyme';
import React from 'react';

import './__mocks__/router.mock';
import { defaultProps } from './__mocks__/index.mock';
import LinkList from '../';
import { themeDecorator } from './utils';

// NOTE: dont work
// const shallowWithMainTheme = (child, options) => {
//   const mainThemeDecorator = themeDecorator('main');
//   const wrapper = shallow(mainThemeDecorator(child), options);
//   const instance = wrapper.root.instance();
//   return wrapper.shallow({ context: instance.getChildContext() });
// };
// const shallowWithMainTheme = (child, options) => {
//   const mainThemeDecorator = themeDecorator('main');
//   return shallow(mainThemeDecorator(child), options);
// };

const mountWithMainTheme = (child, options) => {
  const mainThemeDecorator = themeDecorator('main');
  return mount(mainThemeDecorator(child), options);
};

describe('<LinkList />', () => {
  it('when not authenticated', () => {
    const child = <LinkList {...defaultProps} authenticated={false} />;
    const wrapper = mountWithMainTheme(child);
    const text = wrapper.text();

    expect(text).toEqual(expect.stringContaining('Main Page'));
    expect(text).toEqual(expect.stringContaining('Create'));
    expect(text).toEqual(expect.stringContaining('SignIn'));
    expect(text).toEqual(expect.stringContaining('SignUp'));
    expect(text).not.toEqual(expect.stringContaining('LogOut'));
  });

  it('when authenticated', () => {
    const child = <LinkList {...defaultProps} authenticated />;
    const wrapper = mountWithMainTheme(child);
    const text = wrapper.text();

    expect(text).toEqual(expect.stringContaining('Main Page'));
    expect(text).toEqual(expect.stringContaining('Create'));
    expect(text).not.toEqual(expect.stringContaining('SignIn'));
    expect(text).not.toEqual(expect.stringContaining('SignUp'));
    expect(text).toEqual(expect.stringContaining('LogOut'));
  });
});
