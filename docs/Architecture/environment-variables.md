# RAN!

## Environment Variables

One of the best ways to use sensitive information is setting environment variables. Even in open source repositories without hard-coding the information within publicly available repositories, It's more important. Set your environment variable by using ```.env``` files, then you can use it on your application. On Node.js applications, [Dotenv](https://github.com/motdotla/dotenv) module is the easiest way to store/retrieve environment variables. It's a zero dependency module and simple to use. For access to these variables client-side [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) has been added which only exposes variables that are used by your front-end pages.

#### How can we use?
Just rename ".env-sample" file to ".env" to use your environment variables.

#### Example

**On The Server**

Sample `.env` file
```
PORT=3000
DB_HOST=localhost
DB_PASSWORD=password123
```

On your application, you can access these values by using ```process.env```.
```javascript
process.env.PORT
process.env.DB_HOST
process.env.DB_PASSWORD
```

For more info, please [click here to check dotenv repo](https://github.com/motdotla/dotenv)

**On The Client**

Sample `public.env` file
```
EMAIL=foo@bar.com
```

On your application, you can access these values by using ```process.env```.
```javascript
process.env.EMAIL
```

On any of your client-side scripts, you can access your environment variables similarly
```javascript
export default (props) => (
  <div>My email is {process.env.EMAIL}</div>
);
```

For more info, please [click here to check dotenv-webpack repo](https://github.com/mrsteele/dotenv-webpack)

#### Tips
- **Do not commit the ".env" file to any repository**, .gitignore file has a definition for that. If you commit, It can possibly create security flaw on your application.
- If you are deploying to Zeit Now, in addition to dotenv, use [Now Secrets](https://zeit.co/docs/features/env-and-secrets). Zeit's OSS plan makes the source of your app available to the public and **sensitive information in ".env", "now.json" or other files may be exposed**.

### Shared Variables between Client and Server
- Use `public.env` to store non-sensitive variables for the client. These variables will be used and exposed to the client so be sure they are safe to expose.
- The variables in `public.env` and `.env` are merged and loaded on the server. Keep in mind that if a variable is defined in both files, `.env` variables will take precedence.
