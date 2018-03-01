
import moment from 'moment';

var friendlyLabels = {
  SECOND: '秒前',
  MINUTE: '分前',
  HOUR:   '小时前',
  DAY:    '天前'
};

var weekDays = [
  '周日',
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
];
class Filter{
  date(date, formatter){
    if(!date) return '';
    var fmt = formatter || 'YYYY年MM月DD日';
    return moment(date).format(fmt);
  };

  deteWithoutMoment(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }

  formatDateToTarget(date, count=0){
    let nowDay = new Date();
    let result = true;
    result = result&&nowDay.getYear()==date.getYear();
    result = result&&nowDay.getMonth()==date.getMonth();
    result = result&&nowDay.getDate()==date.getDate() + count;
    return result;
  }

  currentDate(date) {
    let nowDay = new Date();
    let result = true;
    result = result&&nowDay.getYear()==date.getYear();
    result = result&&nowDay.getMonth()==date.getMonth();
    result = result&&nowDay.getDate()==date.getDate();
    return result;
  }

  yesterdayDate(date) {
    let nowDay = new Date();
    let result = true;
    result = result&&nowDay.getYear()==date.getYear();
    result = result&&nowDay.getMonth()==date.getMonth();
    result = result&&nowDay.getDate()==(date.getDate()+1);
    return result;
  }

  beforeYesterdayDate(date) {
    let nowDay = new Date();
    let result = true;
    result = result&&nowDay.getYear()==date.getYear();
    result = result&&nowDay.getMonth()==date.getMonth();
    result = result&&nowDay.getDate()==(date.getDate()+2);
    return result;
  }

  formatAstro(m, d){
    return "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(m*2-(d<"102223444433".charAt(m-1)- -19)*2,2) + '座';
  }


  sleep(times) {
    return new Promise((resolve,reject)=>{
      setTimeout(function () {
        resolve();
      }, times);
    });
  };

  weekDay(date,formatter){
    if(!date) return '';
    let dayOfWeek = moment(date).format('e');
    let weekDay = this.getDayOfWeekDay(dayOfWeek);
    var fmt = formatter || 'YYYY.MM.DD';
    return moment(date).format(fmt) + ' ' + weekDay;
  }

  getDayOfWeekDay(dayOfWeek){
    return weekDays[dayOfWeek];
  }

  getCurrentDay(date){
    if(!date) return '';
    return moment(date).format('D');
  }

  // + - 多少天
  calNsTime( startDate , day){
    var now = +new Date(startDate);
    scale = 1000 * 60 * 60 * 24; //1天
    return new Date(now + scale * day);
  }

  number(num, precision, separator) {
    let parts;
    // 判断是否为数字
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
      // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
      // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
      // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
      // 的值变成了 12312312.123456713
      num = Number(num);
      // 处理小数点位数
      num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
      // 分离数字的小数部分和整数部分
      parts = num.split('.');
      // 整数部分加[separator]分隔, 借用一个著名的正则表达式
      parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

      return parts.join('.');

    }
    return "0";
  };

  getTimestamp(){
    return moment();
  }

  getCurrentMonth(){
    return new Date().getMonth() + 1
  }

  nextDate(){
    let nowDate = new Date();
    return moment(nowDate,'YYYYMMMDD').add(1,'days');
  }

  tomorrow(){
    return moment().add(1,'days').format('YYYYMMDD');
  }

  yesterday(nowDateStr){
    return moment(nowDateStr,'YYYYMMDD').subtract(1,'days').format('YYYYMMDD');
  }

  today(){
    return moment().format('YYYYMMDD');
  }

  /*过滤列表中重复的数据*/
  concatFilterDuplicate(list1, list2) {
    const set = new Set(list1.map(item => item.id));
    const filterList2 = [];
    const length = list2.length;
    for (let i = 0; i < length; i++) {
      if (!set.has(list2[i].id)) {
        filterList2.push(list2[i]);
      }
    }
    return list1.concat(filterList2);
  }

  randomColor(){
    const r=Math.floor(Math.random()*256);
    const g=Math.floor(Math.random()*256);
    const b=Math.floor(Math.random()*256);
    return "rgb("+r+','+g+','+b+")";
  }
}

module.exports = new Filter;
