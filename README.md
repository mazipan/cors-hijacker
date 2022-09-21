# 💀 CORS Hijacker

A bare-minimum solution to solve CORS problem via proxy API

## Base URL

https://cors-hijacker.vercel.app/

## Get

### Get Basic HTML

Endpoint: `${BASE_URL}/api?url=${YOUR_ENCODED_URL}`

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

Endpoint: `${BASE_URL}/api/?url=${YOUR_ENCODED_URL}`

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
