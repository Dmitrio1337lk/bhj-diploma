/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

 function encodeURL(url) {
    let firstSymbol = '?';
    return firstSymbol + Object.entries(url).map(([key, value]) => `${key}=${value}`).join('&');
  }
  
  const createRequest = async (options = {}) => {
      let requestBody = new FormData;
      let requestURL;
      if (options.method === 'GET') {
          requestURL = `${options.url}${encodeURL(options.data)}`;
          requestBody = null;
      } else {
          requestURL = options.url;
          Object.entries(options.data).forEach(([key, value]) => {
                requestBody.append(`${key}`, `${value}`);
          })
      }
  
      try {
          let response = await fetch(requestURL, {
          method: options.method,
          body: requestBody,
          responseType: 'json',
          })
          response = await response.json()
          if (options.callback) {
              if (response.success) {
                  options.callback(null, response)
              } else {
                  options.callback(response.error)
              }
          }
      } catch (err) {
          console.log(err);
      }
  }