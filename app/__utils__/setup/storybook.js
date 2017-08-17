// mock router
import NextRouter from 'next/router'

const mockedNextRouter = {
  push: () => {
    console.log('storybook push')
  },
  prefetch: () => {
    console.log('storybook prefetch')
  },
}
NextRouter.router = mockedNextRouter
