import axios from 'axios';

export default function (method, url, data, headers, timeout = 15000) {
  return Promise.race([
    axios({
      method: method,
      url: url,
      data: data,
      headers: {
        Authorization: headers,
      },
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout),
    ),
  ]);
}
