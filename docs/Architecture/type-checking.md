# RAN!

## Type Checking

For type checking, we are using [Flow](https://flow.org). But It's optional. The default configuration is to type check only on the files that have a

```js
//@ flow
```

as its first line. 

The configuration file is named .flowconfig and located at the root of the project. It has its default values as when created but with a folder called /types added to check if you have custom global types.
