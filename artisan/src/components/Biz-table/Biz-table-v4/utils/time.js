//关于时间的方法库；
import moment from 'moment'

/***
 *  根据时间做配置  获取到对应的某一天
 * @type {{today(): *, yesterday(): *}}
 */
const timeMapFun = (type) => {

  let date = ''
  let year = moment().year()
  let month = moment().month()
  let quarter = moment().quarter()  // 当前是第几个季度

  switch (type) {
    // 当日
    case 'today':
      date = moment()
      break

    // 昨天
    case 'yesterday':
      date = moment().subtract(1, 'days')
      break

    // 明天
    case 'tomorrow':
      date = moment().add(1, 'days')
      break

    //周
    // 上周第一天
    case 'lastWeekStart':
      date = moment().day(1 - 7)
      break

    //上周最后一天
    case 'lastWeekEnd':
      date = moment().day(1 - 1)
      break

    //本周第一天
    case 'thisWeekStart':
      date = moment().day(1)
      break

    // 本周最后一天
    case 'thisWeekEnd':
      date = moment().day(7)
      break

    // 下周第一天
    case 'nextWeekStart':
      date = moment().day(7 + 1)
      break

    // 下周第一天
    case 'nextWeekEnd':
      date = moment().day(7 + 7)
      break

    //月
    // 上个月第一天
    case 'lastMonthStart':
      date = moment([year, 0]).month(month - 1)
      break

    // 上个月最后一天
    case 'lastMonthEnd':
      date = moment([year, 0, 31]).month(month - 1)
      break

    // 当前月第一天
    case 'thisMonthStart':
      date = moment([year, 0]).month(month)
      break

    // 当前月最后一天
    case  'thisMonthEnd':
      date = moment([year, 0, 31]).month(month)
      break

    // 下个月第一天
    case  'nextMonthStart':
      date = moment([year, 0]).month(month + 1)
      break

    // 下个月最后一天
    case  'nextMonthEnd':
      date = moment([year, 0, 31]).month(month + 1)
      break

    //上季度的第一天
    case  'lastQuarterStart':
      date = moment().month((quarter - 2) * 3).set('date', 1)
      break

    //上季度的最后-天
    case  'lastQuarterEnd':
      date = moment().month((quarter - 1) * 3).set('date', 1).subtract(1, 'days')
      break

    //当前季度的第-天
    case  'thisQuarterStart':
      date = moment().month((quarter - 1) * 3).set('date', 1)
      break

    //当前季度的最后-天
    case  'thisQuarterEnd':
      date = moment().month(quarter * 3).set('date', 1).subtract(1, 'days')
      break

    // 下个季度的第一天
    case  'nextQuarterStart':
      date = moment().month(quarter * 3).set('date', 1)
      break

    // 下个季度的最后一天
    case  'nextQuarterEnd':
      date = moment().month((quarter + 1) * 3).set('date', 1).subtract(1, 'days')
      break

    // 去年第一天
    case 'lastYearStart':
      date = moment().year(year - 1).set('month', 0).set('date', 1)
      break

    // 去年最后一天
    case 'lastYearEnd':
      date = moment().set('month', 0).set('date', 1).subtract(1, 'days')
      break

    // 今年第一天
    case 'thisYearStart':
      date = moment().set('month', 0).set('date', 1)
      break

    // 今年最后一天
    case 'thisYearEnd':
      date = moment().year(year + 1).set('month', 0).set('date', 1).subtract(1, 'days')
      break

    // 明年第一天
    case 'nextYearStart':
      date = moment().year(year + 1).set('month', 0).set('date', 1)
      break

    // 明年最后一天
    case 'nextYearEnd':
      date = moment().year(year + 2).set('month', 0).set('date', 1).subtract(1, 'days')
      break

    //上半年的最后一天
    case 'thisFirstHalfYearEnd':
      date = moment().set('month', 6).set('date', 1).subtract(1, 'days')
      break

    //下半年的第一天
    case 'thisLastHalfYearStart':
      date = moment().set('month', 6).set('date', 1)
      break

    //一周前(当天算一天， 包括当天)
    case 'oneWeekAgoInclude':
      date = moment().subtract(6, 'days')
      break

    //一周前(当天算一天， 不包括当天)
    case 'oneWeekAgo':
      date = moment().subtract(7, 'days')
      break

    //一月前
    case 'oneMonthAgo':
      date = moment().set('month', month - 1)
      break

    //三个月前
    case 'oneThreeMonthAgo':
      date = moment().set('month', month - 3)
      break

    //六个月前
    case 'oneSixMonthAgo':
      date = moment().set('month', month - 6)
      break

    //一年前
    case 'oneYearAgo':
      date = moment().set('year', year - 1)
      break


    default:
      date = moment()
      break
  }

  return date
}


/***
 * format：  element moment 配置有些出入， 需要映射一下
 * @params type  (yyyy-MM-dd HH:mm:ss )  ---- (YYYY-MM-DD HH:mm:ss)
 */
var map = {
  'yyyy': 'YYYY',
  'dd': 'DD',
}


const getNewFormat = (format = '')=>{
  //正则替换  (yyyy-MM-dd HH:mm:ss )  ---- (YYYY-MM-DD HH:mm:ss)
  let reg = new RegExp(Object.keys(map).join('|'), 'g')
  return format.replace(reg, val => map[val])
}

/**
 * 转化时间的内置库
 *  @params type 选择时间类型 type: today ; yesterday; ...
 *  @params format:  匹配规则
 */
const getTransformTime = (type = 'today', format = '') => {
  // 获取配置的时间
  let date = timeMapFun(type)
  //正则替换  (yyyy-MM-dd HH:mm:ss )  ---- (YYYY-MM-DD HH:mm:ss)
  let newFormat = getNewFormat(format)
  //获取正确格式的时间
  return format ? date.format(newFormat) : new Date(date)
}

/**
 * 获取时间范围  例如获取一周时间 ：startType： thisWeekStart； endType：thisWeekEnd
 * @params startType  初始时间类型
 * @params endType  结束时间类型
 * @params format  规则
 */
const getRangeTime = (startType, endType, format = '') => {
  if (!startType || !endType) {
    return []
  }

  let startTime = timeMapFun(startType)
    .set('hour', 0).set('minute', 0).set('second', 0)

  let endTime = timeMapFun(endType)
    .set('hour', 23).set('minute', 59).set('second', 59)

  //正则替换  (yyyy-MM-dd HH:mm:ss )  ---- (YYYY-MM-DD HH:mm:ss)
  let newFormat = getNewFormat(format)

  //获取正确格式的时间
  return format ? [startTime.format(newFormat), endTime.format(newFormat)] : [new Date(startTime), new Date(endTime)]
}

/**
 *  根据format 传入渲染对应时间
 * @params date  new Date 类型
 * @params format  规则
 */
const getFormatTime = ( date, format) =>  {
  if(date.constructor === Date){
    //正则替换  (yyyy-MM-dd HH:mm:ss )  ---- (YYYY-MM-DD HH:mm:ss)
    let newFormat = getNewFormat(format)
    return moment(date).format(newFormat)
  }else {
    return date
  }
}

export {
  getTransformTime,
  getRangeTime,
  getFormatTime
}
