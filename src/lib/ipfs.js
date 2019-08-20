function createBoundary(data) {
  while (true) {
    var boundary = `----IPFSMini${Math.random() * 100000}.${Math.random() * 100000}`;
    if (data.indexOf(boundary) === -1) {
      console.log('not sure why this occurred...')
      return boundary;
    }
    return boundary
  }
}

// copy pasted from here:
const sendAsync = function sendAsync(opts, cb) {
  var request = new XMLHttpRequest(); // eslint-disable-line
  var options = opts || {};

  return new Promise(function (resolve, reject) {
    function callback(e, r) {
      // console.log(e, r)
      // cb(e, r);
      if (e) return reject(e);
      if (!e && r) return resolve(r);
    };

    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.timeout !== 1) {
        if (request.status !== 200) {
          callback(new Error(`[custom-ipfs] status ${request.status}: ${request.responseText}`), null);
        } else {
          try {
            callback(null, (options.jsonParse ? JSON.parse(request.responseText) : request.responseText));
          } catch (jsonError) {
            callback(new Error(`error`, null));
          }
        }
      }
    };

    try {
      var pinningURI = '?pin=false' // hardcoded for now

      if (options.payload) {
        request.open('POST', `${'https://ipfs.infura.io:5001/api/v0/add'}${pinningURI}`);
      } else {
        request.open('GET', `${'https://ipfs.infura.io:5001/api/v0/add'}${pinningURI}`);
      }

      if (options.accept) {
        request.setRequestHeader('accept', options.accept);
      }

      if (options.payload && options.boundary) {
        request.setRequestHeader('Content-Type', `multipart/form-data; boundary=${options.boundary}`);
        request.send(options.payload);
      } else {
        request.send();
      }
    } catch (err) {
      callback(err, null);
    }
  });
};

export const add = async (input, name, queryParams) => {
  var data = ((typeof input === 'object' && input.isBuffer) ? input.toString('binary') : input);
  var boundary = createBoundary(data);
  var payload = `--${boundary}\r\nContent-Disposition: form-data; name="path"\r\nContent-Type: application/octet-stream\r\n\r\n${data}\r\n--${boundary}--`;

  // return fetch('https://ipfs.infura.io:5001/api/v0/add' + queryParams, {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'multipart/form-data; boundary=${boundary}'
  //   },
  //   body: payload,
  // })
  //   .then(r => r.json())
  //   .then(data => data)
  return await sendAsync({
    jsonParse: true,
    accept: 'application/json',
    uri: '/add',
    takeHash: true,
    payload, boundary,
  });
};

export const pin = (ipfsHash) => fetch(
  'https://ipfs.infura.io:5001/api/v0/pin/add?arg=/ipfs/' + ipfsHash
)
  .then(r => r.json())
  .then(data => data)

export const cat = (ipfsHash) => fetch(
  'https://ipfs.infura.io:5001/api/v0/cat?arg=' + ipfsHash
)
  .then(r => r.text())
  .then(data => data)

