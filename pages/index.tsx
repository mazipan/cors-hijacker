import Head from "next/head"
import { useState } from "react"
import { JSONTree } from 'react-json-tree';

enum ContentTpe {
  JSON = "application/json",
  HTML = "text/html"
}

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}

const theme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#272822',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#a6e22e',
  base0C: '#a1efe4',
  base0D: '#66d9ef',
  base0E: '#ae81ff',
  base0F: '#cc6633',
};

const jsonSafeParse = (str) => {
  try {
    return JSON.parse(str)
  } catch (error) {
    return null
  }
}

export default function Homepage() {
  const [txtUrl, setTxtUrl] = useState("https://ksana.in/api/ping");
  const [txtMethod, setTxtMethod] = useState(HttpMethod.GET);
  const [txtContentType, setTxtContentType] = useState(ContentTpe.JSON);
  const [txtAdditionalHeaders, setTxtAdditionalHeaders] = useState("");
  const [txtBodyData, setTxtBodyData] = useState("");
  const [txtResult, setTxtResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const headers = txtAdditionalHeaders ? jsonSafeParse(txtAdditionalHeaders) : {};
    const body = txtBodyData ? jsonSafeParse(txtBodyData) : {};

    if (txtMethod === "GET") {
      const res = await fetch(`/api?url=${encodeURIComponent(txtUrl)}`, {
        headers: {
          ...headers,
          "Content-Type": txtContentType,
        }
      });
      if (txtContentType === ContentTpe.JSON) {
        const jsonText = await res.json();
        setTxtResult(jsonText);
      } else {
        const htmlText = await res.text();
        setTxtResult(htmlText);
      }
    } else {
      const res = await fetch(`/api?url=${encodeURIComponent(txtUrl)}`, {
        method: txtMethod,
        headers: {
          ...headers,
          "Content-Type": ContentTpe.JSON,
        },
        body: JSON.stringify(body)
      });
      const jsonText = await res.json();
      setTxtResult(jsonText);
    }
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>CORS Hijacker | By Mazipan</title>
        <meta name="description" content="A bare-minimum solution for by passing CORS via public API"></meta>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💀</text></svg>"></link>
      </Head>
      <div id="main">
        <h1>💀 CORS Hijacker</h1>
        <h2 style={{ marginBottom: "5em" }}>A bare-minimum solution for by passing CORS via public API</h2>
        <div className="form-wrapper">
          <div className="fieldset">
            <label htmlFor="txt-method">Method</label>
            <select id="txt-method" name="method" value={txtMethod} onChange={(e) => {
              const val = e.target.value as HttpMethod;
              if (val !== HttpMethod.GET) {
                setTxtContentType(ContentTpe.JSON);
              }
              setTxtMethod(val);
            }}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>
          {txtMethod === HttpMethod.GET ? (
            <div className="fieldset">
              <label htmlFor="txt-content-type">Content</label>
              <select id="txt-content-type" name="content-type" value={txtContentType} onChange={(e) => {
                setTxtResult("");
                setTxtContentType(e.target.value as ContentTpe);
              }}>
                <option value={ContentTpe.JSON}>JSON</option>
                <option value={ContentTpe.HTML}>HTML</option>
              </select>
            </div>
          ) : null}
          <div className="fieldset">
            <label htmlFor="txt-url">URL</label>
            <input id="txt-url" type="url" placeholder="e.g: https://ksana.in/api/ping" value={txtUrl} onChange={(e) => {
              setTxtUrl(e.target.value);
            }} />
          </div>
        </div>
        <div className="form-wrapper">
          <textarea value={txtAdditionalHeaders} onChange={(e) => {
            setTxtAdditionalHeaders(e.target.value);
          }} id="txt-headers" placeholder="Additional header, should be a valid JSON">
          </textarea>

          <textarea value={txtBodyData} onChange={(e) => {
            setTxtBodyData(e.target.value);
          }} id="txt-data-body" placeholder="Additional data body, should be a valid JSON">
          </textarea>
        </div>
        <div className="form-wrapper">
          <button role="button" onClick={handleSubmit}>Submit</button>
        </div>

        {loading ? (
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        ) : null}

        {txtContentType === ContentTpe.JSON && txtResult ? (
          <div id="json-result">
            <JSONTree data={txtResult} theme={theme} invertTheme={false}
            />
          </div>
        ) : null}

        {txtContentType === ContentTpe.HTML && txtResult ? (
          <textarea disabled id="html-result" defaultValue={txtResult}></textarea>
        ) : null}
      </div>
    </>
  )
}
