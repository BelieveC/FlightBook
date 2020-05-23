import { generateCamarillaValues } from "./camrillaCalculations"
import { generatePivotValues } from "./pivotCalculations"

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
  
  for(i = 1; i < result.length; i++)
  {
    var camrillaResult = generateCamarillaValues(result[i][1], result[i-1][1])
    var pivotResult = generatePivotValues(result[i][1], result[i-1][1])
    result[i] = { 
      ...result[i], 
      'camarillaValues': camrillaResult.camarillaValues, 
      'camrillaTwoDayRelationship': camrillaResult.camarillaTwoDayRelationship,
      'pivotValues': pivotResult.pivotValues,
      'pivotTwoDayRelationship': pivotResult.pivotTwoDayRelationship
    }
  }
  return result
}
