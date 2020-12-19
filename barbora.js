const fetchDeliveries = async () => {
  const response = await fetch('https://pagrindinis.barbora.lt/api/eshop/v1/cart/deliveries', {
    headers: {
      'Authorization': 'Basic YXBpa2V5OlNlY3JldEtleQ=='
    }
  })
  return response.json()
}

const playAlarm = () => {
  const audio = new Audio('https://sfxcontent.s3.amazonaws.com/soundfx/AircraftAlarm.mp3');
  audio.loop = true
  audio.play()
}

const checkDeliveries = (daysInFuture) => async () => {
  console.log(new Date())

  const json = await fetchDeliveries()
  const days = json.deliveries[0].params.matrix.slice(0, daysInFuture)
  const hours = days.flatMap(day => day.hours)
  const availableHours = hours.filter(hour => hour.available)

  if (availableHours.length > 0) {
    console.log(availableHours.map(hour => hour.deliveryTime))
    playAlarm()
  }
}

setInterval(checkDeliveries(2), 60 * 1000)
