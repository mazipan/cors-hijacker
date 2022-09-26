import fetch from 'node-fetch';

const idCounter = 'cors-hijacker';

const hitSuccessCounterUrl = `https://api.countapi.xyz/hit/${idCounter}/hits`;
const hitErrorCounterUrl = `https://api.countapi.xyz/hit/${idCounter}/errors`;

const getSuccessCounterUrl = `https://api.countapi.xyz/get/${idCounter}/hits`;
const getErrorCounterUrl = `https://api.countapi.xyz/get/${idCounter}/errors`;

const hitCounterApi = (url) => {
  setTimeout(async () => {
    try {
      const response = await fetch(url);
      await response.json();
    } catch (error) {
      console.error(`> Error on hit api: ${url}`, error);
    }
  }, 50);
};

interface CounterResponse {
  value: number;
};

const getCounterApi = async (url): Promise<CounterResponse> => {
  try {
    const response = await fetch(url);
    const json = await response.json() as CounterResponse;
    return json || { value : 0 };
  } catch (error) {
    console.error(`> Error on get api: ${url}`, error);
  }
  return null;
};

export const hitSuccessCounter = (): void => {
  hitCounterApi(hitSuccessCounterUrl);
};

export const hitErrorCounter = (): void => {
  hitCounterApi(hitErrorCounterUrl);
};

export const getSuccessCounter = async (): Promise<CounterResponse> => {
  return await getCounterApi(getSuccessCounterUrl);
};

export const getErrorCounter = async (): Promise<CounterResponse> => {
  return await getCounterApi(getErrorCounterUrl);
};

export const nFormatter = (num, digits): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });

  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};