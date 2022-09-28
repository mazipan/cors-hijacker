# 💀 CORS Hijacker

A bare-minimum solution to solve [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) problem via proxy API

![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) ![](https://img.shields.io/website-up-down-brightgreen-red/https/cors-hijacker.vercel.app.svg) ![](https://img.shields.io/endpoint?url=https%3A%2F%2Fcors-hijacker.vercel.app%2Fapi%2Fbadge)

## Base URL

Base URL: https://cors-hijacker.vercel.app

Endpoint: `${BASE_URL}/api?url=${YOUR_ENCODED_URL}`

## Docs

- [GET Request](#get)
  - [Get HTML](#get-basic-html)
  - [Get JSON](#get-basic-json)
- [POST Request](#post)


## GET

### Get Basic HTML

Sample Request:

```ts
// Get html from https://mazipan.space/
const res = await fetch(
  `https://cors-hijacker.vercel.app/api?url=${encodeURIComponent(
    'https://mazipan.space/'
  )}`,
  {
    headers: {
      // Content-Type is required
      'Content-Type': 'text/html',
    },
  }
);
const html = await res.text();
```

### Get Basic JSON

Sample Request:

```ts
const res = await fetch(
  `https://cors-hijacker.vercel.app/api?url=${encodeURIComponent(
    'https://ksana.in/api/ping'
  )}`,
  {
    headers: {
      // Content-Type is required
      'Content-Type': 'application/json',
    },
  }
);
const jsonResponse = await res.json();
```

## POST

Sample Request:

```ts
const res = await fetch(
  `https://cors-hijacker.vercel.app/api?url=${encodeURIComponent(
    'https://ksana.in/api/ping'
  )}`,
  {
    // method is required
    method: 'POST',
    headers: {
      // Content-Type is required
      'Content-Type': 'application/json',
    },
    // body is optional
    body: JSON.stringify(additionalBodyParam),
  }
);
const jsonResponse = await res.json();
```
## Limitations

- Not support `Form` submission.
- Use free-tier server from Vercel, not reliable for high traffic.

## Credits

- [Node-Fetch](https://github.com/node-fetch/node-fetch)
- [Count API](https://countapi.xyz/)
- [Vercel](https://vercel.com/)

---

Copyright © By Irfan Maulana
