import { mount } from 'enzyme'
import React from 'react'

import { themeDecorator } from '~/__utils__/theme'
import { defaultProps } from './__mocks__/props.mock'
import LinkList from '../'

const mountWithMainTheme = (child, options) => {
  const decorate = themeDecorator('main')
  return mount(decorate(child), options)
}

describe('<LinkList />', () => {
  it('when not authenticated', () => {
    const child = <LinkList {...defaultProps} authenticated={false} />
    const wrapper = mountWithMainTheme(child)
    const text = wrapper.text()

    expect(text).toEqual(expect.stringContaining('Main Page'))
    expect(text).toEqual(expect.stringContaining('Create'))
    expect(text).toEqual(expect.stringContaining('SignIn'))
    expect(text).toEqual(expect.stringContaining('SignUp'))
    expect(text).not.toEqual(expect.stringContaining('LogOut'))
  })

  it('when authenticated', () => {
    const child = <LinkList {...defaultProps} authenticated />
    const wrapper = mountWithMainTheme(child)
    const text = wrapper.text()

    expect(text).toEqual(expect.stringContaining('Main Page'))
    expect(text).toEqual(expect.stringContaining('Create'))
    expect(text).not.toEqual(expect.stringContaining('SignIn'))
    expect(text).not.toEqual(expect.stringContaining('SignUp'))
    expect(text).toEqual(expect.stringContaining('LogOut'))
  })
})
