const createValueRows = (previousTradingDay) => {
  const { high, low, close } = previousTradingDay
  var range = high - low

  // H's
  var h1 = close + (range * 1.1/12)
  var h2 = close + (range * 1.1/6)
  var h3 = close + (range * 1.1/4)
  var h4 = close + (range * 1.1/2)
  var h5 = (high/low) * close

  // L's
  var l1 = close - (range * 1.1/12)
  var l2 = close - (range * 1.1/6)
  var l3 = close - (range * 1.1/4)
  var l4 = close - (range * 1.1/2)
  var l5 = 2*close - h5
  

  return [
    {'name': 'H5(Breakout Target)', 'value': parseFloat(h5).toFixed(2)},
    {'name': 'H4(Bullish Breakout)', 'value': parseFloat(h4).toFixed(2)},
    {'name': 'H3(Sell Reversal)', 'value': parseFloat(h3).toFixed(2)},
    {'name': 'H2', 'value': parseFloat(h2).toFixed(2)},
    {'name': 'H1', 'value': parseFloat(h1).toFixed(2)},
    {'name': 'L1', 'value': parseFloat(l1).toFixed(2)},
    {'name': 'L2', 'value': parseFloat(l2).toFixed(2)},
    {'name': 'L3(Buy Reversal)', 'value': parseFloat(l3).toFixed(2)},
    {'name': 'L4(Bearish Breakout)', 'value': parseFloat(l4).toFixed(2)},
    {'name': 'L5(Breakout Target)', 'value': parseFloat(l5).toFixed(2)}
  ]
}

const camarillaValues = (tradingDay) => {
  const { high, low, close } = tradingDay
  var range = high - low

  // H's
  var h3 = close + (range * 1.1/4)

  // L's
  var l3 = close - (range * 1.1/4)

  return {
    'h3': parseFloat(h3),
    'l3': parseFloat(l3)
  }
}

const createTwoDayRelationShipRows = (previousTradingDay, lastSecondTradingDay) => {
  const previousCamarillaValues = camarillaValues(previousTradingDay)
  const lastSecondCamarillaValues = camarillaValues(lastSecondTradingDay)
  var dayType = 'Not Defined';
  if(previousCamarillaValues.h3 > lastSecondCamarillaValues.h3){
    if(previousCamarillaValues.l3 > lastSecondCamarillaValues.h3) {
      dayType = 'Bullish'
    }
    else if(previousCamarillaValues.l3 >= lastSecondCamarillaValues.l3 &&  previousCamarillaValues.l3 < lastSecondCamarillaValues.h3){
      dayType = 'Moderately Bullish'
    }
    else if(previousCamarillaValues.l3 < lastSecondCamarillaValues.l3)
    {
      dayType = 'Outside Value(Sideways)'
    }
  }
  else if(previousCamarillaValues.l3 < lastSecondCamarillaValues.l3){
    if(previousCamarillaValues.h3 < lastSecondCamarillaValues.l3) {
      dayType = 'Bearish'
    }
    else if(previousCamarillaValues.h3 >= lastSecondCamarillaValues.l3 &&  previousCamarillaValues.h3 < lastSecondCamarillaValues.h3){
      dayType = 'Moderately Bearish'
    }
    else if(previousCamarillaValues.h3 >  lastSecondCamarillaValues.h3){
      dayType = 'Outside Value(Sideways)'
    }
  }
  else if(previousCamarillaValues.l3 >= lastSecondCamarillaValues.l3 && previousCamarillaValues.h3 <= lastSecondCamarillaValues.h3){
     dayType = 'Inside Value(Breakout)'
  }

  var camarillaWidth = previousCamarillaValues.h3 - previousCamarillaValues.l3;
  var camarillaWidthType = 'Not Defined'

  var breakoutWidth = parseFloat((previousTradingDay.close)*0.01)
  var moderateWidth = parseFloat((previousTradingDay.close)*0.02)

  if(camarillaWidth < breakoutWidth){
    camarillaWidthType = 'Narrow(Breakout/Double Distribution day)'
  }
  else if(camarillaWidth > breakoutWidth && camarillaWidth < moderateWidth){
    camarillaWidthType = 'Moderate(Typical, Exp Typical day)'
  }
  else{
    camarillaWidthType = 'Wide(Trading Range, Sideways day)'
  }
  return [
    { name: 'Expected Day', 'value': dayType },
    { name: 'Camarilla width', 'value': camarillaWidthType },
    { name: 'Camarilla width value', 'value': parseFloat(camarillaWidth).toFixed(2) }
  ]
}

export const generateCamarillaValues = (previousTradingDay, lastSecondTradingDay) => {
  return {
    camarillaValues: createValueRows(previousTradingDay),
    camarillaTwoDayRelationship: createTwoDayRelationShipRows(previousTradingDay, lastSecondTradingDay)
  }
}