import { DEFAULT_TIMEOUT_SEC } from './config';

export const timeoutAfter = sec => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Took long to respond. Timeout after ${sec} seconds`)),
      sec * 1000
    )
  );
};

export const getJsonResponse = async url => {
  try {
    const res = await Promise.race([fetch(url), timeoutAfter(DEFAULT_TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
