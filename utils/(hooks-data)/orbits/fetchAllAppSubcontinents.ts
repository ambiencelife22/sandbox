/* fetchAllSubcontinents.ts */

const API_URL = '/api/constant-data/series/orbits/GetAllAppSubcontinents'

export const fetchData = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data
}