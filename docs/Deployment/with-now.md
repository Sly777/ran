# RAN! Documentation

## Deployment
### With [now](https://zeit.co/now)

If you still don't install **now**, please ([download from here](https://zeit.co/download))

And then you need to change the line of **"start"** on scripts of ```package.json``` to **"start": "NODE_ENV=production node server.js",** because Now doesn't support PM2 (because it's integrated on NOW you don't need to think about that)

After the change, Just run this command:

```bash
now
```
