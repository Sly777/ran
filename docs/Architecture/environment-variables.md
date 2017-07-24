# RAN!

## Environment Variables
You can use dotenv module for defining environment variables within .env file.

- Why should we use?
Dotenv module is the most easiest way to store environment variables. It's a zero dependency module and simple to use.

- How can we use?
You should rename ".env-sample" file to ".env" to start using dotenv.

Sample .env file
```
PORT=3000
DB_HOST=localhost
DB_PASSWORD=password123


```javascript
process.env.PORT
process.env.DB_HOST
process.env.DB_PASSWORD

- Tips
Do not commit the ".env" file to any repository, .gitignore file has a definition for that.