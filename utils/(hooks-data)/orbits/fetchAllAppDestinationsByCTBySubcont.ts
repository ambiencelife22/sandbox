/* fetchAllAppDestinationsByCTBySubcont.ts */

const API_URL = '/api/constant-data/series/orbits/GetAllAppDestinations'

export const fetchCountryTerritoryData = async (CountryTerritoryParam: any) => {
    const response = await fetch(`${API_URL}?CountryTerritoryParam=${CountryTerritoryParam}`)
    if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
    }
    const data = await response.json()
    return data
}