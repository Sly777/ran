// mock router
// use this
// import NextRouter from 'next/router'
// const mockedNextRouter = {
//   push: () => {/*  console.log('next/router push')  */},
//   prefetch: () => {/*  console.log('next/router prefetch')  */}
// };
// NextRouter.router = mockedNextRouter;

// or this
import { Router } from "~/routes";
const mockedRouter = {
  pushRoute: () => {
    /*  console.log('~/routes pushRoute')  */
  },
  prefetch: () => {
    /*  console.log('~/routes prefetch')  */
  }
};
Router.router = mockedRouter;
