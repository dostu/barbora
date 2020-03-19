require 'open-uri'
require 'json'

loop do
  response = open('https://www.barbora.lt/api/eshop/v1/cart/deliveries', 'Authorization' => "Basic YXBpa2V5OlNlY3JldEtleQ==", 'Cookie' => ENV['COOKIE']).read
  json = JSON.parse(response)

  hours = json['deliveries'].first['params']['matrix'].map { |day| day['hours'] }.flatten
  available = hours.any? { |hour| hour['available'] }

  puts "#{Time.now} - #{available}"

  if available
    `while :; do afplay /System/Library/Sounds/Purr.aiff -v 40; done`
  end

  sleep 60
end
