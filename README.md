# 💀 CORS Hijacker

## Base URL

https://cors-hijacker.vercel.app/

## Get

### Get Basic HTML

Endpoint: `${BASE_URL}/api/cors?url=${YOUR_ENCODED_URL}`

Sample Request:

```ts
// Get html from https://mazipan.space/
const res = await fetch(
  `https://cors-hijacker.vercel.app/api/cors?url=${encodeURIComponent(
    'https://mazipan.space/'
  )}`
);
const html = await res.text();
```

### Get Basic JSON

Endpoint: `${BASE_URL}/api/cors?url=${YOUR_ENCODED_URL}`

Sample Request:

```ts
const res = await fetch(
  `https://cors-hijacker.vercel.app/api/cors?url=${encodeURIComponent(
    'https://ksana.in/api/shield'
  )}`,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
const jsonResponse = await res.json();
```
