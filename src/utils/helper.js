export const isTodaySessionOver = () => {
  var d = new Date()
  if(d.getUTCHours() >= 10){
    return true
  }
  return false
}