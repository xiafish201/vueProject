
let format = (value) => {
  return value >= 10 ? value : '0' + value
}
/**
 * 时间格式化
 */
exports.dateFilter = (time, type) => {
  let date = new Date(time * 1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let second = date.getSeconds()
  let result
  switch (type)
  {
    case 0: // 01-05
      result = `${format(month)}-${format(day)}`
      break
    case 1: // 11:12
      result = `${format(hours)}-${format(minutes)}`
      break
    case 2: // 2015-01-05
      result = `${year}-${format(month)}-${format(day)}`
      break
    case 3: // 2015-01-05 11:12
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`
      break
    case 4:// 2015-01-05 11:12:06
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}:${format(second)}`
      break
  }
  return result
}

/** 
 *  格式化時間
 */
exports.customTime = item => {
  let nowTime = new Date().getTime()
  let minuteTime = 60*1000
  let hourTime = 60*minuteTime
  let dayTime = 24*hourTime
  let monthTime = dayTime * 30
  let yearTime = monthTime * 12

  let publishTime = new Date(item).getTime()
  let historyTime = parseInt(nowTime) - parseInt(publishTime)
  let descTime
  if(historyTime >= yearTime){
    //按年算
    descTime = parseInt(historyTime/yearTime) + '年前'
  }else if(historyTime< yearTime && historyTime >= monthTime){
    //按月算
    descTime = parseInt(historyTime/monthTime) + '月前'
  }else if(historyTime< monthTime && historyTime>= dayTime){
    //按天算
    descTime = parseInt(historyTime/dayTime) + '天前'
  }else if(historyTime< dayTime && historyTime>= hourTime){
    //按小时算
    descTime = parseInt(historyTime/hourTime) + '小时前'
  }else if(historyTime< hourTime && historyTime>= minuteTime){
    //按分钟算
    descTime = parseInt(historyTime/minuteTime) + '分钟前'
  }else{
    descTime = '刚刚'
  }
  return descTime
}

exports.formatDate =  time => {
  let tmpDate = new Date(time)
  let year = tmpDate.getFullYear()
  let mathon = tmpDate.getMonth() + 1
  let day = tmpDate.getDate()
  let hours = tmpDate.getHours()
  let minutes = tmpDate.getMinutes()
  return year + '.' + mathon + '.' + day + ' ' + hours + ':' + minutes
}