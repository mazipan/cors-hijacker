import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import fetch from 'node-fetch';
import { hitSuccessCounter, hitErrorCounter } from "./_utils"

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors()

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  const { url, } = req.query

  if (!url) {
    hitErrorCounter();
    res.status(500);
    console.error("[ERR_CODE]: 5001");
    res.json({
      success: false,
      error: 'ERROR: Query param "url" is required!',
      code: 5001,
    });
  }

  const headers = Object.assign({}, req.headers);
  delete headers.host;

  const contentType = headers["content-type"];

  const targetURL = decodeURIComponent(url as string);
  const targetHeaders = {
    ...headers,
    referer: 'https://cors-hijacker.vercel.app/',
    'cache-control': 'no-cache',
    'accept-language': 'en-US,en;q=0.9',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37',
  }

  if (req.method === "GET") {
    try {
      const isJsonRequest = contentType && contentType === "application/json";

      const remoteResponse = await fetch(targetURL, {
        // @ts-ignore
        headers: targetHeaders
      });
      res.status(remoteResponse.status);

      if (isJsonRequest) {
        const remoteResponseJson = await remoteResponse.json();hitSuccessCounter();
        res.json(remoteResponseJson);
      } else {
        const remoteResponseBody = await remoteResponse.text();hitSuccessCounter();
        res.send(remoteResponseBody);
      }
    } catch (error) {
      hitErrorCounter();
      console.error("[ERR_CODE]: 5002");
      res.status(500);
      res.json({
        success: false,
        error: error,
        code: 5002,
      });
    }
  } else {
    try {
      const remoteResponse = await fetch(targetURL, {
        method: req.method,
        // @ts-ignore
        headers: targetHeaders,
        body: JSON.stringify(req.body)
      })
      res.status(remoteResponse.status);

      const remoteResponseJson = await remoteResponse.json();hitSuccessCounter();
      res.json(remoteResponseJson);
    } catch (error) {
      hitErrorCounter();
      console.error("[ERR_CODE]: 5003");
      res.status(500);
      res.json({
        success: false,
        error: error,
        code: 5003,
      });
    }
  }
}
