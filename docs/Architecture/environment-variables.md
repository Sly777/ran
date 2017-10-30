# RAN!

## Environment Variables

One of the best ways to use sensitive information is setting environment variables. Even in open source repositories without hard-coding the information within publicly available repositories, It's more important. Set your environment variable by using ```.env``` files on your server-side, then you can use it on your application. On Node.js applications, [Dotenv](https://github.com/motdotla/dotenv) module is the easiest way to store/retrieve environment variables. It's a zero dependency module and simple to use.

#### How can we use?
Just rename ".env-sample" file to ".env" to use your environment variables.

#### Example
Sample .env file
```
PORT=3000
DB_HOST=localhost
DB_PASSWORD=password123
```

On your server-side, you can access these values using by ```process.env```.
```javascript
process.env.PORT
process.env.DB_HOST
process.env.DB_PASSWORD
```

For more info, please [click here to check dotenv repo](https://github.com/motdotla/dotenv)

#### Tips
- **Do not commit the ".env" file to any repository**, .gitignore file has a definition for that. If you commit, It can possibly create security flaw on your application.
- If you are deploying to Zeit Now, in addition to dotenv, use [Now Secrets](https://zeit.co/docs/features/env-and-secrets). Zeit's OSS plan makes the source of your app available to the public and **sensitive information in ".env", "now.json" or other files may be exposed**.

### Shared Variables between Client and Server (WIP)
(WIP)
