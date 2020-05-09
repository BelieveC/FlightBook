export const isTodaySessionOver = () => {
  var d = new Date()
  if(d.getUTCHours() >= 10){
    return true
  }
  return false
}

export const formatDate = (date) => {
  var month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export const formatResult = (data) => {
  var result = []
  for(var i = 0; i < data.t.length; i++)
  {
    var currentDate = new Date(data.t[i]*1000)
    result.push([formatDate(currentDate), { 'open': data.o[i], 'high': data.h[i], 'close': data.c[i], 'low': data.l[i] }])
  }
  return result
}