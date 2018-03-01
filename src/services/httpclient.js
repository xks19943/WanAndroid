import _ from 'lodash';
import $config from '../settings/Config';
var noop = () => {};

var httpClient = {};

httpClient._paramify = function (obj) {
  var str = '';
  for (var key in obj) {
    if (str !== '') {
      str += '&';
    }
    str += key + '=' + obj[key];
  }
  return str;
};

httpClient.status = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }else if(response.status === 404){
    throw 'api not found'
  }
  throw response;
};

httpClient.get = function (url, params, options) {
  options = options || {};
  if (params) {
    var getParams = this._paramify(params);
    url +=  '?' + getParams;
  }
  options.method = 'GET';
  options.url = url;
  options.params = params;
  options.headers = {
    'Accept': 'application/json',
  };
  return this.request(options);
};

httpClient.post = function(url,params,options) {
  options = options || {};
  if (params) {
    var getParams = this._paramify(params);
    url +=  '?' + getParams;
  }
  options.method = 'POST';
  options.url = url;
  options.headers = {
    'Accept': 'application/json',
  };
  return this.request(options);
};

httpClient.request = function (options) {
  if(options.url.indexOf('/') === 0){
    options.url =  $config.api.host + options.url;
  }
  console.log(options);
  return new Promise(async(resolve, reject) => {
    resolve = resolve || noop;
    reject = reject || noop;
    fetch(options.url, options).then(async response => {
      let result = await response.json();
      if(!result.errorCode){
        resolve(result);
      }else {
        const errRst = {};
        errRst.errorCode = result.errorCode;
        errRst.message = result.errorMsg;
        throw errRst;
      }
    }).catch(async (error) => {
      var errRst = {errorCode: 0, message: 'error'};
      if(_.isString(error)){
        errRst = {errorCode: 0, message: error};
      } else if (error.errorCode || error.message) {
        errRst = error;
      } else {
        try {
          errRst = await error.json();
        } catch (e) {
          errRst = {errorCode: 0, message:JSON.stringify(error)};
        }
      }
      reject(errRst)
    });
  });
};



module.exports = httpClient;


