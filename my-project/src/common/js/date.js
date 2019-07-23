export function forMatDate(date , fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));//匹配了(y+)?
    }

let o = {
    'M+': date.getMouth()+1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
 };//对象

for (let k in o) {
  if (new RegExp('(${k})').test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1 , (RegExp.$1.length === 1)?str : padLeftZero(str))
   }
}
  return fmt;
};

function padLeftZero(str) {
    return ('0'+str).substr(str.length);
}
// import 的时候用的是import {forMatDate} from 'common/js/date.js';加上花括号