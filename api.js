import { API_KEY, API_URL } from './constants'

export const fetchCityData = async (city) => {
  const url = `${API_URL}?key=${API_KEY}&q=${city}&aqi=yes`
  const res = await fetch(url)

  if (res.status === 400) throw new Error('CITY_NOT_FOUND')
  if (!res.ok)           throw new Error('NETWORK_ERROR')

  const d = await res.json()

  return {
    city:      d.location.name,
    country:   d.location.country,
    temp:      d.current.temp_c,
    humidity:  d.current.humidity,
    wind:      d.current.wind_kph,
    condition: d.current.condition.text,
    aqi:       d.current.air_quality['us-epa-index'],
    pm2_5:     d.current.air_quality.pm2_5,
    pm10:      d.current.air_quality.pm10,
    co:        d.current.air_quality.co,
  }
}
