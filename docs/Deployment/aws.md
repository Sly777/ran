# RAN! Documentation

## Deployment
### Amazon (AWS)
    
#### AWS Beanstalk    
* remove "prestart" from package.json.  Beanstalk individual instances will run prestart which triggers a 
build and generates a new  BUILD_ID. It is important that build happens before AWS on local or CI and result is pushed 
to Beanstalk so that you can load balance multiple instances of the app each containing the same prebuilt .next/BUILD_ID.
   
* `npm run zip-for-beanstalk` will remove all devDependencies and then zip up the folder.  Note 
(You will need to run npm install again after this.  You could consider repack-zip if you want to build locally
without blowing out your node_modules directory)

* create AWS Beanstalk application.  An application is a grouping of environments 
  (ex: myapp-prod, myapp-test, myapp-beta, myapp-devsandbox). 

  Create environment.  Amount of settings can be overwhelming at first but most will become obvious defaults once you learn them.
  Take the time to understand each one.  Become comfortable creating, cloning, destroying environments.
  
  * environment type "Web".  
  * Configuration > Software
    - Node.js version: <latest available>
    - Node command: node server.js
    - environment variables: PORT=8081, NODE_ENV=production
  * Configuration > Instances
    - EC2 Instance Type: t2.micro (at time of writing it defaults to t1 which is old) 
  * Configuration > Load balancer
    - Application (not classic) recommended to handle http2, https, http->https redirection
    - stickiness enabled (when updates are going you don't want them to hit different version server)
  * Configuration > Security
    - First create security groups in EC2 representing each env (ex: myapp-test).  You will set firewall ports to this group and 
      may want different settings for test and production.
    - Recommended to set key pair so you can ssh in later if you must 
      (note that machines should be treated as ephemeral as amazon will replace them)
  * Configuration > Database
    - Never ever setup database inside beanstalk (it will be destroyed if you need to rebuild environment)  
      Create database in RDS if you need one.   

* upload zip file to AWS Beanstalk manually at the dashboard or use AWS cli during local or CI flows.

# Quicker sandbox builds
Consider setting Configuration > Monitoring > Health reporting to basic on sandbox environments for maximum speed.
The enhanced reporting takes a long time to come back successful which can be unnecessary friction on R&D server.

# build changes that conflict with configuration settings
It can be helpful to set Configuration > Rolling updates and deployments > Deployment preferences > 
ignore health check to "don't fail" and healthy threshold to Severe when first testing so beanstalk wont roll back builds.
This will give you easier tweaking so you can reboot with different settings.  Just don't forget to set appropriate 
production settings when you get a stable build going. 


#### AWS Lambda (serverless)
Cautionary note that Lambda isn't really made for consumer facing sites.  
Infrastructure (cloudfront & api gateway )adds ~100ms minimum latency, CPU response between 0 and 2s depending
on how your request is prioritized, much longer startup delay for each concurrent request to warm up.
If you would like to proceed though, this is a great example: https://github.com/skriems/next-material
