# RAN! Documentation

## Deployment
### Heroku

[Click here to see Heroku Tutorial - Getting Started with Node.JS](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

Basically, RAN! is ready for Heroku Deployment. Just follow the structure on tutorial.

- Firstly, run ```heroku create```
- Then commit your changes ```git commit -m 'commit message'```
- After commit, push your changes to heroku GIT ```git push heroku master```
- That's all!
- to scale your server, just run ```heroku ps:scale web=1```
