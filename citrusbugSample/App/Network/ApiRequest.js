import base64 from 'base-64';
const username = '';
const password = '';

export const postRequestWithBasicAuth = async (apiUrl, body) => {
  console.log(apiUrl, body)
  let formBody = [];
  for (let property in body) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(body[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const response = await fetch(apiUrl, {
    credentials: "include",
    method: "POST",
    headers: {
      Authorization: "Basic " + base64.encode(username + ":" + password),
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formBody
  });
  const result = await response.text();
  console.log('result', result);
  const responseJson = JSON.parse(result);
  return responseJson;
};

export const postRequestWithTokenRow = async (apiUrl, token, body) => {
  console.log(apiUrl, token, body)
  const response = await fetch(apiUrl, {
    credentials: "include",
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  });
  console.log('headers', await response.status)
  const result = await response.text();
  console.log('result', result);
  const responseJson = result === '' ? response.status : JSON.parse(result);
  const dataWithStatus = {
    result: responseJson,
    status: response.status,
  }
  return dataWithStatus;
};

export const getRequestWithHeader = async (apiUrl, token) => {
  console.log(apiUrl, token)
  const response = await fetch(apiUrl, {
    credentials: "include",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });
  console.log('headers', await response.status)
  const result = await response.text();
  console.log('result', result);
  const responseJson = result === '' ? response.status : JSON.parse(result);
  const dataWithStatus = {
    result: responseJson,
    status: response.status,
  }
  return dataWithStatus;
};