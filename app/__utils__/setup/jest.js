import 'jest-styled-components'

// mock router
import NextRouter from 'next/router'
const mockedNextRouter = {
  push: () => {},
  prefetch: () => {}
}
NextRouter.router = mockedNextRouter
