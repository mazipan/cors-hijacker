import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import fetch from 'node-fetch';

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
    res.status(500);
    res.json({
      success: false,
      error: 'ERROR: Query param "url" is required!'
    });
  }

  const headers = req.headers;
  const contentType = headers["content-type"];

  const targetURL = decodeURIComponent(url as string);

  if (req.method === "GET") {
    try {
      const remoteResponse = await fetch(targetURL, {
        // @ts-ignore
        headers
      });
      res.status(remoteResponse.status);

      if (contentType && contentType === "application/json") {
        const remoteResponseBody = await remoteResponse.json()
        res.json(remoteResponseBody);
      } else {
        const remoteResponseBody = await remoteResponse.text()
        res.send(remoteResponseBody);
      }
    } catch (error) {
      res.status(500);
      res.json({
        success: false,
        error: error,
      });
    }
  } else {
    try {
      const remoteResponse = await fetch(targetURL, {
        // @ts-ignore
        headers,
        body: JSON.stringify(req.body)
      })
      res.status(remoteResponse.status);

      const remoteResponseBody = await remoteResponse.json()
      res.send(remoteResponseBody);
    } catch (error) {
      res.status(500);
      res.json({
        success: false,
        error: error,
      });
    }
  }
}
