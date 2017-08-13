// mock router
import NextRouter from "next/router";
const mockedNextRouter = {
  push: () => {
    /*  console.log('next/router push')  */
  },
  prefetch: () => {
    /*  console.log('next/router prefetch')  */
  }
};
NextRouter.router = mockedNextRouter;
