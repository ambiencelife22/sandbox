/* fetchAllAppCountriesTerritories.ts */
export const fetchSubcontinentData = async (SubContinentParam: any) => {

    const API_URL = `/api/constant-data/series/orbits/GetAllAppCountriesTerritories?SubContinentParam=${SubContinentParam}`

    const response = await fetch(API_URL)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
}