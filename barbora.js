async function run() {
  const response = await fetch('https://www.barbora.lt/api/eshop/v1/cart/deliveries', {
    headers: {
      'Authorization': 'Basic YXBpa2V5OlNlY3JldEtleQ=='
    }
  })
  const json = await response.json()

  const hours = json.deliveries[0].params.matrix.flatMap(day => day.hours)
  const available = !!hours.find(hour => hour.available)

  console.log(`${new Date()} - ${available}`)

  if (available) {
    const audio = new Audio('http://sfxcontent.s3.amazonaws.com/soundfx/AircraftAlarm.mp3');
    audio.loop = true
    audio.play()
  }
}

setInterval(run, 60 * 1000)
