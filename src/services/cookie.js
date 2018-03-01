/**
 * Created by clude on 4/18/17.
 */


const $store = require('./store');
const USER_STORAGE_KEY = '_USER_INFO_';

class Cookie {
  constructor() {
    this.init();
  };

  init() {
    this.user = {};
    this.setUser({}, false);
  };

  setUser(user, overwriteStore = true) {
    if (overwriteStore) {
        $store.save(USER_STORAGE_KEY, user);
    }
  };



  clear() {
    this.init();
    $store.delete(USER_STORAGE_KEY);
  };

  async getUser() {
      try{
        const user = await $store.get(USER_STORAGE_KEY);
        return user;
      }catch (e){
          console.log('获取用户失败');
      }

  }
}

module.exports = new Cookie();
