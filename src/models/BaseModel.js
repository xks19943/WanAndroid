/**
 * Created by xiaoming on 2018/2/7.
 */
const HttpClient = require('../services/httpclient');

let BaseModel = {
  /*获取知识体系*/
  getLearningTree(arg,options){
    return HttpClient.get('/tree/json', arg, options);
  },

  /*获取知识体系下的文章*/
  getLearningArticles(path,arg,options){
    return HttpClient.get(`/article/list/${path.pageSize}/json`, arg, options);
  },

  /*获取首页banner图*/
  getBanner(arg,options){
    return HttpClient.get('/banner/json',arg,options);
  },

  getFeedList(path,arg,options){
    return HttpClient.get(`/article/list/${path.pageSize}/json`, arg, options);
  },

  //收藏站内文章
  collectOnSiteArticle(path,arg,options){
    return HttpClient.post(`/lg/collect/${path.id}/json`, arg, options);
  },

  //收藏站外文章
  collectOutSiteArticle(path,arg,options){
    return HttpClient.post(`/lg/collect/add/json`, arg, options);
  },

  //收藏连接
  collectLink(path,arg,options){
    return HttpClient.post(`/lg/collect/addtool/json`, arg, options);
  },

  //取消收藏的文章
  unCollectArticle(path,arg,options){
    return HttpClient.post(`/lg/uncollect_originId/${path.id}/json`, arg, options);
  },

  //取消收藏
  unCollect(path,arg,options){
    return HttpClient.post(`/lg/uncollect/${path.id}/json`, arg, options);
  },

  //获取收藏的文章列表
  getCollectedList(path,arg,options){
    return HttpClient.get(`/lg/collect/list/${path.pageSize}/json`, arg, options);
  },

  //获取收藏的网站列表
  getCollectedLinkList(path,arg,options){
    return HttpClient.get(`/lg/collect/usertools/json`, arg, options);
  },

  //编辑收藏网站
  updateCollectLink(arg,options){
    return HttpClient.post(`/lg/collect/updatetool/json`, arg, options);
  },

  deleteCollectLink(arg,options){
    return HttpClient.post(`/lg/collect/deletetool/json`, arg, options);
  },

  //搜索文章列表
  searchArticles(path,arg,options){
    return HttpClient.post(`/article/query/${path.pageSize}/json`, arg, options);
  },

  //获取搜索热词
  getHotKey(arg,options){
    return HttpClient.get(`/hotkey/json`, arg, options);
  },

  //获取常用网站
  getCommonWebsite(arg,options){
    return HttpClient.get(`/friend/json`, arg, options);
  },



  register(arg,options){
    return HttpClient.post('/user/register', arg, options);
  },

  login(arg,options){
    return HttpClient.post('/user/login', arg, options);
  },

  logout(arg,options){
    return HttpClient.get('/user/logout', arg, options);
  }
};

export default BaseModel;