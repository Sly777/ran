import { mount } from 'enzyme'
import React from 'react'

import Logo from '../'

describe('<Logo />', () => {
  it('should have image', () => {
    const child = <Logo />
    const wrapper = mount(child)

    expect(wrapper.find('img')).toHaveLength(1)
  })
})
