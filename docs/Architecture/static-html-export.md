# RAN!

## Static HTML Export (WIP)

It's prepared for deploying to some services such as Netlify, Github Pages, ...etc. Normally, You need to run Node.js server on your server to run your application. But with this way, You can also deploy and open your application without any Node.js server.

#### Command
```yarn run build:static_export``` (or ```npm run build:static_export```)

#### Limitations
- If you are starting to use RAN! from beginning, My suggestion is you should run it with clean-project command. Otherwise, It can be hard to export it with example pages that uses cookie check or other page controls.
- Unfortunately, you cannot use serverside cookie. We are using it on Auth of RAN! but It cannot work properly.
- Dynamic routing doesn't work completely. If you want to add some routes that you want to get querystring/url data, You need to add these routes manually on ```/next.config.js```. But be careful.

[https://github.com/zeit/next.js#limitation](For other limitations, Please click here to see Next.js static html export limitations)
