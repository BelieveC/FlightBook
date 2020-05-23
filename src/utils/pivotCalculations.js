const createPivotRows = (previousTradingDay) => {
  const { high, low, close } = previousTradingDay
  // {debugger}
  // Central Pivot Range
  var pivot =  (high + low + close)/3.0
  var bc =  (high + low)/2.0
  var tc =  2*pivot - bc

  if(bc > tc){
    var tmp = tc
    tc = bc
    bc = tmp
  }

  // Resistances
  var r1 = 2*pivot - low
  var r2 = pivot + high - low
  var r3 = r1 + high - low
  var r4 = r3 + r2 - r1

  // Supports
  var s1 = 2*pivot - high
  var s2 = pivot - (high - low)
  var s3 = s1 - (high - low)
  var s4 = s3 - (s1 - s2)

  return [
    {'name': 'Resistance 4', 'value': parseFloat(r4).toFixed(2)},
    {'name': 'Resistance 3', 'value': parseFloat(r3).toFixed(2)},
    {'name': 'Resistance 2', 'value': parseFloat(r2).toFixed(2)},
    {'name': 'Resistance 1', 'value': parseFloat(r1).toFixed(2)},
    {'name': 'Top Pivot', 'value': parseFloat(tc).toFixed(2)},
    {'name': 'Cetral Pivot', 'value': parseFloat(pivot).toFixed(2)},
    {'name': 'Bottom Pivot', 'value': parseFloat(bc).toFixed(2)},
    {'name': 'Support 1', 'value': parseFloat(s1).toFixed(2)},
    {'name': 'Support 2', 'value': parseFloat(s2).toFixed(2)},
    {'name': 'Support 3', 'value': parseFloat(s3).toFixed(2)},
    {'name': 'Support 4', 'value': parseFloat(s4).toFixed(2)},
  ]
}

const pivotValues = (tradingDay) => {
  const { high, low, close } = tradingDay
  // Central Pivot Range
  var pivot =  (high + low + close)/3.0
  var bc =  (high + low)/2.0
  var tc =  2*pivot - bc

  if(bc > tc){
    var tmp = tc
    tc = bc
    bc = tmp
  }

  return {
    'tc': parseFloat(tc),
    'pivot': parseFloat(pivot),
    'bc': parseFloat(bc),
  }
}

const createPivotTwoRelationshipRows = (previousTradingDay, lastSecondTradingDay) => {
  const previousPivotValues = pivotValues(previousTradingDay)
  const lastSecondTradingValues = pivotValues(lastSecondTradingDay)
  var dayType = 'Not Defined';
  if(previousPivotValues.tc > lastSecondTradingValues.tc){
    if(previousPivotValues.bc > lastSecondTradingValues.tc) {
      dayType = 'Bullish'
    }
    else if(previousPivotValues.bc >= lastSecondTradingValues.bc &&  previousPivotValues.bc < lastSecondTradingValues.tc){
      dayType = 'Moderately Bullish'
    }
    else if(previousPivotValues.bc < lastSecondTradingValues.bc)
    {
      dayType = 'Outside Value(Sideways)'
    }
  }
  else if(previousPivotValues.bc < lastSecondTradingValues.bc){
    if(previousPivotValues.tc < lastSecondTradingValues.bc) {
      dayType = 'Bearish'
    }
    else if(previousPivotValues.tc >= lastSecondTradingValues.bc &&  previousPivotValues.tc < lastSecondTradingValues.tc){
      dayType = 'Moderately Bearish'
    }
    else if(previousPivotValues.tc >  lastSecondTradingValues.tc){
      dayType = 'Outside Value(Sideways)'
    }
  }
  else if(previousPivotValues.bc >= lastSecondTradingValues.bc && previousPivotValues.tc <= lastSecondTradingValues.tc){
     dayType = 'Inside Value(Breakout)'
  }

  var cprWidth = previousPivotValues.tc - previousPivotValues.bc;
  var cprWidthType = 'Not Defined'

  var breakoutWidth = parseFloat((previousTradingDay.close)*0.005)
  var moderateWidth = parseFloat((previousTradingDay.close)*0.01)

  if(cprWidth < breakoutWidth){
    cprWidthType = 'Narrow(Breakout/Double Distribution Day)'
  }
  else if(cprWidth > breakoutWidth && cprWidth < moderateWidth){
    cprWidthType = 'Moderate(Typical, Exp Typical day)'
  }
  else{
    cprWidthType = 'Wide(Trading Range, Sideways day)'
  }
  return [
    { name: 'Expected Day', 'value': dayType },
    { name: 'CPR width', 'value': cprWidthType },
    { name: 'CPR width value', 'value': parseFloat(cprWidth).toFixed(2) }
  ]
}

export const generatePivotValues = (previousTradingDay, lastSecondTradingDay) => {
  return {
    pivotValues: createPivotRows(previousTradingDay),
    pivotTwoDayRelationship: createPivotTwoRelationshipRows(previousTradingDay, lastSecondTradingDay)
  }
}