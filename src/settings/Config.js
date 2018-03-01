
const ENV = {
  DEVELOP: 'dev',
  UAT: 'uat',
  PRODUCT: 'prd',
};

var env = ENV.DEVELOP;

/*const base_config = {
  version: 'v1',
  api: {
    host: ''
  }
}*/

const dev = {
  api: {
    host: `http://www.wanandroid.com`,
  },
};

const uat = {
  api: {
    host: `http://www.wanandroid.com`
  },
};

const prd = {
  api: {
    host: `http://www.wanandroid.com`
  },
};

const getConf = function(){
  switch (env) {
    case ENV.DEVELOP:
      return dev;
    case ENV.UAT:
      return uat;
    case ENV.PRODUCT:
      return prd;
  }
};

const configuration = getConf();
module.exports = configuration;
