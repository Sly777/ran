# RAN! Documentation

## Deployment
### Digital Ocean

[Click here to see Digital Ocean Tutorial - How To Set Up a Node.js Application for Production on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)

RAN! has one script to prepare the server for Node.JS on [/helper_scripts/prepare-server-on-digitalocean.sh](/helper_scripts/prepare-server-on-digitalocean.sh)

But before that, you need to follow this;

- Create droplet with Ubuntu
- Clone your Git repo
- Then, run ```./helper_scripts/prepare-server-on-digitalocean.sh``` on Server Console
- It will install nodejs and PM2
- Then, run ```yarn && yarn run build``` to prepare packages & build
- Finally, run ```pm2 start npm -- start:multicore``` to start server
