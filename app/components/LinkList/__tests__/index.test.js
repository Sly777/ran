import React from 'react'
import { mount } from 'enzyme'

import Themed from '~/__utils__/Themed'
import LinkList from '../'

const noop = () => {}

describe('<LinkList />', () => {
  it('when not authenticated', () => {
    const child = (
      <Themed>
        <LinkList pathname={'/'} authenticated={false} logout={noop} />
      </Themed>
    )
    const wrapper = mount(child)
    const text = wrapper.text()

    expect(text).toEqual(expect.stringContaining('Main Page'))
    expect(text).toEqual(expect.stringContaining('Create'))
    expect(text).toEqual(expect.stringContaining('SignIn'))
    expect(text).toEqual(expect.stringContaining('SignUp'))
    expect(text).not.toEqual(expect.stringContaining('LogOut'))
  })

  it('when authenticated', () => {
    const child = (
      <Themed>
        <LinkList pathname={'/'} authenticated logout={noop} />
      </Themed>
    )
    const wrapper = mount(child)
    const text = wrapper.text()

    expect(text).toEqual(expect.stringContaining('Main Page'))
    expect(text).toEqual(expect.stringContaining('Create'))
    expect(text).not.toEqual(expect.stringContaining('SignIn'))
    expect(text).not.toEqual(expect.stringContaining('SignUp'))
    expect(text).toEqual(expect.stringContaining('LogOut'))
  })
})
