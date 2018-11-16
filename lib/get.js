/**
 * @module get
 */
import{ isPrime } from"./is.js";
/**
 * @desc 获取当前页面的url中的查询参数
 * @param {String} key - 需要获取的简值对的key
 * @return {Function}
 */
export const getQueryString = (key) => {
  const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  const r = window.location.search.substr(1).match(reg);
  if(r != null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * @desc 获取浏览器类型和版本
 * @return {String} 浏览器类型
 */
export const getExplore = () => {
  const sys = {};
  const ua = navigator.userAgent.toLowerCase();
  let s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
    (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
      (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
          (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
            (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
              (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
  // 根据关系进行判断
  if(sys.ie) return ("IE: " + sys.ie);
  if(sys.edge) return ("EDGE: " + sys.edge);
  if(sys.firefox) return ("Firefox: " + sys.firefox);
  if(sys.chrome) return ("Chrome: " + sys.chrome);
  if(sys.opera) return ("Opera: " + sys.opera);
  if(sys.safari) return ("Safari: " + sys.safari);
  return "Unkonwn";
};

/**
 * @desc 获取操作系统类型
 * @return {String} 操作系统类型
 */
export const getOS = () => {
  const userAgent = "navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase() || "";
  const appVersion = "navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase() || "";
  if(/mac/i.test(appVersion)) return "MacOSX";
  if(/win/i.test(appVersion)) return "windows";
  if(/linux/i.test(appVersion)) return "linux";
  if(/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) "ios";
  if(/android/i.test(userAgent)) return "android";
  if(/win/i.test(appVersion) && /phone/i.test(userAgent)) return "windowsPhone";
};

/**
 * @description 获取滚动位置
 * @summary 如果已定义，请使用pageXOffset和pageYOffset，否则使用scrollLeft和scrollTop，可以省略el来使用window的默认值。
 * @param {Element} el - 需要获取滚动位置的元素，原生的
 * @return {Object} 返回{x: x, y: y} 型表示横向还是竖向的滚动位置
 * @example
 * getScrollPos(window);
 * // return {x: 0, y: 100}
 */

export const getScrollPos = (el = window) => ({
  x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
  y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop
});

/**
 * @description 测试函数功能所花费的时间
 * @summary 使用performance.now（）获取函数的开始和结束时间，console.log（）所花费的时间。
 * 第一个参数是函数名，随后的参数传递给函数。
 * @param {Function} callback - 需要测试的函数
 * @return {string} 字符串描述的时间长度
 * @example
 * timeTaken(() => Math.pow(2, 10));
 * (logged): timeTaken: 0.02099609375ms
 */

export const timeTaken = callback => {
  console.time("timeTaken");
  const r = callback();
  console.timeEnd("timeTaken");
  return r;
};

/**
 * 评级组件
 * @param {number} rate - 当前的评级，从0到5
 * @return {string} 当前的评级
 */
export const getRate = (rate) => {
  return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
};

/**
 * 函数执行有错误，查stackoverflow
 * @param {*} something - 函数或者任何操作
 */
export const turnToStackoverflow = (func, context) => {
  try {
    func.call(context);
  } catch(e) {
    window.location.href = "http://stackoverflow.com/search?q=[js]+" + e.message;
  }
};

/**
 * 解析url为一个对象
 * @param {Url} url - 需要解析的url
 * @return {Object} - 返回解析结果的对象
 * @example
 * var res = parseUrl('http://baidu.com:80/abd?id=123&&title=123213#521');
 * console.log(res);
 * // return abject
 */
export function parseUrl (url) {
  const result = {};
  const keys = ["href", "origin", "protocol", "host", "hostname", "port", "pathname", "search", "hash"];
  const regexp = /(([^:]+:)\/\/(([^:\/\?#]+)(:\d+)?))(\/[^?#]*)?(\?[^#]*)?(#.*)?/;
  const match = regexp.exec(url);
  if(match) {
    for(let i = keys.length - 1; i >= 0; i--) {
      result[keys[i]] = match[i] ? match[i] : " ";
    }
  }
  return result;
}

/**
 * 输出从str到end的所有质数
 * @param {Number} str - 起始数值
 * @param {Number} end - 结束数值
 * @return {Array} 结果的数组
 * @example
 * getPrime(1, 1000);
 * // return [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
 */
export function getPrime (str, end) {
  const res = [];
  for(let i = str; i <= end; i++) {
    if(isPrime(i)) {
      res.push(i);
    } else {
      continue;
    }
  }
  return res;
}
